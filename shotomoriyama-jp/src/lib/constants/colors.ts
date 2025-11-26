// src/lib/constants/colors.ts

export const colors = {
  primary: '#2C3E50',      // ダークグレー
  accent: '#3498DB',       // ブルー
  background: '#FFFFFF',
  backgroundAlt: '#F8F9FA',
  text: {
    primary: '#2C3E50',
    secondary: '#7F8C8D',
    muted: '#95A5A6',
  },
  border: '#E0E0E0',
} as const;

export type ColorKey = keyof typeof colors;
