'use client'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { motion } from 'framer-motion'
import Link from 'next/link'

import { useDarkMode } from './DarkModeProvider'

export default function ThreeBackground() {
  const containerRef = useRef(null)
  const isDarkMode = useDarkMode()

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    const bgColor = isDarkMode ? 0x050505 : 0xf9fafb
    scene.background = new THREE.Color(bgColor)

    // Camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 30

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    containerRef.current.appendChild(renderer.domElement)

    // --- Objects ---

    // 1. Torus Geometry
    const torusGeometry = new THREE.TorusGeometry(10, 3, 16, 100)
    const torusMaterial = new THREE.PointsMaterial({
        size: 0.05,
        color: isDarkMode ? 0x00aaff : 0x2563eb,
        transparent: true,
        opacity: 0.8,
        blending: isDarkMode ? THREE.AdditiveBlending : THREE.NormalBlending
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
        color: isDarkMode ? 0xffffff : 0x6b7280,
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
    const animate = () => {
        const animationId = requestAnimationFrame(animate)

        torus.rotation.y += 0.005
        torus.rotation.x += 0.002
        
        const targetRotationX = mouseY * 0.0005
        const targetRotationY = mouseX * 0.0005
        
        torus.rotation.x += 0.05 * (targetRotationX - torus.rotation.x)
        torus.rotation.y += 0.05 * (targetRotationY - torus.rotation.y)

        particles.rotation.y = -mouseX * 0.0002
        particles.rotation.x = -mouseY * 0.0002

        renderer.render(scene, camera)
        return animationId
    }
    const animationId = animate()

    const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', handleResize)

    return () => {
        cancelAnimationFrame(animationId)
        window.removeEventListener('resize', handleResize)
        document.removeEventListener('mousemove', handleMouseMove)
        if (containerRef.current && renderer.domElement) {
            containerRef.current.removeChild(renderer.domElement)
        }
        torusGeometry.dispose()
        torusMaterial.dispose()
        particlesGeometry.dispose()
        particlesMaterial.dispose()
        renderer.dispose()
    }
  }, [isDarkMode])

  return (
    <div className="relative w-full h-screen bg-white dark:bg-black overflow-hidden transition-colors duration-500">
      <div ref={containerRef} className="absolute inset-0 z-0" />
      
      {/* Overlay Content */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none">
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-center p-6 md:p-12 bg-white/30 dark:bg-black/30 backdrop-blur-md rounded-3xl border border-white/20 dark:border-white/10 shadow-2xl"
        >
            <h1 className="text-4xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-500 mb-6 uppercase tracking-tighter">
                3D Experience
            </h1>
            <p className="text-gray-700 dark:text-gray-300 text-lg md:text-2xl mb-10 max-w-2xl mx-auto font-medium">
                Explore the intersection of art and code in this interactive 3D universe.
            </p>
            <div className="pointer-events-auto flex flex-wrap justify-center gap-4">
                <Link 
                    href="/projects" 
                    className="px-10 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-2xl font-bold transition-all duration-300 hover:scale-105 shadow-xl"
                >
                    Explore Projects
                </Link>
                <Link 
                    href="/" 
                    className="px-10 py-4 bg-transparent border-2 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-2xl font-bold transition-all duration-300 hover:border-blue-500"
                >
                    Back Home
                </Link>
            </div>
        </motion.div>
      </div>
    </div>
  )
}