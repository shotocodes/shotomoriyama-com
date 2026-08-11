// src/components/ui/LoadingScreen.tsx
'use client';

// 初回訪問時のみのローディング演出。バリアントは2種:
//
// - blueprint（現行デフォルト）:「設計図から、引き渡しまで。」
//   製図グリッド上でロゴが線画で引かれ、工程ラベルが進み、検収印が押されて上下に割れる
// - drop:「一滴の波紋」
//   一滴が水面に落ち、波紋が広がり、最後は波紋の穴からサイトが現れる
//
// URLに ?loading=drop / ?loading=blueprint を付けると、セッションガードを無視して
// そのバリアントを強制再生できる（比較検討用。判断が終わったら片方に固定する）。
//
// - セッション内の2回目以降は表示しない（sessionStorage + globals.css の先行ガードで
//   ハイドレーション前のちらつきも防止）
// - クリック / ホイール / キー入力で即スキップ
// - prefers-reduced-motion では表示しない（CSS側でも display:none ）
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export const LOADING_SEEN_KEY = 'smj-loading-seen';

type Variant = 'wave' | 'drop' | 'blueprint';

// ローディングと HeroCanvas の連携用グローバル（案F「波を、組み上げる」）
type WaveLoadingGlobals = {
  __waveBuild?: number;
  __waveCanvasReady?: boolean;
};

const PHASES = [
  { until: 34, label: '設計中', en: 'DRAFTING' },
  { until: 68, label: '施工中', en: 'BUILDING' },
  { until: 94, label: '仕上げ中', en: 'FINISHING' },
  { until: 100, label: '引き渡し', en: 'HANDOVER' },
] as const;

const DURATION_MS = 2400;
const HOLD_MS = 650; // 100%の画（検収印 / 最大波紋）を見せてから開くまで

// 案F（wave）のタイムライン
const WAVE_WAIT_CAP = 30; // Three.js 準備待ちの間に進む上限%
const WAVE_MIN_DORMANT_MS = 1100; // 「眠っている点群」を最低これだけ見せてから組み上げ開始
const WAVE_BUILD_MS = 3600; // スキャンで波を組み上げる時間（しっかり見せる）
const WAVE_READY_TIMEOUT_MS = 8000; // 波が準備できない場合の保険（WebGL不可など）
const WAVE_HOLD_MS = 650;

export default function LoadingScreen() {
  const pathname = usePathname();
  // 案F はヒーローの波（ホーム）でだけ成立する。他ルート直行時は案Dで迎える
  const routeVariant: Variant = pathname === '/' ? 'wave' : 'drop';

  const [progress, setProgress] = useState(0);
  const [buildRatio, setBuildRatio] = useState(0); // wave: スキャンの進行(0..1)
  const [status, setStatus] = useState<'loading' | 'exiting' | 'done'>('loading');
  const [variant, setVariant] = useState<Variant>(routeVariant);
  // wave: ハイドレーション後にオーバーレイ背景を透過へ切り替える
  // （SSR時点は不透明にして、下のコンテンツのちらつきを防ぐ）
  const [armed, setArmed] = useState(false);
  const rafRef = useRef<number | null>(null);
  const finishedRef = useRef(false);
  const ranRef = useRef(false);

  useEffect(() => {
    // このエフェクトは初回マウントの1回だけ実行する。
    // 依存値の変化で再実行されるとクリーンアップが先に走り、
    // 進行中の演出（rAF・data-wave-loading属性）を壊してしまうため、
    // reduced-motion はフックではなく matchMedia を直接読む（deps を空にできる）
    if (ranRef.current) return;
    ranRef.current = true;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ?loading=xxx でバリアント強制再生（比較用）
    let forced: Variant | null = null;
    try {
      const p = new URLSearchParams(window.location.search).get('loading');
      if (p === 'wave' || p === 'drop' || p === 'blueprint') forced = p;
    } catch {
      /* noop */
    }

    let seen = false;
    try {
      seen = !!sessionStorage.getItem(LOADING_SEEN_KEY);
    } catch {
      /* プライベートモード等では毎回表示でよい */
    }

    if (forced) {
      setVariant(forced);
      // 先行ガード（data-loading-seen）で非表示になっていても強制再生する
      document.documentElement.removeAttribute('data-loading-seen');
    } else if (seen || prefersReducedMotion) {
      setStatus('done');
      return;
    }

    try {
      sessionStorage.setItem(LOADING_SEEN_KEY, '1');
    } catch {
      /* noop */
    }

    // 表示中はスクロールさせない
    document.body.style.overflow = 'hidden';

    const activeVariant: Variant = forced ?? routeVariant;
    const waveGlobals = window as unknown as WaveLoadingGlobals;
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
    const easeInOutQuad = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

    const finish = () => {
      if (finishedRef.current) return;
      finishedRef.current = true;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      setProgress(100);
      if (activeVariant === 'wave') waveGlobals.__waveBuild = 1;
      setTimeout(
        () => setStatus('exiting'),
        activeVariant === 'wave' ? WAVE_HOLD_MS : HOLD_MS
      );
    };

    if (activeVariant === 'wave') {
      // ============ 案F: 波を、組み上げる ============
      // HeroCanvas が window.__waveBuild を uBuild uniform として読む。
      // 進捗0-30%: Three.js の実ロードを待つ（本当に波を用意している時間）
      // 進捗30-100%: スキャンラインが走り、点群がワイヤーフレームの波に組み上がる
      waveGlobals.__waveBuild = 0;
      document.documentElement.setAttribute('data-wave-loading', '');
      setArmed(true);

      let ready = waveGlobals.__waveCanvasReady === true;
      const onReady = () => {
        ready = true;
      };
      window.addEventListener('wave-canvas-ready', onReady);

      const start = performance.now();
      let buildStart = 0;
      let pBase = 0; // 組み上げ開始時点の%（ここから100へ滑らかに繋ぐ）

      const tick = (now: number) => {
        const elapsed = now - start;
        let p: number;
        const building = ready && elapsed >= WAVE_MIN_DORMANT_MS;
        if (!building) {
          // 準備待ち＋点群の余韻: ゆっくり30%まで
          p = Math.min(WAVE_WAIT_CAP, elapsed * 0.02);
          pBase = p;
          if (!ready && elapsed > WAVE_READY_TIMEOUT_MS) {
            finish();
            return;
          }
        } else {
          if (buildStart === 0) buildStart = now;
          const bt = Math.min(1, (now - buildStart) / WAVE_BUILD_MS);
          p = pBase + (100 - pBase) * easeInOutQuad(bt);
        }
        setProgress(Math.min(100, Math.round(p)));
        const build = building ? Math.max(0, Math.min(1, (p - pBase) / (100 - pBase))) : 0;
        setBuildRatio(build);
        waveGlobals.__waveBuild = build;
        if (p >= 100) {
          finish();
          return;
        }
        rafRef.current = requestAnimationFrame(tick);
      };
      rafRef.current = requestAnimationFrame(tick);

      // 入力で即スキップ
      window.addEventListener('wheel', finish, { passive: true, once: true });
      window.addEventListener('touchstart', finish, { passive: true, once: true });
      window.addEventListener('pointerdown', finish, { once: true });
      window.addEventListener('keydown', finish, { once: true });

      return () => {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        document.body.style.overflow = '';
        document.documentElement.removeAttribute('data-wave-loading');
        window.removeEventListener('wave-canvas-ready', onReady);
        window.removeEventListener('wheel', finish);
        window.removeEventListener('touchstart', finish);
        window.removeEventListener('pointerdown', finish);
        window.removeEventListener('keydown', finish);
      };
    }

    // ============ 案D / 案A: 固定タイムライン ============
    // blueprint は序盤に勢いよく進む easeOut、
    // drop は「落下→着水→波紋」の各局面を均等に見せたいので緩やかな easeInOut
    const ease = activeVariant === 'drop' ? easeInOutQuad : easeOutCubic;
    const start = performance.now();

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / DURATION_MS);
      setProgress(Math.min(100, Math.round(ease(t) * 100)));
      if (t >= 1) {
        finish();
        return;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    // 入力で即スキップ
    window.addEventListener('wheel', finish, { passive: true, once: true });
    window.addEventListener('touchstart', finish, { passive: true, once: true });
    window.addEventListener('pointerdown', finish, { once: true });
    window.addEventListener('keydown', finish, { once: true });

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      document.body.style.overflow = '';
      window.removeEventListener('wheel', finish);
      window.removeEventListener('touchstart', finish);
      window.removeEventListener('pointerdown', finish);
      window.removeEventListener('keydown', finish);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 開き際: wave はヒーローの文字・ヘッダーのフェードインを同時に始める
  useEffect(() => {
    if (status !== 'exiting') return;
    document.body.style.overflow = '';
    document.documentElement.removeAttribute('data-wave-loading');
    const timer = setTimeout(() => {
      const waveGlobals = window as unknown as WaveLoadingGlobals;
      delete waveGlobals.__waveBuild;
      setStatus('done');
    }, 950);
    return () => clearTimeout(timer);
  }, [status]);

  if (status === 'done') return null;

  const complete = progress >= 100;
  const opening = status === 'exiting';

  return (
    <div id="loading-screen" className="fixed inset-0" style={{ zIndex: 100 }} role="status" aria-label="読み込み中">
      {variant === 'wave' ? (
        <WaveVariant progress={progress} build={buildRatio} complete={complete} opening={opening} armed={armed} />
      ) : variant === 'drop' ? (
        <DropVariant progress={progress} complete={complete} opening={opening} />
      ) : (
        <BlueprintVariant progress={progress} complete={complete} opening={opening} />
      )}
    </div>
  );
}

// ============================================================
// 案F: 波を、組み上げる — ローダーの波がそのままヒーローの波になる
// 描画本体は HeroCanvas（uBuild uniform）。ここは透明なUIレイヤーだけ。
// ============================================================
function WaveVariant({
  progress,
  build,
  complete,
  opening,
  armed,
}: {
  progress: number;
  build: number;
  complete: boolean;
  opening: boolean;
  armed: boolean;
}) {
  // 組み上げスキャンの画面位置（準備待ち中は非表示）
  const scanning = build > 0 && !complete;

  return (
    <motion.div
      className="absolute inset-0"
      // SSR〜起動直前は背景色で覆い、起動後は透過して下の HeroCanvas を見せる
      // （オーバーレイ背景とページ背景は同色なので切り替えは見えない）
      style={{ background: armed ? 'transparent' : 'var(--color-background)' }}
      animate={opening ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 0.7 }}
    >
      {/* 組み上げスキャンライン */}
      {scanning && (
        <div
          className="absolute top-0 bottom-0 pointer-events-none"
          style={{
            left: `${build * 100}%`,
            width: '1px',
            background: 'var(--color-accent)',
            boxShadow: '0 0 14px var(--color-accent)',
            opacity: 0.55,
          }}
        />
      )}

      {/* カウンター（上部中央・字間広め） */}
      <p
        className="absolute font-display"
        style={{
          left: '50%',
          top: '18%',
          transform: 'translate(-50%, -50%)',
          fontSize: '1rem',
          letterSpacing: '0.35em',
          color: 'var(--color-text-muted)',
        }}
      >
        {String(progress).padStart(3, '0').split('').join(' ')}
      </p>

      {/* 工程ラベル */}
      <div
        className="absolute"
        style={{ left: '50%', bottom: '14%', transform: 'translateX(-50%)', height: '2rem', overflow: 'hidden' }}
      >
        <AnimatePresence mode="popLayout">
          <motion.p
            key={complete ? 'done' : 'building'}
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -24, opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="text-sm text-text-secondary"
            style={{ letterSpacing: '0.45em', whiteSpace: 'nowrap' }}
          >
            {complete ? 'そのまま、ようこそ' : '波を、組み上げています'}
            <span
              className="font-display"
              style={{ fontSize: '9px', letterSpacing: '0.3em', marginLeft: '1em', opacity: 0.55 }}
            >
              {complete ? 'SEAMLESS' : 'ASSEMBLING THE WAVE'}
            </span>
          </motion.p>
        </AnimatePresence>
      </div>

      {/* ブランド */}
      <p
        className="absolute font-display"
        style={{
          right: '1.5rem',
          bottom: '3rem',
          fontSize: '10px',
          letterSpacing: '0.35em',
          color: 'var(--color-text-muted)',
        }}
      >
        SHOTOMORIYAMA
      </p>
    </motion.div>
  );
}

// ============================================================
// 案D: 一滴の波紋 — 「小さな想いも、大きな未来に変わる。」をそのまま絵に
// ============================================================
const IMPACT_AT = 55; // 着水する進捗

function DropVariant({ progress, complete, opening }: { progress: number; complete: boolean; opening: boolean }) {
  // 波紋の穴が広がってサイトが現れる（mask の穴を rAF で拡大）
  const [hole, setHole] = useState(0); // vmax
  useEffect(() => {
    if (!opening) return;
    let raf: number;
    const start = performance.now();
    const grow = (now: number) => {
      const t = Math.min(1, (now - start) / 850);
      const eased = 1 - Math.pow(1 - t, 3);
      setHole(eased * 240);
      if (t < 1) raf = requestAnimationFrame(grow);
    };
    raf = requestAnimationFrame(grow);
    return () => cancelAnimationFrame(raf);
  }, [opening]);

  const impacted = progress >= IMPACT_AT;
  // 落下: 進捗0→IMPACT_ATで上(12%)から水面(50%)へ
  const fallT = Math.min(1, progress / IMPACT_AT);
  const dropTop = 12 + (50 - 12) * fallT * fallT; // 自由落下風に加速
  // 波紋: 着水後の進捗で3本のリングが順に広がる
  const rippleT = impacted ? (progress - IMPACT_AT) / (100 - IMPACT_AT) : 0;
  const rings = [0, 0.22, 0.44].map((delay) => Math.max(0, (rippleT - delay) / (1 - delay)));
  // 着水直後だけ水面が盛り上がる
  const bulge = impacted ? Math.max(0, 1 - rippleT * 2.2) : 0;

  const mask = opening
    ? `radial-gradient(ellipse ${hole}vmax ${hole * 0.45}vmax at 50% 50%, transparent 98%, black 100%)`
    : undefined;

  return (
    <div
      className="absolute inset-0 bg-background"
      style={{ WebkitMaskImage: mask, maskImage: mask }}
    >
      {/* 水面 */}
      <div
        className="absolute left-0 right-0"
        style={{ top: '50%', height: '1px', background: 'var(--color-text-muted)', opacity: 0.5 }}
      />

      {/* 一滴（落下中のみ） */}
      {!impacted && (
        <>
          <div
            className="absolute"
            style={{
              left: '50%',
              top: `${dropTop - 8}%`,
              width: '2px',
              height: '10vh',
              marginLeft: '-1px',
              transform: 'translateY(-100%)',
              background: 'linear-gradient(to bottom, transparent, var(--color-accent))',
              opacity: 0.35,
            }}
          />
          <div
            className="absolute"
            style={{
              left: '50%',
              top: `${dropTop}%`,
              width: '8px',
              height: '8px',
              margin: '-4px 0 0 -4px',
              borderRadius: '50%',
              background: 'var(--color-accent)',
            }}
          />
        </>
      )}

      {/* 着水の盛り上がり */}
      {bulge > 0 && (
        <svg
          className="absolute"
          viewBox="0 0 120 22"
          style={{
            left: '50%',
            top: '50%',
            width: '120px',
            height: '22px',
            transform: `translate(-50%, -50%) scaleY(${bulge})`,
            transformOrigin: 'center bottom',
          }}
          aria-hidden="true"
        >
          <path
            d="M0 11 Q 40 11 52 5 Q 60 0 68 5 Q 80 11 120 11"
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth="1.5"
          />
        </svg>
      )}

      {/* 波紋（遠近感のある楕円） */}
      {rings.map((t, i) =>
        t > 0 ? (
          <div
            key={i}
            className="absolute"
            style={{
              left: '50%',
              top: '50%',
              width: `${40 + t * 560}px`,
              height: `${(40 + t * 560) * 0.32}px`,
              transform: 'translate(-50%, -50%)',
              border: '1.5px solid var(--color-accent)',
              borderRadius: '50%',
              opacity: Math.max(0, 0.75 - t * 0.7),
            }}
          />
        ) : null
      )}

      {/* カウンター（上部中央・字間広め） */}
      <p
        className="absolute font-display"
        style={{
          left: '50%',
          top: '36%',
          transform: 'translate(-50%, -50%)',
          fontSize: '1rem',
          letterSpacing: '0.35em',
          color: 'var(--color-text-muted)',
        }}
      >
        {String(progress).padStart(3, '0').split('').join(' ')}
      </p>

      {/* ラベル: 着水でコピーが切り替わる */}
      <div
        className="absolute"
        style={{ left: '50%', top: '62%', transform: 'translateX(-50%)', height: '2rem', overflow: 'hidden' }}
      >
        <AnimatePresence mode="popLayout">
          <motion.p
            key={impacted ? 'after' : 'before'}
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -24, opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="text-sm text-text-secondary"
            style={{ letterSpacing: '0.45em', whiteSpace: 'nowrap' }}
          >
            {impacted ? '大きな未来へ。' : '小さな想いも、'}
            <span
              className="font-display"
              style={{ fontSize: '9px', letterSpacing: '0.3em', marginLeft: '1em', opacity: 0.55 }}
            >
              {impacted ? 'INTO THE WAVE' : 'A SMALL DROP'}
            </span>
          </motion.p>
        </AnimatePresence>
      </div>

      {/* ブランド */}
      <p
        className="absolute font-display"
        style={{
          right: '1.5rem',
          bottom: '3rem',
          fontSize: '10px',
          letterSpacing: '0.35em',
          color: 'var(--color-text-muted)',
        }}
      >
        SHOTOMORIYAMA
      </p>
    </div>
  );
}

// ============================================================
// 案A: 設計図から、引き渡しまで。（現行デフォルト）
// ============================================================
function BlueprintVariant({ progress, complete, opening }: { progress: number; complete: boolean; opening: boolean }) {
  const phase = PHASES.find((p) => progress <= p.until) ?? PHASES[PHASES.length - 1];
  const panelTransition = { duration: 0.85, ease: [0.76, 0, 0.24, 1] as const };

  return (
    <>
      {/* 上下パネル（100%で水面が割れるように開く） */}
      <motion.div
        className="absolute left-0 right-0 top-0 bg-background"
        style={{ height: '50%' }}
        animate={opening ? { y: '-100%' } : { y: 0 }}
        transition={panelTransition}
      />
      <motion.div
        className="absolute left-0 right-0 bottom-0 bg-background"
        style={{ height: '50%' }}
        animate={opening ? { y: '100%' } : { y: 0 }}
        transition={panelTransition}
      />

      {/* 割れ目の水面ライン */}
      <motion.div
        className="absolute left-0 right-0"
        style={{ top: '50%', height: '2px', background: 'var(--color-accent)' }}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={opening ? { scaleX: 1, opacity: [1, 1, 0] } : { scaleX: 0, opacity: 0 }}
        transition={{ duration: 0.85 }}
      />

      {/* コンテンツ層 */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={opening ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.25 }}
      >
        {/* 製図グリッド */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(to right, var(--color-border) 1px, transparent 1px), linear-gradient(to bottom, var(--color-border) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
            opacity: 0.35,
          }}
        />

        {/* 進捗に追従する製図クロスヘア（縦横1本ずつ） */}
        <div
          className="absolute top-0 bottom-0 pointer-events-none"
          style={{
            left: `${progress}%`,
            width: '1px',
            background: 'var(--color-accent)',
            opacity: 0.45,
            transition: 'left 0.2s ease-out',
          }}
        />
        <div
          className="absolute left-0 right-0 pointer-events-none"
          style={{
            top: `${100 - progress * 0.72}%`,
            height: '1px',
            background: 'var(--color-accent)',
            opacity: 0.3,
            transition: 'top 0.2s ease-out',
          }}
        />

        {/* 四隅のブラケット＋図面注記 */}
        {[
          { pos: { top: '1.5rem', left: '1.5rem' }, border: 'borderTop borderLeft', label: 'BLUEPRINT No.001' },
          { pos: { top: '1.5rem', right: '1.5rem' }, border: 'borderTop borderRight', label: 'SCALE 1:1' },
          { pos: { bottom: '1.5rem', left: '1.5rem' }, border: 'borderBottom borderLeft', label: '' },
          { pos: { bottom: '1.5rem', right: '1.5rem' }, border: 'borderBottom borderRight', label: 'SHOTOMORIYAMA' },
        ].map((corner, i) => (
          <div key={i} className="absolute pointer-events-none" style={corner.pos as React.CSSProperties}>
            <div
              style={{
                width: '2rem',
                height: '2rem',
                borderTop: corner.border.includes('borderTop') ? '2px solid var(--color-text-secondary)' : undefined,
                borderBottom: corner.border.includes('borderBottom') ? '2px solid var(--color-text-secondary)' : undefined,
                borderLeft: corner.border.includes('borderLeft') ? '2px solid var(--color-text-secondary)' : undefined,
                borderRight: corner.border.includes('borderRight') ? '2px solid var(--color-text-secondary)' : undefined,
                opacity: 0.6,
              }}
            />
            {corner.label && (
              <p
                className="font-display text-text-secondary"
                style={{ fontSize: '9px', letterSpacing: '0.25em', marginTop: '0.5rem', opacity: 0.7 }}
              >
                {corner.label}
              </p>
            )}
          </div>
        ))}

        {/* 中央: 線画で引かれるロゴタイプ */}
        <div className="relative text-center" style={{ width: 'min(90vw, 640px)' }}>
          <svg viewBox="0 0 640 120" className="w-full" aria-hidden="true">
            {/* 下書きのベースライン（寸法線風） */}
            <line x1="20" y1="96" x2="620" y2="96" stroke="var(--color-border)" strokeWidth="1" strokeDasharray="6 6" />
            <line x1="20" y1="90" x2="20" y2="102" stroke="var(--color-border)" strokeWidth="1" />
            <line x1="620" y1="90" x2="620" y2="102" stroke="var(--color-border)" strokeWidth="1" />
            {/* ロゴタイプ: 線画 → 100%で塗りが入る */}
            <text
              x="320"
              y="78"
              textAnchor="middle"
              style={{
                fontFamily: 'var(--font-display), sans-serif',
                fontSize: '52px',
                fontWeight: 700,
                letterSpacing: '0.18em',
                fill: 'var(--color-text-primary)',
                fillOpacity: complete ? 1 : 0,
                stroke: 'var(--color-text-primary)',
                strokeWidth: 1,
                strokeDasharray: 400,
                strokeDashoffset: 400 - (progress / 100) * 400,
                transition: 'fill-opacity 0.4s ease, stroke-dashoffset 0.15s linear',
              }}
            >
              SHOTOMORIYAMA
            </text>
          </svg>

          {/* 工程ラベル */}
          <div className="relative" style={{ height: '2rem', marginTop: '0.5rem', overflow: 'hidden' }}>
            <AnimatePresence mode="popLayout">
              <motion.p
                key={phase.label}
                initial={{ y: 24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -24, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="text-sm text-text-secondary"
                style={{ letterSpacing: '0.4em' }}
              >
                {phase.label}
                <span className="font-display" style={{ fontSize: '10px', letterSpacing: '0.3em', marginLeft: '1em', opacity: 0.6 }}>
                  {phase.en}
                </span>
              </motion.p>
            </AnimatePresence>
          </div>

          {/* 検収印（100%で押される） */}
          <AnimatePresence>
            {complete && (
              <motion.svg
                viewBox="0 0 100 100"
                className="absolute"
                style={{ width: '84px', right: '-6px', top: '-34px', rotate: '-12deg' }}
                initial={{ scale: 2.4, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 500, damping: 22 }}
                aria-hidden="true"
              >
                <circle cx="50" cy="50" r="44" fill="none" stroke="#E05252" strokeWidth="3.5" opacity="0.9" />
                <text
                  x="50"
                  y="44"
                  textAnchor="middle"
                  style={{ fontSize: '26px', fontWeight: 700, fill: '#E05252', opacity: 0.9 }}
                >
                  森山
                </text>
                <text
                  x="50"
                  y="70"
                  textAnchor="middle"
                  style={{ fontSize: '13px', fill: '#E05252', letterSpacing: '0.2em', opacity: 0.9 }}
                >
                  検収済
                </text>
              </motion.svg>
            )}
          </AnimatePresence>
        </div>

        {/* 左下: 巨大カウンター */}
        <div className="absolute" style={{ left: '1.5rem', bottom: '4rem' }}>
          <p className="font-display font-bold text-primary" style={{ fontSize: 'clamp(3.5rem, 10vw, 7rem)', lineHeight: 1 }}>
            {String(progress).padStart(3, '0')}
            <span className="text-text-secondary" style={{ fontSize: '0.25em', marginLeft: '0.3em' }}>%</span>
          </p>
        </div>

        {/* 右下: コンセプトコピー */}
        <p
          className="absolute text-text-secondary"
          style={{ right: '1.5rem', bottom: '4.5rem', fontSize: '11px', letterSpacing: '0.35em', writingMode: 'vertical-rl' }}
        >
          設計図から、引き渡しまで。
        </p>
      </motion.div>
    </>
  );
}
