'use client'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function TreeScene() {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    // --- Scene Setup ---
    const scene = new THREE.Scene()
    // Transparent background to blend with website theme
    scene.background = null 

    const camera = new THREE.PerspectiveCamera(45, containerRef.current.clientWidth / containerRef.current.clientHeight, 0.1, 1000)
    camera.position.set(0, 2, 8)
    camera.lookAt(0, 1, 0)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    containerRef.current.appendChild(renderer.domElement)

    // --- Lighting ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
    scene.add(ambientLight)

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2)
    dirLight.position.set(5, 10, 7)
    scene.add(dirLight)
    
    // Add a subtle rim light for better 3D effect
    const backLight = new THREE.DirectionalLight(0x4455ff, 0.5)
    backLight.position.set(-5, 0, -5)
    scene.add(backLight)

    // --- Object Creation (Procedural Tree) ---
    const treeGroup = new THREE.Group()

    // 1. Trunk
    const trunkGeometry = new THREE.CylinderGeometry(0.2, 0.4, 1.5, 8)
    const trunkMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513, roughness: 0.8 })
    const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial)
    trunk.position.y = 0.75
    treeGroup.add(trunk)

    // 2. Foliage (Low Poly Style)
    const foliageMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x228B22, 
        roughness: 0.6,
        flatShading: true 
    })

    const level1 = new THREE.Mesh(new THREE.ConeGeometry(1.2, 1.5, 8), foliageMaterial)
    level1.position.y = 1.8
    treeGroup.add(level1)

    const level2 = new THREE.Mesh(new THREE.ConeGeometry(1.0, 1.3, 8), foliageMaterial)
    level2.position.y = 2.5
    treeGroup.add(level2)
    
    const level3 = new THREE.Mesh(new THREE.ConeGeometry(0.7, 1.0, 8), foliageMaterial)
    level3.position.y = 3.1
    treeGroup.add(level3)

    scene.add(treeGroup)

    // --- Floating Particles (Fireflies/Leaves) ---
    const particlesGeometry = new THREE.BufferGeometry()
    const particlesCount = 50
    const posArray = new Float32Array(particlesCount * 3)

    for(let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 6
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3))
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.05,
        color: 0xccffcc,
        transparent: true,
        opacity: 0.8
    })
    const particles = new THREE.Points(particlesGeometry, particlesMaterial)
    particles.position.y = 2
    scene.add(particles)
    
    // --- Floor/Platform ---
    const platformGeo = new THREE.CylinderGeometry(3, 3, 0.1, 32)
    const platformMat = new THREE.MeshStandardMaterial({ color: 0x1a202c, transparent: true, opacity: 0.2 })
    const platform = new THREE.Mesh(platformGeo, platformMat)
    platform.position.y = -0.1
    scene.add(platform)

    // --- Interaction ---
    let mouseX = 0
    let mouseY = 0
    const windowHalfX = window.innerWidth / 2
    const windowHalfY = window.innerHeight / 2

    const handleMouseMove = (event) => {
        mouseX = (event.clientX - windowHalfX)
        mouseY = (event.clientY - windowHalfY)
    }

    document.addEventListener('mousemove', handleMouseMove)

    // --- Animation Loop ---
    const clock = new THREE.Clock()

    const animate = () => {
        const time = clock.getElapsedTime()

        // Gentle floating of the tree
        treeGroup.position.y = Math.sin(time * 0.5) * 0.1

        // Mouse interaction rotation
        const targetRotX = mouseY * 0.001
        const targetRotY = mouseX * 0.001

        treeGroup.rotation.x += 0.05 * (targetRotX - treeGroup.rotation.x)
        treeGroup.rotation.y += 0.05 * (targetRotY - treeGroup.rotation.y)

        // Rotate particles slowly
        particles.rotation.y = time * 0.05

        renderer.render(scene, camera)
        requestAnimationFrame(animate)
    }

    animate()

    // --- Resize ---
    const handleResize = () => {
        if (!containerRef.current) return
        const width = containerRef.current.clientWidth
        const height = containerRef.current.clientHeight
        
        camera.aspect = width / height
        camera.updateProjectionMatrix()
        renderer.setSize(width, height)
    }

    window.addEventListener('resize', handleResize)

    return () => {
        window.removeEventListener('resize', handleResize)
        document.removeEventListener('mousemove', handleMouseMove)
        if (containerRef.current && renderer.domElement) {
            containerRef.current.removeChild(renderer.domElement)
        }
        // Dispose geometries to prevent leaks
        trunkGeometry.dispose()
        trunkMaterial.dispose()
        particlesGeometry.dispose()
        particlesMaterial.dispose()
    }
  }, [])

  return (
    <div 
        ref={containerRef} 
        className="w-full h-full min-h-[400px] lg:min-h-[600px] cursor-move"
        title="Interactive 3D Tree - Drag or move mouse"
    />
  )
}
