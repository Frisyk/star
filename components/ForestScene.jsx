'use client'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function ForestScene() {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Scene
    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(0x111827, 0.002) // Dark blueish fog matches dark mode

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
    const ambientLight = new THREE.AmbientLight(0x404040, 2)
    scene.add(ambientLight)

    const moonLight = new THREE.DirectionalLight(0xaaccff, 0.5)
    moonLight.position.set(10, 20, 10)
    scene.add(moonLight)

    // Ground
    const groundGeometry = new THREE.PlaneGeometry(200, 200, 50, 50)
    const groundMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x1f2937, // dark gray
        wireframe: true,
        transparent: true,
        opacity: 0.3
    })
    const ground = new THREE.Mesh(groundGeometry, groundMaterial)
    ground.rotation.x = -Math.PI / 2
    
    // Add terrain noise
    const positionAttribute = groundGeometry.attributes.position
    for (let i = 0; i < positionAttribute.count; i++) {
        const x = positionAttribute.getX(i)
        const y = positionAttribute.getY(i)
        // Simple noise function replacement
        const z = Math.sin(x * 0.1) * Math.cos(y * 0.1) * 2
        positionAttribute.setZ(i, z)
    }
    groundGeometry.computeVertexNormals()
    
    scene.add(ground)

    // Trees (Simple Cones)
    const treeGeometry = new THREE.ConeGeometry(1, 4, 8)
    const treeMaterial = new THREE.MeshStandardMaterial({ color: 0x064e3b, flatShading: true }) // Dark green
    
    const trees = []
    for(let i = 0; i < 50; i++) {
        const tree = new THREE.Mesh(treeGeometry, treeMaterial)
        const x = (Math.random() - 0.5) * 100
        const z = (Math.random() - 0.5) * 100
        
        // Avoid center path
        if(Math.abs(x) < 5) continue
        
        tree.position.set(x, 2, z)
        tree.scale.setScalar(0.5 + Math.random() * 1.5)
        scene.add(tree)
        trees.push(tree)
    }

    // Particles (Fireflies)
    const particlesGeometry = new THREE.BufferGeometry()
    const particlesCount = 200
    const posArray = new Float32Array(particlesCount * 3)

    for(let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 100
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3))
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.2,
        color: 0xfef08a, // yellow
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
        requestAnimationFrame(animate)

        // Camera gentle movement
        camera.position.x += (mouseX * 5 - camera.position.x) * 0.05
        camera.position.y += (-mouseY * 2 + 5 - camera.position.y) * 0.05
        camera.lookAt(0, 2, 0)

        // Particles float
        particles.rotation.y += 0.001

        renderer.render(scene, camera)
    }
    animate()

    // Resize
    const handleResize = () => {
        if (!containerRef.current) return
        camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight
        camera.updateProjectionMatrix()
        renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    }
    window.addEventListener('resize', handleResize)

    return () => {
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
    }
  }, [])

  return (
    <div ref={containerRef} className="absolute inset-0 -z-10 w-full h-full opacity-50 dark:opacity-80" />
  )
}
