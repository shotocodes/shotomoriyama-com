// src/components/shared/GridBackground.tsx
'use client';

interface GridBackgroundProps {
  show?: boolean;
  opacity?: number;
  gridSize?: number;
  color?: string;
}

export default function GridBackground({
  show = true,
  opacity = 0.15,
  gridSize = 50,
  color = 'rgba(59, 130, 246, 0.5)', // デフォルト: blue-500
}: GridBackgroundProps) {
  if (!show) return null;

  return (
    <div className="absolute inset-0" style={{ opacity }}>
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(0deg, transparent 24%, ${color} 25%, ${color} 26%, transparent 27%, transparent 74%, ${color} 75%, ${color} 76%, transparent 77%, transparent),
            linear-gradient(90deg, transparent 24%, ${color} 25%, ${color} 26%, transparent 27%, transparent 74%, ${color} 75%, ${color} 76%, transparent 77%, transparent)
          `,
          backgroundSize: `${gridSize}px ${gridSize}px`,
        }}
      />
    </div>
  );
}
