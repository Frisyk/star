'use client'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { useDarkMode } from './DarkModeProvider'

export default function ForestScene() {
  const containerRef = useRef(null)
  const isDarkMode = useDarkMode()

  useEffect(() => {
    const currentContainer = containerRef.current
    if (!currentContainer) return

    // Colors based on theme
    const fogColor = isDarkMode ? 0x111827 : 0xf3f4f6
    const groundColor = isDarkMode ? 0x1f2937 : 0x9ca3af
    const lightColor = isDarkMode ? 0xaaccff : 0xffffff
    const ambientColor = isDarkMode ? 0x404040 : 0xffffff

    // Scene
    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(fogColor, 0.002)

    // Camera
    const camera = new THREE.PerspectiveCamera(60, currentContainer.clientWidth / currentContainer.clientHeight, 0.1, 1000)
    camera.position.set(0, 5, 20)
    camera.lookAt(0, 0, 0)

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(currentContainer.clientWidth, currentContainer.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    currentContainer.appendChild(renderer.domElement)

    // Lights
    const ambientLight = new THREE.AmbientLight(ambientColor, isDarkMode ? 2 : 1)
    scene.add(ambientLight)

    const mainLight = new THREE.DirectionalLight(lightColor, isDarkMode ? 0.5 : 1)
    mainLight.position.set(10, 20, 10)
    scene.add(mainLight)

    // Ground
    const groundGeometry = new THREE.PlaneGeometry(200, 200, 50, 50)
    const groundMaterial = new THREE.MeshStandardMaterial({ 
        color: groundColor,
        wireframe: true,
        transparent: true,
        opacity: isDarkMode ? 0.3 : 0.1
    })
    const ground = new THREE.Mesh(groundGeometry, groundMaterial)
    ground.rotation.x = -Math.PI / 2
    scene.add(ground)

    // Forest / Trees (Simple procedural trees)
    const treeGeometry = new THREE.ConeGeometry(0.5, 2, 8)
    const treeMaterial = new THREE.MeshStandardMaterial({ 
        color: isDarkMode ? 0x064e3b : 0x059669,
        wireframe: true 
    })

    for(let i = 0; i < 100; i++) {
        const tree = new THREE.Mesh(treeGeometry, treeMaterial)
        tree.position.x = (Math.random() - 0.5) * 150
        tree.position.z = (Math.random() - 0.5) * 150
        tree.position.y = 1
        tree.scale.setScalar(Math.random() * 2 + 1)
        scene.add(tree)
    }

    // Particles (Snow/Fireflies)
    const particlesGeometry = new THREE.BufferGeometry()
    const particlesCount = 500
    const posArray = new Float32Array(particlesCount * 3)

    for(let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 100
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3))
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.05,
        color: isDarkMode ? 0x60a5fa : 0x10b981,
        transparent: true,
        opacity: 0.6
    })
    const particles = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(particles)

    // Animation state
    let mouseX = 0
    let mouseY = 0
    const handleMouseMove = (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 10
        mouseY = (e.clientY / window.innerHeight - 0.5) * 10
    }
    document.addEventListener('mousemove', handleMouseMove)

    // Animation Loop
    const animate = () => {
        const animationId = requestAnimationFrame(animate)

        // Camera movement based on mouse
        camera.position.x += (mouseX - camera.position.x) * 0.05
        camera.position.y += (-mouseY + 5 - camera.position.y) * 0.05
        camera.lookAt(0, 0, 0)

        // Particles animation
        particles.rotation.y += 0.001
        particles.position.y -= 0.01
        if (particles.position.y < -10) particles.position.y = 10

        renderer.render(scene, camera)
        return animationId
    }
    const animationId = animate()

    // Resize
    const handleResize = () => {
        if (!currentContainer) return
        camera.aspect = currentContainer.clientWidth / currentContainer.clientHeight
        camera.updateProjectionMatrix()
        renderer.setSize(currentContainer.clientWidth, currentContainer.clientHeight)
    }
    window.addEventListener('resize', handleResize)

    return () => {
        cancelAnimationFrame(animationId)
        window.removeEventListener('resize', handleResize)
        document.removeEventListener('mousemove', handleMouseMove)
        if (currentContainer && renderer.domElement) {
            currentContainer.removeChild(renderer.domElement)
        }
        groundGeometry.dispose()
        groundMaterial.dispose()
        treeGeometry.dispose()
        treeMaterial.dispose()
        particlesGeometry.dispose()
        particlesMaterial.dispose()
        renderer.dispose()
    }
  }, [isDarkMode])

  return (
    <div ref={containerRef} className="absolute inset-0 -z-10 w-full h-full opacity-50 dark:opacity-80 transition-opacity duration-1000" />
  )
}
