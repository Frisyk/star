'use client'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function TreeScene({ mode = 0 }) {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    // --- Scene Setup ---
    const scene = new THREE.Scene()
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
    
    const backLight = new THREE.DirectionalLight(0x4455ff, 0.5)
    backLight.position.set(-5, 0, -5)
    scene.add(backLight)

    // --- Object Creation ---
    const mainGroup = new THREE.Group()
    scene.add(mainGroup)

    // Different shapes for different modes
    const createObject = (m) => {
      // Clear group
      while(mainGroup.children.length > 0){ 
        mainGroup.remove(mainGroup.children[0]); 
      }

      if (m === 0) { // Frisnadi - Tree
        const trunkGeometry = new THREE.CylinderGeometry(0.2, 0.4, 1.5, 8)
        const trunkMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 })
        const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial)
        trunk.position.y = 0.75
        mainGroup.add(trunk)

        const foliageMaterial = new THREE.MeshStandardMaterial({ color: 0x228B22, flatShading: true })
        const levels = [1.8, 2.5, 3.1]
        const sizes = [1.2, 1.0, 0.7]
        levels.forEach((yPos, i) => {
          const foliage = new THREE.Mesh(new THREE.ConeGeometry(sizes[i], sizes[i] * 1.2, 8), foliageMaterial)
          foliage.position.y = yPos
          mainGroup.add(foliage)
        })
      } else if (m === 1) { // Full-stack - Cube/Gear
        const geometry = new THREE.BoxGeometry(2, 2, 2)
        const material = new THREE.MeshStandardMaterial({ color: 0x3b82f6, wireframe: true })
        const cube = new THREE.Mesh(geometry, material)
        cube.position.y = 2
        mainGroup.add(cube)
        
        const innerCube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshStandardMaterial({ color: 0x8b5cf6 }))
        innerCube.position.y = 2
        mainGroup.add(innerCube)
      } else if (m === 2) { // Software Engineer - Spheres/Network
        const geometry = new THREE.SphereGeometry(1.5, 16, 16)
        const material = new THREE.MeshStandardMaterial({ color: 0x10b981, wireframe: true })
        const sphere = new THREE.Mesh(geometry, material)
        sphere.position.y = 2
        mainGroup.add(sphere)
        
        for(let i = 0; i < 5; i++) {
          const smallSphere = new THREE.Mesh(new THREE.SphereGeometry(0.3, 8, 8), new THREE.MeshStandardMaterial({ color: 0x3b82f6 }))
          smallSphere.position.set(Math.cos(i) * 2, 2 + Math.sin(i), Math.sin(i) * 2)
          mainGroup.add(smallSphere)
        }
      } else { // AI Enthusiast - Torus/Brain-like
        const geometry = new THREE.TorusKnotGeometry(1, 0.3, 100, 16)
        const material = new THREE.MeshStandardMaterial({ color: 0xec4899, flatShading: true })
        const knot = new THREE.Mesh(geometry, material)
        knot.position.y = 2
        mainGroup.add(knot)
      }
    }

    createObject(mode)

    // --- Floating Particles ---
    const particlesGeometry = new THREE.BufferGeometry()
    const particlesCount = 100
    const posArray = new Float32Array(particlesCount * 3)
    for(let i = 0; i < particlesCount * 3; i++) posArray[i] = (Math.random() - 0.5) * 10
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3))
    const particlesMaterial = new THREE.PointsMaterial({ size: 0.05, color: 0x3b82f6, transparent: true, opacity: 0.6 })
    const particles = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(particles)
    
    // --- Floor ---
    const platform = new THREE.Mesh(
      new THREE.CylinderGeometry(3, 3, 0.1, 32),
      new THREE.MeshStandardMaterial({ color: 0x3b82f6, transparent: true, opacity: 0.1 })
    )
    platform.position.y = -0.1
    scene.add(platform)

    // --- Interaction ---
    let mouseX = 0, mouseY = 0
    const handleMouseMove = (e) => {
        mouseX = (e.clientX - window.innerWidth / 2) * 0.001
        mouseY = (e.clientY - window.innerHeight / 2) * 0.001
    }
    document.addEventListener('mousemove', handleMouseMove)

    // --- Animation Loop ---
    const clock = new THREE.Clock()
    const animate = () => {
        const time = clock.getElapsedTime()
        const animationId = requestAnimationFrame(animate)

        mainGroup.position.y = Math.sin(time * 0.5) * 0.1
        mainGroup.rotation.y += 0.01
        mainGroup.rotation.x = mouseY
        mainGroup.rotation.z = mouseX

        particles.rotation.y = time * 0.05
        renderer.render(scene, camera)
        return animationId
    }
    const animationId = animate()

    const handleResize = () => {
        if (!containerRef.current) return
        camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight
        camera.updateProjectionMatrix()
        renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    }
    window.addEventListener('resize', handleResize)

    return () => {
        cancelAnimationFrame(animationId)
        window.removeEventListener('resize', handleResize)
        document.removeEventListener('mousemove', handleMouseMove)
        if (containerRef.current && renderer.domElement) {
            containerRef.current.removeChild(renderer.domElement)
        }
        scene.traverse(obj => {
          if(obj.geometry) obj.geometry.dispose()
          if(obj.material) {
            if(Array.isArray(obj.material)) obj.material.forEach(m => m.dispose())
            else obj.material.dispose()
          }
        })
        renderer.dispose()
    }
  }, [mode])

  return (
    <div 
        ref={containerRef} 
        className="w-full h-full min-h-[400px] lg:min-h-[600px] cursor-move"
        title="Interactive 3D Tree - Drag or move mouse"
    />
  )
}
