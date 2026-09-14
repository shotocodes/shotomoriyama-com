// src/lib/color.ts
// アクセントカラー背景の上に置く文字色を、背景の明度から選ぶ。
// #4ECDC4 や #FFD93D のような明るい色に白文字を乗せるとコントラスト比が
// AA基準(4.5:1)を大きく下回るため、明るい背景では濃色文字に切り替える。
export function readableTextOn(hexColor: string): string {
  const hex = hexColor.replace('#', '');
  const r = parseInt(hex.slice(0, 2), 16) / 255;
  const g = parseInt(hex.slice(2, 4), 16) / 255;
  const b = parseInt(hex.slice(4, 6), 16) / 255;
  const lin = (c: number) => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
  const luminance = 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
  return luminance > 0.36 ? '#1a1a1a' : '#ffffff';
}
