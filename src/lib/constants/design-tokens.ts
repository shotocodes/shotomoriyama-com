// src/styles/design-tokens.ts

/**
 * デザイントークン
 * サイト全体で使用する色、アニメーション、間隔などの定数を管理
 */

export const DesignTokens = {
  // カラーパレット（各セクション・ページ別）
  colors: {
    service: '#0066FF',
    works: '#4ECDC4',
    support: '#FF8C42',
    blog: '#9333EA',
    about: '#10B981',
    contact: '#FF6B6B',
    order: '#556270',
    howToOrder: '#707070',

    // グラデーション用
    gradients: {
      service: { start: '#0066FF', end: '#A8DADC' },
      works: { start: '#4ECDC4', end: '#FF6B6B' },
      support: { start: '#FF8C42', end: '#FF6B6B' },
      blog: { start: '#9333EA', end: '#EC4899' },
      about: { start: '#10B981', end: '#059669' },
      contact: { start: '#FF6B6B', end: '#FF9A8B' },
      order: { start: '#556270', end: '#8892A0' },
    }
  },

  // アニメーション設定
  animations: {
    // 継続時間
    duration: {
      instant: 0.1,
      fast: 0.3,
      normal: 0.6,
      slow: 1.0,
      verySlow: 2.0,
    },

    // イージング
    easing: {
      smooth: [0.4, 0.0, 0.2, 1] as [number, number, number, number],
      bounce: [0.68, -0.55, 0.265, 1.55] as [number, number, number, number],
      easeInOut: 'easeInOut',
      easeOut: 'easeOut',
      linear: 'linear',
    },

    // よく使うトランジション設定
    transitions: {
      fadeIn: {
        duration: 0.6,
        ease: 'easeOut' as const,
      },
      scaleHover: {
        duration: 0.3,
        ease: [0.4, 0.0, 0.2, 1] as [number, number, number, number],
      },
      slideUp: {
        duration: 0.8,
        ease: 'easeOut' as const,
      },
    }
  },

  // スペーシング（間隔）
  spacing: {
    // セクション間
    section: {
      vertical: '5rem',
      horizontal: '20px',
      mobile: '3rem',
    },

    // カード内
    card: {
      padding: '2rem',
      gap: '1.5rem',
      mobilePadding: '1.5rem',
    },

    // 要素間
    element: {
      small: '0.5rem',
      medium: '1rem',
      large: '2rem',
    }
  },

  // タイポグラフィ
  typography: {
    sizes: {
      hero: {
        mobile: '2.5rem',
        tablet: '4rem',
        desktop: '6rem',
      },
      title: {
        mobile: '2rem',
        tablet: '3rem',
        desktop: '4rem',
      },
      subtitle: {
        mobile: '1.25rem',
        tablet: '1.5rem',
        desktop: '2rem',
      },
      body: {
        mobile: '1rem',
        tablet: '1.125rem',
        desktop: '1.25rem',
      },
    },
  },

  // ブレークポイント
  breakpoints: {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536,
  },

  // グラフィック共通設定
  graphics: {
    // 円形ダイアグラム
    circle: {
      strokeWidth: 0.5,
      dashArray: {
        solid: '0',
        dashed: '8 8',
        dotted: '4 4',
      },
      opacity: {
        subtle: 0.2,
        normal: 0.5,
        strong: 0.8,
      }
    },

    // グリッド
    grid: {
      size: '40px',
      opacity: 0.5,
      lineColor: 'rgba(0, 0, 0, 0.05)',
    },

    // 波線
    wave: {
      strokeWidth: 2,
      dashArray: '10 10',
      opacity: 0.3,
    }
  },

  // シャドウ
  shadows: {
    small: '0 2px 8px rgba(0, 0, 0, 0.1)',
    medium: '0 4px 16px rgba(0, 0, 0, 0.15)',
    large: '0 10px 40px rgba(0, 0, 0, 0.2)',
    glow: (color: string) => `0 0 20px ${color}80`,
  },

  // 境界線
  borders: {
    width: {
      thin: '1px',
      normal: '2px',
      thick: '3px',
    },
    radius: {
      small: '4px',
      medium: '8px',
      large: '12px',
      full: '9999px',
    }
  },
};

// ヘルパー関数

/**
 * レスポンシブな値を取得
 */
export const getResponsiveValue = (
  mobile: string | number,
  tablet?: string | number,
  desktop?: string | number
) => ({
  base: mobile,
  md: tablet || mobile,
  lg: desktop || tablet || mobile,
});

/**
 * グラデーション文字列を生成
 */
export const getGradient = (key: keyof typeof DesignTokens.colors.gradients) => {
  const gradient = DesignTokens.colors.gradients[key];
  return `linear-gradient(to right, ${gradient.start}, ${gradient.end})`;
};

/**
 * カラーを透明度付きで取得
 */
export const getColorWithOpacity = (color: string, opacity: number) => {
  // #RRGGBB → rgba(r, g, b, opacity) に変換
  const r = parseInt(color.slice(1, 3), 16);
  const g = parseInt(color.slice(3, 5), 16);
  const b = parseInt(color.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

export default DesignTokens;
