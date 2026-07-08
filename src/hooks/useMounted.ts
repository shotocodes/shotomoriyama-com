// src/hooks/useMounted.ts
import { useEffect, useState } from 'react';

/**
 * クライアントでマウント済みかどうかを返す。
 * テーマ依存の描画や乱数を使う演出を SSR とのハイドレーション不一致から守るための
 * 定番ゲート。各コンポーネントに散らばっていた同一実装を一本化した。
 */
export function useMounted(): boolean {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
}
