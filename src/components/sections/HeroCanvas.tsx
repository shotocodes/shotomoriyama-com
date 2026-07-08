// src/components/sections/HeroCanvas.tsx
'use client';

import { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';
import * as THREE from 'three';

// 波の変位は GPU（vertex shader）で計算する。
// CPU で毎フレーム全頂点を書き換える方式から移行し、
// メインスレッド負荷とバッファ再アップロードをゼロにする。
const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform vec2 uMouse;

  attribute vec3 aColor;

  varying vec3 vColor;

  void main() {
    vColor = aColor;

    vec3 pos = position;

    float dist = distance(pos.xy, uMouse);
    float mouseWave = sin(dist * 0.5 - uTime * 2.0) * 1.2;
    float wave2 = sin(pos.x * 0.3 + uTime) * 0.5;
    float wave3 = cos(pos.y * 0.3 + uTime * 0.7) * 0.5;

    pos.z = mouseWave + wave2 + wave3;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform float uOpacity;

  varying vec3 vColor;

  void main() {
    gl_FragColor = vec4(vColor, uOpacity);
  }
`;

// テーマに応じた頂点カラーを既存ジオメトリに書き込む（レンダラー再生成なしで切替可能にする）
function applyThemeColors(
  geometry: THREE.PlaneGeometry,
  material: THREE.ShaderMaterial,
  isDark: boolean,
  gridSize: number
) {
  let color1: THREE.Color, color2: THREE.Color, color3: THREE.Color, color4: THREE.Color;

  if (isDark) {
    color1 = new THREE.Color('#3B82F6');
    color2 = new THREE.Color('#8B5CF6');
    color3 = new THREE.Color('#EF4444');
    color4 = new THREE.Color('#F59E0B');
  } else {
    color1 = new THREE.Color('#0066FF');
    color2 = new THREE.Color('#A8DADC');
    color3 = new THREE.Color('#FF6B6B');
    color4 = new THREE.Color('#FFE66D');
  }

  const positions = geometry.attributes.position;
  const colors = new Float32Array(positions.count * 3);
  const color = new THREE.Color();

  for (let i = 0; i < positions.count; i++) {
    const x = positions.getX(i);
    const y = positions.getY(i);

    const mixAmount = x / gridSize + 0.5;
    const mixAmountY = y / gridSize + 0.5;

    if (mixAmount < 0.33) {
      color.lerpColors(color1, color2, mixAmount * 3);
    } else if (mixAmount < 0.66) {
      color.lerpColors(color2, color3, (mixAmount - 0.33) * 3);
    } else {
      color.lerpColors(color3, color4, (mixAmount - 0.66) * 3);
    }

    color.lerp(color4, mixAmountY * 0.2);
    colors[i * 3] = color.r;
    colors[i * 3 + 1] = color.g;
    colors[i * 3 + 2] = color.b;
  }

  geometry.setAttribute('aColor', new THREE.Float32BufferAttribute(colors, 3));
  material.uniforms.uOpacity.value = isDark ? 0.8 : 0.7;
}

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme, systemTheme } = useTheme();

  // テーマ切替時にシーンを作り直さず色だけ差し替えるための参照
  const threeRef = useRef<{
    geometry: THREE.PlaneGeometry;
    material: THREE.ShaderMaterial;
    gridSize: number;
    renderOnce: () => void;
  } | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const currentTheme = theme === 'system' ? systemTheme : theme;
    const isDark = currentTheme === 'dark';

    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    camera.position.z = 5;

    const gridSize = 50;
    // 変位が GPU になったので、モバイルでも密度を落とす必要が薄い
    const gridDivisions = isMobile ? 50 : isTablet ? 55 : 60;

    const geometry = new THREE.PlaneGeometry(gridSize, gridSize, gridDivisions, gridDivisions);

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uOpacity: { value: isDark ? 0.8 : 0.7 },
      },
      wireframe: true,
      transparent: true,
    });

    applyThemeColors(geometry, material, isDark, gridSize);

    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = -Math.PI / 3;
    scene.add(mesh);

    const mouse = { x: 0, y: 0 };

    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    document.addEventListener('mousemove', handleMouseMove, { passive: true });

    const clock = new THREE.Clock();
    let animationId = 0;

    const targetFPS = isMobile ? 30 : 60;
    const frameInterval = 1000 / targetFPS;
    let lastFrameTime = 0;

    const renderFrame = (elapsedTime: number) => {
      material.uniforms.uTime.value = elapsedTime;
      material.uniforms.uMouse.value.set(mouse.x * 10, mouse.y * 10);

      mesh.rotation.z = Math.sin(elapsedTime * 0.2) * 0.1;

      renderer.render(scene, camera);
    };

    threeRef.current = {
      geometry,
      material,
      gridSize,
      renderOnce: () => renderFrame(clock.getElapsedTime()),
    };

    const animate = (currentTime: number) => {
      animationId = requestAnimationFrame(animate);

      const deltaTime = currentTime - lastFrameTime;
      if (deltaTime < frameInterval) return;
      lastFrameTime = currentTime - (deltaTime % frameInterval);

      renderFrame(clock.getElapsedTime());
    };

    // 画面外・タブ非表示・モーション軽減時はループを止める
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let isInView = true;
    let isPageVisible = !document.hidden;
    let reduceMotion = reducedMotionQuery.matches;

    const startLoop = () => {
      if (animationId === 0) {
        lastFrameTime = 0;
        animationId = requestAnimationFrame(animate);
      }
    };
    const stopLoop = () => {
      if (animationId !== 0) {
        cancelAnimationFrame(animationId);
        animationId = 0;
      }
    };
    const syncLoop = () => {
      if (reduceMotion || !isInView || !isPageVisible) {
        stopLoop();
      } else {
        startLoop();
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isInView = entry.isIntersecting;
        syncLoop();
      },
      { threshold: 0 }
    );
    observer.observe(canvasRef.current);

    const handleVisibilityChange = () => {
      isPageVisible = !document.hidden;
      syncLoop();
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const handleReducedMotionChange = (event: MediaQueryListEvent) => {
      reduceMotion = event.matches;
      syncLoop();
    };
    reducedMotionQuery.addEventListener('change', handleReducedMotionChange);

    // WebGL コンテキスト喪失時（モバイル Safari 等）に静かに復帰する
    const handleContextLost = (event: Event) => {
      event.preventDefault();
      stopLoop();
    };
    const handleContextRestored = () => {
      syncLoop();
      renderFrame(clock.getElapsedTime());
    };
    canvasRef.current.addEventListener('webglcontextlost', handleContextLost);
    canvasRef.current.addEventListener('webglcontextrestored', handleContextRestored);

    // モーション軽減時も静止した波は 1 フレームだけ描画する
    renderFrame(0);
    syncLoop();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };
    window.addEventListener('resize', handleResize);

    const canvas = canvasRef.current;

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      reducedMotionQuery.removeEventListener('change', handleReducedMotionChange);
      canvas.removeEventListener('webglcontextlost', handleContextLost);
      canvas.removeEventListener('webglcontextrestored', handleContextRestored);
      observer.disconnect();
      stopLoop();
      threeRef.current = null;
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
    // テーマ変更は下の effect が色更新だけで処理するため、ここでは再生成しない
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // テーマ切替はレンダラーを作り直さず頂点カラーだけ更新する
  useEffect(() => {
    const three = threeRef.current;
    if (!three) return;

    const currentTheme = theme === 'system' ? systemTheme : theme;
    applyThemeColors(three.geometry, three.material, currentTheme === 'dark', three.gridSize);
    three.renderOnce();
  }, [theme, systemTheme]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{
        opacity: 1,
        filter: 'drop-shadow(0 0 20px rgba(59, 130, 246, 0.3))',
      }}
    />
  );
}
