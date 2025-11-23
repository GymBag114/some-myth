import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { STORY_DATA } from './storyData.js';
import { distortionVertexShader, distortionFragmentShader } from './shaders.js';
import ChapterTransition from './components/ChapterTransition.jsx';
import StoryOverlay from './components/StoryOverlay.jsx';

export default function MythosNovel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // 转场控制
  const [showTransition, setShowTransition] = useState(true);
  const [transitionData, setTransitionData] = useState(STORY_DATA[0]);
  const prevChapterRef = useRef(STORY_DATA[0].chapter);

  const mountRef = useRef(null);
  const modeRef = useRef(STORY_DATA[0].visualMode);

  // 手动关闭转场（用于跳过或修复卡死）
  const handleDismissTransition = () => {
    setShowTransition(false);
  };

  const handleNext = () => {
    if (showTransition) return; // 锁定
    setCurrentIndex(prev => (prev < STORY_DATA.length - 1 ? prev + 1 : 0));
  };
  const handlePrev = () => {
    if (showTransition) return; // 锁定
    setCurrentIndex(prev => (prev > 0 ? prev - 1 : 0));
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT') return;
      if (showTransition) return; // 锁定

      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'Space') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showTransition]);

  // 监听章节变化触发转场
  useEffect(() => {
    modeRef.current = STORY_DATA[currentIndex].visualMode;

    const currentChapter = STORY_DATA[currentIndex].chapter;
    if (currentChapter !== prevChapterRef.current) {
        setTransitionData(STORY_DATA[currentIndex]);
        setShowTransition(true);
        // 3秒后自动关闭
        const timer = setTimeout(() => setShowTransition(false), 3000);
        prevChapterRef.current = currentChapter;
        return () => clearTimeout(timer);
    }
  }, [currentIndex]);

  // 初始加载转场自动关闭
  useEffect(() => {
      const timer = setTimeout(() => setShowTransition(false), 2500);
      return () => clearTimeout(timer);
  }, []);

  // Three.js Effect Setup
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const isMobile = window.innerWidth < 768;
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.03);

    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0, (isMobile && window.innerWidth/window.innerHeight < 1) ? 6 : 4);

    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 3));
    renderer.toneMapping = THREE.ReinhardToneMapping;
    container.appendChild(renderer.domElement);

    const renderScene = new RenderPass(scene, camera);
    const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);
    const composer = new EffectComposer(renderer);
    composer.addPass(renderScene);
    composer.addPass(bloomPass);

    // Core
    const coreGeometry = new THREE.IcosahedronGeometry(1, 32);
    const coreMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        distortStrength: { value: 0 },
        color: { value: new THREE.Color("#ffffff") }
      },
      vertexShader: distortionVertexShader,
      fragmentShader: distortionFragmentShader,
      wireframe: false,
      transparent: true
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    scene.add(coreMesh);

    // Particles (Optimized: 数量减少，透明度降低)
    const particleCount = isMobile ? 100 : 200;
    const particleGeo = new THREE.PlaneGeometry(0.05, 0.05);
    const particleMat = new THREE.MeshBasicMaterial({ 
        color: 0xffffff,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.3,
        blending: THREE.AdditiveBlending,
        depthWrite: false 
    });
    const particles = new THREE.InstancedMesh(particleGeo, particleMat, particleCount);
    scene.add(particles);

    const particleData = new Array(particleCount).fill(0).map(() => ({
      originalX: (Math.random() - 0.5) * (isMobile ? 12 : 20),
      originalY: (Math.random() - 0.5) * 20,
      originalZ: (Math.random() - 0.5) * 10,
      velocity: new THREE.Vector3(0, 0, 0),
      speed: 0.02 + Math.random() * 0.05,
      phase: Math.random() * Math.PI * 2,
      angle: Math.random() * Math.PI * 2,
      x: 0, y: 0, z: 0
    }));
    const dummy = new THREE.Object3D();

    // Stars (Optimized: 数量减少)
    const starCount = isMobile ? 300 : 600;
    const starGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(starCount * 3);
    for(let i=0; i<starCount*3; i++) starPos[i] = (Math.random() - 0.5) * 60;
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    const starMat = new THREE.PointsMaterial({ size: 0.02, color: 0xffffff, transparent: true, opacity: 0.4, blending: THREE.AdditiveBlending });
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    const clock = new THREE.Clock();
    const mouse = new THREE.Vector2();

    const onMouseMove = (e) => {
        mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    const onTouchMove = (e) => {
        if (e.touches.length > 0) {
            mouse.x = (e.touches[0].clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(e.touches[0].clientY / window.innerHeight) * 2 + 1;
        }
    };
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('touchmove', onTouchMove, { passive: true });

    const animate = () => {
      const time = clock.getElapsedTime();
      const mode = modeRef.current;

      let targetColor = new THREE.Color("#000000");
      let targetBloomStrength = 1.5;
      let targetParticleColor = new THREE.Color("#ffffff");
      let targetDistort = 0.2;
      let targetCoreScale = 1;

      if (mode === 'void') {
        targetColor.set("#f5f5f5");
        // 修复：银灰色球体，配合微光，让黑字清晰可见
        targetParticleColor.set("#919191");
        targetBloomStrength = 0.6; 
        targetDistort = 0.1;
        targetCoreScale = 0.8;
      } else if (mode === 'glow') {
        targetColor.set("#121212");
        targetParticleColor.set("#ffffff");
        targetBloomStrength = 2.0;
        targetDistort = 0.4;
      } else if (mode === 'burst') {
        targetColor.set("#1a0505");
        targetParticleColor.set("#ff3333");
        targetBloomStrength = 3.0;
        targetDistort = 1.5;
        targetCoreScale = 1.2;
      } else if (mode === 'unstable') {
        targetColor.set("#05051a");
        targetParticleColor.set("#4d79ff");
        targetBloomStrength = 2.5;
        targetDistort = 1.2;
      } else if (mode === 'island_forming') {
        targetColor.set("#0a0a0a");
        targetParticleColor.set("#ffd700");
        targetBloomStrength = 1.8;
        targetDistort = 0.2;
        targetCoreScale = 1.4;
      } else if (mode === 'duality') {
        targetColor.set("#0f0514");
        targetParticleColor.set("#c084fc");
        targetBloomStrength = 2.2;
        targetDistort = 0.6;
      } else if (mode === 'rain' || mode === 'fall') {
        targetColor.set("#050505");
        targetParticleColor.set("#a0e0ff");
        targetBloomStrength = 1.2;
        targetDistort = 0.3;
      } else if (mode === 'silence') {
        targetColor.set("#000000");
        targetParticleColor.set("#333333");
        targetBloomStrength = 0.5;
        targetCoreScale = 0.01;
      } else if (mode === 'distortion') {
         targetColor.set("#000000");
         targetParticleColor.set("#ff0000");
         targetBloomStrength = 4.0;
         targetDistort = 3.0;
      }

      scene.background = scene.background || new THREE.Color();
      scene.background.lerp(targetColor, 0.05);
      scene.fog.color.copy(scene.background);
      bloomPass.strength += (targetBloomStrength - bloomPass.strength) * 0.05;
      
      coreMaterial.uniforms.color.value.lerp(targetParticleColor, 0.05);
      coreMaterial.uniforms.time.value = time;
      coreMaterial.uniforms.distortStrength.value += (targetDistort - coreMaterial.uniforms.distortStrength.value) * 0.05;
      coreMesh.scale.lerp(new THREE.Vector3(targetCoreScale, targetCoreScale, targetCoreScale), 0.05);
      coreMesh.rotation.y = time * 0.1 + mouse.x * 0.1;
      coreMesh.rotation.x = mouse.y * 0.1;

      particles.material.color.lerp(targetParticleColor, 0.05);

      for (let i = 0; i < particleCount; i++) {
        const p = particleData[i];
        if (mode === 'fall' || mode === 'rain') {
            p.y -= p.speed * (mode === 'rain' ? 5.0 : 2.0);
            if (p.y < -12) {
                p.y = 12;
                p.x = (Math.random() - 0.5) * (isMobile ? 15 : 25);
                p.z = (Math.random() - 0.5) * 10;
            }
            p.x += Math.sin(time + p.y) * 0.01;
        } else if (mode === 'island_forming') {
            p.angle += 0.002 * (i % 2 === 0 ? 1 : -1);
            const targetRadius = 3 + Math.sin(time + i) * 0.5;
            const tx = Math.cos(p.angle + i) * targetRadius;
            const tz = Math.sin(p.angle + i) * targetRadius;
            const ty = Math.sin(time * 2 + i * 0.1) * 0.5;
            p.x += (tx - p.x) * 0.02;
            p.y += (ty - p.y) * 0.02;
            p.z += (tz - p.z) * 0.02;
        } else if (mode === 'burst' || mode === 'distortion') {
            const burstSpeed = mode === 'distortion' ? 0.5 : 0.2;
            const noise = Math.sin(time * 5 + i);
            const tx = p.originalX * (1 + Math.sin(time) * burstSpeed);
            const ty = p.originalY * (1 + Math.cos(time) * burstSpeed);
            const tz = p.originalZ + noise;
            p.x += (tx - p.x) * 0.1;
            p.y += (ty - p.y) * 0.1;
            p.z += (tz - p.z) * 0.1;
        } else if (mode === 'void') {
            const tx = p.originalX * 2;
            const ty = p.originalY * 2;
            const tz = p.originalZ * 2;
            p.x += (tx - p.x) * 0.01;
            p.y += (ty - p.y) * 0.01;
            p.z += (tz - p.z) * 0.01;
        } else {
            const floatY = Math.sin(time + p.phase) * 1.5;
            const floatX = Math.cos(time * 0.5 + p.phase) * 0.5;
            p.x += (p.originalX + floatX - p.x) * 0.05;
            p.y += (p.originalY + floatY - p.y) * 0.05;
            p.z += (p.originalZ - p.z) * 0.05;
        }
        dummy.position.set(p.x, p.y, p.z);
        dummy.rotation.copy(camera.rotation);
        let s = 1;
        if (mode === 'rain') s = 0.5;
        else if (mode === 'burst') s = 1.0 + Math.sin(time * 10 + i) * 0.5;
        dummy.scale.set(s, s, s);
        dummy.updateMatrix();
        particles.setMatrixAt(i, dummy.matrix);
      }
      particles.instanceMatrix.needsUpdate = true;

      camera.position.x += (mouse.x * 0.5 - camera.position.x) * 0.02;
      camera.position.y += (mouse.y * 0.5 - camera.position.y) * 0.02;
      camera.lookAt(0, 0, 0);
      composer.render();
      requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      camera.aspect = width / height;
      camera.position.z = (width < 768 && width / height < 1) ? 6 : 4;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      composer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
      renderer.dispose();
      composer.dispose();
      coreGeometry.dispose();
      coreMaterial.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      starGeo.dispose();
      starMat.dispose();
    };
  }, []);

  const currentData = STORY_DATA[currentIndex];

  return (
    <div className="w-full h-screen sm:h-[100dvh] overflow-hidden bg-black font-sans selection:bg-white/30 relative">
      <div ref={mountRef} className="absolute inset-0 z-0 block" />

      {/* 全屏章节转场 */}
      <ChapterTransition 
         show={showTransition} 
         chapterData={transitionData}
         onDismiss={handleDismissTransition}
      />

      {/* 故事内容覆盖层 */}
      <StoryOverlay 
        currentData={currentData} 
        onNext={handleNext} 
        onPrev={handlePrev}
        progress={currentIndex}
        total={STORY_DATA.length}
        showTransition={showTransition}
      />

      {/* 装饰线 (Desktop) */}
      <div className="absolute top-0 left-0 p-6 md:p-8 pointer-events-none z-20 opacity-40 hidden md:block">
        <motion.div 
          animate={{ backgroundColor: currentData.visualMode === 'void' ? '#000' : '#fff' }}
          className="w-px h-32"
        />
      </div>
      <div className="absolute bottom-0 right-0 p-6 md:p-8 pointer-events-none z-20 opacity-40 hidden md:block">
        <motion.div 
          animate={{ backgroundColor: currentData.visualMode === 'void' ? '#000' : '#fff' }}
          className="w-px h-32"
        />
      </div>
      
      {/* Start Hint */}
      {currentIndex === 0 && !showTransition && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className={`absolute bottom-24 md:bottom-8 w-full text-center text-[10px] tracking-[0.2em] uppercase z-10 pointer-events-none ${currentData.visualMode === 'void' ? 'text-black/30' : 'text-white/30'}`}
        >
          <span className="hidden md:inline">「 按 下 空 格 或 点 击 按 钮 以 继 续 」</span>
          <span className="md:hidden">「 轻 触 按 钮 以 继 续 」</span>
        </motion.div>
      )}
    </div>
  );
}