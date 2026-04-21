'use client'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { useDarkMode } from './DarkModeProvider'

export default function ForestScene() {
  const containerRef = useRef(null)
  const isDarkMode = useDarkMode()

  useEffect(() => {
    if (!containerRef.current) return

    // Colors based on theme
    const fogColor = isDarkMode ? 0x111827 : 0xf3f4f6
    const groundColor = isDarkMode ? 0x1f2937 : 0x9ca3af
    const lightColor = isDarkMode ? 0xaaccff : 0xffffff
    const ambientColor = isDarkMode ? 0x404040 : 0xffffff

    // Scene
    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(fogColor, 0.002)

    // Camera
    const camera = new THREE.PerspectiveCamera(60, containerRef.current.clientWidth / containerRef.current.clientHeight, 0.1, 1000)
    camera.position.set(0, 5, 20)
    camera.lookAt(0, 0, 0)

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    containerRef.current.appendChild(renderer.domElement)

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
    
    // Add terrain noise
    const positionAttribute = groundGeometry.attributes.position
    for (let i = 0; i < positionAttribute.count; i++) {
        const x = positionAttribute.getX(i)
        const y = positionAttribute.getY(i)
        const z = Math.sin(x * 0.1) * Math.cos(y * 0.1) * 2
        positionAttribute.setZ(i, z)
    }
    groundGeometry.computeVertexNormals()
    
    scene.add(ground)

    // Trees (Simple Cones)
    const treeGeometry = new THREE.ConeGeometry(1, 4, 8)
    const treeMaterial = new THREE.MeshStandardMaterial({ 
        color: isDarkMode ? 0x064e3b : 0x10b981, 
        flatShading: true 
    })
    
    const trees = []
    for(let i = 0; i < 50; i++) {
        const tree = new THREE.Mesh(treeGeometry, treeMaterial)
        const x = (Math.random() - 0.5) * 100
        const z = (Math.random() - 0.5) * 100
        
        if(Math.abs(x) < 5) continue
        
        tree.position.set(x, 2, z)
        tree.scale.setScalar(0.5 + Math.random() * 1.5)
        scene.add(tree)
        trees.push(tree)
    }

    // Particles (Fireflies/Dust)
    const particlesGeometry = new THREE.BufferGeometry()
    const particlesCount = 200
    const posArray = new Float32Array(particlesCount * 3)

    for(let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 100
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3))
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.2,
        color: isDarkMode ? 0xfef08a : 0x3b82f6,
        transparent: true,
        opacity: 0.8
    })
    const particles = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(particles)


    // Interaction
    let mouseX = 0
    let mouseY = 0
    
    const handleMouseMove = (event) => {
        mouseX = (event.clientX / window.innerWidth - 0.5) * 2
        mouseY = (event.clientY / window.innerHeight - 0.5) * 2
    }
    document.addEventListener('mousemove', handleMouseMove)

    // Animation
    const animate = () => {
        const animationId = requestAnimationFrame(animate)

        camera.position.x += (mouseX * 5 - camera.position.x) * 0.05
        camera.position.y += (-mouseY * 2 + 5 - camera.position.y) * 0.05
        camera.lookAt(0, 2, 0)

        particles.rotation.y += 0.001

        renderer.render(scene, camera)
        return animationId
    }
    const animationId = animate()

    // Resize
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
