'use client'
import { useRef, useEffect } from 'react';
import * as THREE from 'three';

export default function ThreeBackground() {
  const mountRef = useRef(null);

  useEffect(() => {
    // Scene, Camera, Renderer setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Resize Handler
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', handleResize);

    // Create shapes
    const shapes = [];
    const shapeTypes = [
      new THREE.BoxGeometry(),
      new THREE.SphereGeometry(1, 32, 32),
      new THREE.ConeGeometry(1, 2, 32),
      new THREE.TorusGeometry(1, 0.4, 16, 100)
    ];
    const material = new THREE.MeshBasicMaterial({ color: 0x0080FF, wireframe: true });

    for (let i = 0; i < 20; i++) {
      const geometry = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
      const shape = new THREE.Mesh(geometry, material);
      shape.position.set(Math.random() * 10 - 5, Math.random() * 10 - 5, Math.random() * 10 - 5);
      shapes.push(shape);
      scene.add(shape);
    }

    camera.position.z = 10;

    // Animation Loop
    const animate = () => {
      requestAnimationFrame(animate);
      shapes.forEach(shape => {
        shape.rotation.x += 0.01;
        shape.rotation.y += 0.01;
      });
      renderer.render(scene, camera);
    };
    animate();

    // Clean up
    return () => {
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div ref={mountRef} className="w-full h-screen relative overflow-hidden">
      <h1 className="text-blue-100 flex items-center justify-center absolute inset-0 text-center text-3xl lg:text-9xl font-bold">COMING SOON!!</h1>
    </div>
  );
}
