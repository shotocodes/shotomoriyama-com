// src/components/sections/HeroSection.tsx
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';
import * as THREE from 'three';

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [showEnglish, setShowEnglish] = useState(true);
  const [isDissolving, setIsDissolving] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 英語→日本語の切り替えタイマー
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsDissolving(true);
      setTimeout(() => {
        setShowEnglish(false);
      }, 1500); // ドット分解完了まで待つ（1200→1500に延長）
    }, 6000); // 英文表示時間（4000 → 6000に変更 = 6秒）

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!canvasRef.current || !mounted) return;

    const currentTheme = theme === 'system' ? systemTheme : theme;
    const isDark = currentTheme === 'dark';

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
    const gridDivisions = 60;
    const geometry = new THREE.PlaneGeometry(gridSize, gridSize, gridDivisions, gridDivisions);

    const colors = [];
    let color1, color2, color3, color4;

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
    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i);
      const y = positions.getY(i);

      const mixAmount = (x / gridSize + 0.5);
      const mixAmountY = (y / gridSize + 0.5);
      const color = new THREE.Color();

      if (mixAmount < 0.33) {
        color.lerpColors(color1, color2, mixAmount * 3);
      } else if (mixAmount < 0.66) {
        color.lerpColors(color2, color3, (mixAmount - 0.33) * 3);
      } else {
        color.lerpColors(color3, color4, (mixAmount - 0.66) * 3);
      }

      color.lerp(color4, mixAmountY * 0.2);
      colors.push(color.r, color.g, color.b);
    }

    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

    const material = new THREE.MeshBasicMaterial({
      vertexColors: true,
      wireframe: true,
      transparent: true,
      opacity: isDark ? 0.8 : 0.7,
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = -Math.PI / 3;
    scene.add(mesh);

    const mouse = { x: 0, y: 0 };

    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    document.addEventListener('mousemove', handleMouseMove);

    const clock = new THREE.Clock();
    let animationId: number;

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      const positions = geometry.attributes.position;
      for (let i = 0; i < positions.count; i++) {
        const x = positions.getX(i);
        const y = positions.getY(i);

        const distance = Math.sqrt(
          Math.pow(x - mouse.x * 10, 2) + Math.pow(y - mouse.y * 10, 2)
        );
        const mouseWave = Math.sin(distance * 0.5 - elapsedTime * 2) * 1.2;

        const wave2 = Math.sin(x * 0.3 + elapsedTime) * 0.5;
        const wave3 = Math.cos(y * 0.3 + elapsedTime * 0.7) * 0.5;

        positions.setZ(i, mouseWave + wave2 + wave3);
      }
      positions.needsUpdate = true;

      mesh.rotation.z = Math.sin(elapsedTime * 0.2) * 0.1;

      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [theme, systemTheme, mounted]);

  // Tilted horizontal ellipse with heartbeat
  const TiltedEllipse = () => (
    <motion.svg
      className="absolute -inset-2 sm:-inset-32 md:-inset-48 lg:-inset-56 w-auto h-auto pointer-events-none"
      viewBox="0 0 600 400"
      style={{
        opacity: 0.25,
        transform: 'rotate(45deg)',
      }}
    >
      <motion.ellipse
        cx="200"
        cy="180"
        rx="160"
        ry="80"
        fill="none"
        stroke="currentColor"
        strokeWidth="12"
        className="text-accent"
        initial={{ scale: 1 }}
        animate={{
          scale: [1, 1.04, 1, 1.02, 1],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
          times: [0, 0.2, 0.4, 0.6, 1],
        }}
      />
    </motion.svg>
  );

  // タイプライター + 文字分解アニメーション
  const TypewriterLine = ({ text, index }: { text: string; index: number }) => {
    const [displayedChars, setDisplayedChars] = useState(0);

    useEffect(() => {
      // 英語表示中かつ分解アニメーション前のみ実行
      if (!showEnglish || isDissolving) return;

      const totalDelay = index * 800;
      const timer = setTimeout(() => {
        const interval = setInterval(() => {
          setDisplayedChars(prev => {
            if (prev < text.length) {
              return prev + 1;
            }
            clearInterval(interval);
            return prev;
          });
        }, 50);

        return () => clearInterval(interval);
      }, totalDelay);

      return () => clearTimeout(timer);
    }, [text, index, showEnglish, isDissolving]);

    return (
      <div className="mb-4 relative inline-block">
        {text.split('').map((char, i) => {
          if (char === ' ') {
            return <span key={`char-${i}`} className="inline-block">&nbsp;</span>;
          }

          // ランダムな飛散方向を生成
          const angle = Math.random() * Math.PI * 2;
          const distance = 100 + Math.random() * 150;
          const randomX = Math.cos(angle) * distance;
          const randomY = Math.sin(angle) * distance;
          const randomRotate = (Math.random() - 0.5) * 720;

          return (
            <motion.span
              key={`char-${i}`}
              className="inline-block relative"
              style={{
                transformOrigin: 'center center',
              }}
            >
              {/* タイプライター表示用の文字（分解前） */}
              <motion.span
                className="inline-block"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: isDissolving ? 0 : (i < displayedChars ? 1 : 0),
                }}
                transition={{
                  duration: isDissolving ? 0.3 : 0.1,
                }}
              >
                {char}
              </motion.span>

              {/* 分解用の文字（粒子として飛散） */}
              {isDissolving && (
                <motion.span
                  className="absolute inset-0 inline-block"
                  initial={{
                    opacity: 1,
                    scale: 1,
                    x: 0,
                    y: 0,
                    rotate: 0,
                  }}
                  animate={{
                    opacity: 0,
                    scale: 0.3,
                    x: randomX,
                    y: randomY,
                    rotate: randomRotate,
                  }}
                  transition={{
                    duration: 1.5,
                    delay: i * 0.02 + index * 0.1,
                    ease: "easeOut",
                  }}
                >
                  {char}
                </motion.span>
              )}
            </motion.span>
          );
        })}
      </div>
    );
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background transition-colors duration-300">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{
          opacity: 1,
          filter: 'drop-shadow(0 0 20px rgba(59, 130, 246, 0.3))'
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/30" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-center max-w-5xl mx-auto"
        >
          {!showEnglish && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-base sm:text-lg text-text-muted mb-8 tracking-wider"
            >
              W E B  D E S I G N  &  D E V E L O P M E N T
            </motion.p>
          )}

          <div className="mb-6 min-h-[100px] sm:min-h-[130px] md:min-h-[150px] lg:min-h-[200px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              {showEnglish ? (
                <motion.div
                  key="english"
                  className="text-xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light leading-relaxed text-primary"
                >
                  <TypewriterLine text="Even small ideas," index={0} />
                  <TypewriterLine text="Through careful craftsmanship," index={1} />
                  <TypewriterLine text="Transform into a great future." index={2} />
                </motion.div>
              ) : (
                <motion.div
                  key="japanese"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-2xl xl:text-6xl font-light leading-relaxed text-primary"
                >
                  <h1 className="mb-1">小さな想いも、</h1>
                  <h1 className="mb-1">丁寧なものづくりで、</h1>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {!showEnglish && (
            <>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="relative inline-block mb-12"
              >
                <TiltedEllipse />
                <h1 className="relative text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight px-8">
                  <span
                    className="bg-gradient-to-r from-[#0066FF] via-[#A8DADC] to-[#FF6B6B] dark:from-[#3B82F6] dark:via-[#8B5CF6] dark:to-[#EF4444] bg-clip-text text-transparent"
                    style={{ filter: 'drop-shadow(0 0 10px rgba(59, 130, 246, 0.3))' }}
                  >
                    大きな未来に<span className="whitespace-nowrap">変わる。</span>
                  </span>
                </h1>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="text-lg sm:text-xl text-text-secondary font-light tracking-widest mb-12"
              >
                森山翔登
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
              >
                <Link
                  href="#contact"
                  className="inline-block bg-gradient-to-r from-[#0066FF] to-[#A8DADC] dark:from-[#3B82F6] dark:to-[#8B5CF6] text-white font-semibold rounded-full hover:shadow-2xl hover:scale-105 transition-all duration-300 text-base sm:text-lg px-12 sm:px-20 py-3 sm:py-4 group"
                  style={{
                    boxShadow: '0 10px 40px rgba(59, 130, 246, 0.3)',
                    padding: '5px 20px',
                    margin: '10px 20px',
                  }}
                >
                  <span className="inline-block group-hover:scale-110 transition-transform">
                    CONTACT
                  </span>
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.3 }}
                className="mt-24"
              >
                <motion.div
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="flex flex-col items-center gap-2"
                >
                  <span className="text-xs text-text-muted tracking-widest">S C R O L L</span>
                  <div className="w-[2px] h-12 bg-gradient-to-b from-text-muted to-transparent" />
                </motion.div>
              </motion.div>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
}
