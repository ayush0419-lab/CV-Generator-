import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

function ThreeBackground() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // 1. Setup Scene, Camera, Renderer
    const scene = new THREE.Scene();
    
    // Perspective Camera: FOV, Aspect, Near, Far
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    camera.position.z = 250;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0); // Transparent background

    containerRef.current.appendChild(renderer.domElement);

    // 2. Create Objects
    // Object A: A large glowing wireframe TorusKnot in the center
    const geometry = new THREE.TorusKnotGeometry(60, 20, 120, 16);
    const material = new THREE.MeshBasicMaterial({
      color: 0x3b82f6,
      wireframe: true,
      transparent: true,
      opacity: 0.15,
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Object B: Floating particle field surrounding the node
    const particleCount = 150;
    const particlesGeom = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities = [];

    for (let i = 0; i < particleCount; i++) {
      // Spew randomly inside a radius sphere
      const x = (Math.random() - 0.5) * 500;
      const y = (Math.random() - 0.5) * 500;
      const z = (Math.random() - 0.5) * 500;
      
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      velocities.push({
        x: (Math.random() - 0.5) * 0.2,
        y: (Math.random() - 0.5) * 0.2,
        z: (Math.random() - 0.5) * 0.2,
      });
    }

    particlesGeom.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Particle styling material
    const particlesMaterial = new THREE.PointsMaterial({
      color: 0x60a5fa,
      size: 3,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
    });

    const starPoints = new THREE.Points(particlesGeom, particlesMaterial);
    scene.add(starPoints);

    // 3. Mouse Interact State
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event) => {
      // Calculate normalized mouse coords relative to center
      mouseX = (event.clientX - window.innerWidth / 2) * 0.15;
      mouseY = (event.clientY - window.innerHeight / 2) * 0.15;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // 4. Handle Window Resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // 5. Animation Render Loop
    let animationFrameId = null;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Rotate torus knot slowly
      mesh.rotation.x += 0.002;
      mesh.rotation.y += 0.003;

      // Animate floating particles
      const positionsArr = particlesGeom.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        positionsArr[i * 3] += velocities[i].x;
        positionsArr[i * 3 + 1] += velocities[i].y;
        positionsArr[i * 3 + 2] += velocities[i].z;

        // Wrap around boundaries
        if (Math.abs(positionsArr[i * 3]) > 300) positionsArr[i * 3] *= -0.95;
        if (Math.abs(positionsArr[i * 3 + 1]) > 300) positionsArr[i * 3 + 1] *= -0.95;
        if (Math.abs(positionsArr[i * 3 + 2]) > 300) positionsArr[i * 3 + 2] *= -0.95;
      }
      particlesGeom.attributes.position.needsUpdate = true;
      starPoints.rotation.y -= 0.0008;

      // Apply camera parallax lerping
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      camera.position.x = 250 * Math.sin(targetX * 0.003);
      camera.position.y = -targetY * 0.4;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    // 6. Cleanup Hook
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      
      if (containerRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        containerRef.current.removeChild(renderer.domElement);
      }

      // Dispose Three assets
      geometry.dispose();
      material.dispose();
      particlesGeom.dispose();
      particlesMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="three-canvas-bg no-print" 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none', // Allow clicking elements through canvas
        overflow: 'hidden'
      }}
    />
  );
}

export default ThreeBackground;
