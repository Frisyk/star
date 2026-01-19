'use client'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function ThreeExperience() {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x050505)

    // Camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 30

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    containerRef.current.appendChild(renderer.domElement)

    // --- Objects ---

    // 1. Torus Geometry (The main ring)
    const torusGeometry = new THREE.TorusGeometry(10, 3, 16, 100)
    const torusMaterial = new THREE.PointsMaterial({
        size: 0.05,
        color: 0x00aaff,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    })
    const torus = new THREE.Points(torusGeometry, torusMaterial)
    scene.add(torus)

    // 2. Background Particles
    const particlesGeometry = new THREE.BufferGeometry()
    const particlesCount = 2000
    const posArray = new Float32Array(particlesCount * 3)

    for(let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 100
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3))
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.03,
        color: 0xffffff,
        transparent: true,
        opacity: 0.4
    })
    const particles = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(particles)

    // Interaction State
    let mouseX = 0
    let mouseY = 0
    
    const windowHalfX = window.innerWidth / 2
    const windowHalfY = window.innerHeight / 2

    const handleMouseMove = (event) => {
        mouseX = (event.clientX - windowHalfX)
        mouseY = (event.clientY - windowHalfY)
    }

    document.addEventListener('mousemove', handleMouseMove)

    // Animation Loop
    const clock = new THREE.Clock()

    const animate = () => {
        const elapsedTime = clock.getElapsedTime()

        // Rotate Torus
        torus.rotation.y += 0.005
        torus.rotation.x += 0.002
        
        // Interactive Rotation based on mouse
        const targetRotationX = mouseY * 0.0005
        const targetRotationY = mouseX * 0.0005
        
        torus.rotation.x += 0.05 * (targetRotationX - torus.rotation.x)
        torus.rotation.y += 0.05 * (targetRotationY - torus.rotation.y)

        // Rotate Particles
        particles.rotation.y = -mouseX * 0.0002
        particles.rotation.x = -mouseY * 0.0002

        // Pulse effect
        // torus.scale.x = 1 + Math.sin(elapsedTime * 0.5) * 0.05
        // torus.scale.y = 1 + Math.sin(elapsedTime * 0.5) * 0.05

        renderer.render(scene, camera)
        requestAnimationFrame(animate)
    }

    animate()

    // Resize Handler
    const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
        window.removeEventListener('resize', handleResize)
        document.removeEventListener('mousemove', handleMouseMove)
        if (containerRef.current && renderer.domElement) {
            containerRef.current.removeChild(renderer.domElement)
        }
        torusGeometry.dispose()
        torusMaterial.dispose()
        particlesGeometry.dispose()
        particlesMaterial.dispose()
    }
  }, [])

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      <div ref={containerRef} className="absolute inset-0 z-0" />
      
      {/* Overlay Content */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none">
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-center p-6 bg-black/30 backdrop-blur-sm rounded-xl border border-white/10"
        >
            <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-4">
                Interactive 3D World
            </h1>
            <p className="text-gray-300 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
                Explore the digital dimension. Move your mouse to interact with the universe.
            </p>
            <div className="pointer-events-auto">
                <Link 
                    href="/projects" 
                    className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-[0_0_20px_rgba(37,99,235,0.5)]"
                >
                    View My Projects
                </Link>
            </div>
        </motion.div>
      </div>
    </div>
  )
}
