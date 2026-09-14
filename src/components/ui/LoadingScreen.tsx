// src/components/ui/LoadingScreen.tsx
'use client';

// 初回訪問時のみのローディング演出。バリアントは2種:
//
// - wave（ホームのデフォルト）:「波を、組み上げる」
//   眠っている点群がスキャンラインでワイヤーフレームの波に組み上がり、
//   そのままヒーローの波として動き出す（HeroCanvas の uBuild と連携）
// - drop（ホーム以外のフォールバック）:「一滴の波紋」
//   一滴が水面に落ち、波紋が広がり、最後は波紋の穴からサイトが現れる
//
// URLに ?loading=wave / ?loading=drop を付けると、セッションガードを無視して
// そのバリアントを強制再生できる（デモ・確認用の再生スイッチ）。
//
// - セッション内の2回目以降は表示しない（sessionStorage + globals.css の先行ガードで
//   ハイドレーション前のちらつきも防止）
// - クリック / ホイール / キー入力で即スキップ
// - prefers-reduced-motion では表示しない（CSS側でも display:none ）
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export const LOADING_SEEN_KEY = 'smj-loading-seen';

type Variant = 'wave' | 'drop';

// ローディングと HeroCanvas の連携用グローバル（案F「波を、組み上げる」）
type WaveLoadingGlobals = {
  __waveBuild?: number;
  __waveCanvasReady?: boolean;
};

const DURATION_MS = 2400;
const HOLD_MS = 650; // 100%の画（最大波紋）を見せてから開くまで

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
      if (p === 'wave' || p === 'drop') forced = p;
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

    // ============ 案D: 固定タイムライン ============
    // 「落下→着水→波紋」の各局面を均等に見せる緩やかな easeInOut
    const ease = easeInOutQuad;
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
      ) : (
        <DropVariant progress={progress} opening={opening} />
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

function DropVariant({ progress, opening }: { progress: number; opening: boolean }) {
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

