// src/hooks/useResponsive.ts
import { useEffect, useState } from 'react';

/**
 * メディアクエリフック
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    setMatches(media.matches);
    const listener = () => setMatches(media.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [query]);

  return matches;
}

/**
 * 円形カード用のレスポンシブ値を管理
 */
export function useResponsiveCircle() {
  const [circlePadding, setCirclePadding] = useState({
    paddingLeft: '70px',
    paddingBottom: '30px'
  });

  const [cardSpacing, setCardSpacing] = useState(400);
  const isMobile = useMediaQuery('(max-width: 1023px)');
  const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1023px)');

  useEffect(() => {
    const updateValues = () => {
      const width = window.innerWidth;

      // circlePadding の計算
      let padding;
      if (width < 640) {
        padding = { paddingLeft: '38px', paddingBottom: '10px' };
      } else if (width < 768) {
        padding = { paddingLeft: '40px', paddingBottom: '20px' };
      } else if (width < 1024) {
        padding = { paddingLeft: '48px', paddingBottom: '25px' };
      } else {
        padding = { paddingLeft: '70px', paddingBottom: '30px' };
      }
      setCirclePadding(padding);

      // cardSpacing の計算
      let spacing;
      if (width < 640) {
        spacing = 120;
      } else if (width < 768) {
        spacing = 200;
      } else if (width < 1024) {
        spacing = 280;
      } else {
        spacing = 400;
      }
      setCardSpacing(spacing);
    };

    updateValues();
    window.addEventListener('resize', updateValues);
    return () => window.removeEventListener('resize', updateValues);
  }, []);

  return {
    circlePadding,
    cardSpacing,
    isMobile,
    isTablet
  };
}

/**
 * スクロール進捗を計算
 */
export function useScrollProgress(containerRef: React.RefObject<HTMLDivElement | null>) {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    // rAF で 1 フレーム 1 回に間引く。
    // 生のスクロールイベントごとに getBoundingClientRect + setState すると
    // 消費側セクション全体がイベント頻度で再レンダーされてカクつく。
    let ticking = false;

    const update = () => {
      ticking = false;
      if (!containerRef.current) return;

      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      const containerHeight = container.offsetHeight;
      const scrollableHeight = containerHeight - window.innerHeight;
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / scrollableHeight));

      // 変化がないフレームでは setState しない（不要な再レンダー防止）
      setScrollProgress((prev) => (prev === progress ? prev : progress));
    };

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    update();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [containerRef]);

  return scrollProgress;
}
