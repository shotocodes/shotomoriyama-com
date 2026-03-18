// src/components/mdx/MdxComponents.tsx
import React from 'react';

export function InfoBox({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div
      className="bg-background-alt"
      style={{
        padding: '1.5rem',
        borderRadius: '8px',
        marginBottom: '2rem',
        border: '2px solid var(--border)',
        lineHeight: '1.75'
      }}
    >
      <h4 className="font-bold text-primary" style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>
        {title}
      </h4>
      <div className="text-text-secondary" style={{ fontSize: '0.95rem', lineHeight: '1.75' }}>
        {children}
      </div>
    </div>
  );
}

export function HighlightBox({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <div
      className="bg-background-alt border-l-4 border-primary"
      style={{
        padding: '1.5rem',
        borderRadius: '4px',
        marginBottom: '2rem'
      }}
    >
      {title && (
        <h3 className="font-bold text-primary" style={{ marginBottom: '1.5rem', fontSize: '1.25rem' }}>
          {title}
        </h3>
      )}
      <div className="text-text-secondary" style={{ fontSize: '1rem', lineHeight: '1.75' }}>
        {children}
      </div>
    </div>
  );
}

// カウンター
let stepCounter = 0;

// リセット用コンポーネント（追加）
export function ResetSteps() {
  stepCounter = 0;
  return null;  // 何も表示しない
}

export function StepCard({ title, children }: { title: string; children: React.ReactNode }) {
  stepCounter++;
  const currentNumber = stepCounter;

  return (
    <div
      className="bg-background-alt"
      style={{
        padding: '1.5rem',
        marginBottom: '2rem',
        borderRadius: '8px',
        border: '2px solid var(--border)'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
        <div
          style={{
            backgroundColor: '#0066FF',
            color: '#FFFFFF',
            width: '2rem',
            height: '2rem',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1rem',
            fontWeight: 'bold',
            flexShrink: 0
          }}
        >
          {currentNumber}
        </div>
        <h3 className="text-lg font-bold text-primary" style={{ lineHeight: '1.4' }}>
          {title}
        </h3>
      </div>
      <div className="text-text-secondary" style={{ fontSize: '0.95rem', lineHeight: '1.75', paddingLeft: '3rem' }}>
        {children}
      </div>
    </div>
  );
}

export function TipBox({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="bg-background-alt border-l-4 border-primary"
      style={{
        padding: '1.5rem',
        marginBottom: '2rem',
        borderRadius: '4px'
      }}
    >
      <div className="text-text-secondary" style={{ fontSize: '1rem', lineHeight: '1.75' }}>
        {children}
      </div>
    </div>
  );
}
