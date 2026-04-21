'use client'
import { motion, useAnimationFrame, useMotionValue, useTransform } from 'framer-motion'
import { useState, useRef, useMemo } from 'react'
import { 
  SiNextdotjs, SiKotlin, SiLaravel, SiTailwindcss, 
  SiMongodb, SiPostgresql, SiPrisma, SiTypescript, SiVercel, SiJavascript 
} from "react-icons/si";
import { FaReact, FaNodeJs, FaDocker, FaGithub, FaGit } from "react-icons/fa";
import { TbBrandFramerMotion } from "react-icons/tb";

const technologies = [
  { name: "Next.js", icon: <SiNextdotjs />, color: "text-black dark:text-white", glow: "border-gray-500" },
  { name: "React", icon: <FaReact />, color: "text-blue-400", glow: "border-blue-400" },
  { name: "PostgreSQL", icon: <SiPostgresql />, color: "text-blue-600", glow: "border-blue-600" },
  { name: "MongoDB", icon: <SiMongodb />, color: "text-green-500", glow: "border-green-500" },
  { name: "Prisma", icon: <SiPrisma />, color: "text-gray-700 dark:text-gray-300", glow: "border-gray-400" },
  { name: "JavaScript", icon: <SiJavascript />, color: "text-yellow-400", glow: "border-yellow-400" },
  { name: "Vercel", icon: <SiVercel />, color: "text-black dark:text-white", glow: "border-gray-500" },
  { name: "TypeScript", icon: <SiTypescript />, color: "text-blue-500", glow: "border-blue-500" },
  { name: "Tailwind", icon: <SiTailwindcss />, color: "text-cyan-400", glow: "border-cyan-400" },
  { name: "Framer", icon: <TbBrandFramerMotion />, color: "text-purple-500", glow: "border-purple-500" },
  { name: "Node.js", icon: <FaNodeJs />, color: "text-green-600", glow: "border-green-600" },
  { name: "Docker", icon: <FaDocker />, color: "text-blue-500", glow: "border-blue-500" },
  { name: "GitHub", icon: <FaGithub />, color: "text-gray-900 dark:text-white", glow: "border-gray-600" },
  { name: "Git", icon: <FaGit />, color: "text-orange-600", glow: "border-orange-600" },
  { name: "Kotlin", icon: <SiKotlin />, color: "text-purple-600", glow: "border-purple-600" },
  { name: "Laravel", icon: <SiLaravel />, color: "text-red-500", glow: "border-red-500" },
];

function getGlowColor(textColorClass) {
    if (textColorClass.includes('blue-400')) return 'rgba(96, 165, 250, 0.4)';
    if (textColorClass.includes('blue-500')) return 'rgba(59, 130, 246, 0.4)';
    if (textColorClass.includes('blue-600')) return 'rgba(37, 99, 235, 0.4)';
    if (textColorClass.includes('green-500')) return 'rgba(34, 197, 94, 0.4)';
    if (textColorClass.includes('green-600')) return 'rgba(22, 163, 74, 0.4)';
    if (textColorClass.includes('yellow-400')) return 'rgba(250, 204, 21, 0.4)';
    if (textColorClass.includes('cyan-400')) return 'rgba(34, 211, 238, 0.4)';
    if (textColorClass.includes('purple-500')) return 'rgba(168, 85, 247, 0.4)';
    if (textColorClass.includes('purple-600')) return 'rgba(147, 51, 234, 0.4)';
    if (textColorClass.includes('red-500')) return 'rgba(239, 68, 68, 0.4)';
    if (textColorClass.includes('orange-600')) return 'rgba(234, 88, 12, 0.4)';
    if (textColorClass.includes('white')) return 'rgba(255, 255, 255, 0.2)';
    return 'rgba(156, 163, 175, 0.2)';
}

const TechItem = ({ tech, rotationY, counterRotationY, sphereRadius, hoveredTech, setHoveredTech }) => {
    const phi = Math.atan2(tech.z, tech.x);
    const horizontalRadius = Math.sqrt(tech.x * tech.x + tech.z * tech.z);

    const currentZ = useTransform(rotationY, (rY) => {
        const totalAngleRad = (phi + (rY * Math.PI / 180));
        return Math.sin(totalAngleRad) * horizontalRadius;
    });

    const opacity = useTransform(currentZ, [-sphereRadius, sphereRadius], [0.1, 1]);
    const zIndex = useTransform(currentZ, [-sphereRadius, sphereRadius], [0, 100]);
    
    return (
      <motion.div
        className="absolute"
        style={{
          x: tech.x,
          y: tech.y,
          z: tech.z,
          transformStyle: 'preserve-3d',
          width: 80,
          height: 96,
          marginTop: -48,
          marginLeft: -40,
          opacity: opacity,
          zIndex: zIndex,
        }}
      >
        <motion.div
          style={{ 
            rotateY: counterRotationY,
            transformStyle: 'preserve-3d'
          }}
          className="w-full h-full"
        >
            <motion.div
                onMouseEnter={() => setHoveredTech(tech.name)}
                onMouseLeave={() => setHoveredTech(null)}
                whileHover={{ scale: 1.3, z: 100 }}
                className={`w-full h-full bg-gray-900/80 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-700/50 flex flex-col items-center justify-center p-3 cursor-pointer transition-all duration-300 hover:bg-gray-800 hover:border-blue-500/50 group ${hoveredTech === tech.name ? 'ring-2 ring-blue-500/20 shadow-blue-500/10' : ''}`}
            >
                <div className={`text-3xl ${tech.color} transition-transform duration-300 group-hover:scale-110`}
                    style={{ filter: `drop-shadow(0 0 8px ${getGlowColor(tech.color)})` }}
                >
                {tech.icon}
                </div>
                <span className="text-[9px] mt-3 font-bold text-gray-300 uppercase tracking-tighter truncate w-full text-center group-hover:text-white transition-colors">
                {tech.name}
                </span>
            </motion.div>
        </motion.div>
      </motion.div>
    );
};

export default function SatelliteTechStack() {
  const [hoveredTech, setHoveredTech] = useState(null)
  const rotationY = useMotionValue(0)
  const lastTime = useRef(0)
  const sphereRadius = 260

  const techPositions = useMemo(() => {
    return technologies.map((tech, i) => {
      const offset = 2 / technologies.length
      const increment = Math.PI * (3 - Math.sqrt(5))
      
      const y = ((i * offset) - 1) + (offset / 2)
      const radiusAtY = Math.sqrt(1 - y * y)
      const phi = i * increment
      
      return {
        ...tech,
        x: Math.cos(phi) * radiusAtY * sphereRadius,
        y: y * sphereRadius,
        z: Math.sin(phi) * radiusAtY * sphereRadius,
      }
    })
  }, [sphereRadius])

  useAnimationFrame((time) => {
    if (hoveredTech) {
        lastTime.current = time
        return
    }
    
    if (lastTime.current === 0) {
        lastTime.current = time
    }
    const delta = time - lastTime.current
    lastTime.current = time
    rotationY.set(rotationY.get() + delta * 0.015)
  })

  const counterRotationY = useTransform(rotationY, (r) => -r)

  return (
    <div className="relative w-full h-[650px] flex items-center justify-center overflow-hidden bg-gray-950/50 rounded-[3rem] border border-gray-800/50 shadow-inner group/container">
      
      <div className="absolute inset-0 pointer-events-none opacity-20">
        {[...Array(30)].map((_, i) => (
            <div key={i} className="absolute bg-white rounded-full animate-pulse" 
                style={{
                    width: Math.random() * 2 + 'px',
                    height: Math.random() * 2 + 'px',
                    top: Math.random() * 100 + '%',
                    left: Math.random() * 100 + '%',
                    animationDelay: Math.random() * 2 + 's'
                }}
            />
        ))}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] border border-dashed border-blue-500/10 rounded-full" />
      </div>

      <div className="relative w-full h-full flex items-center justify-center perspective-2500">
        <motion.div 
          style={{ 
            rotateY: rotationY,
            transformStyle: 'preserve-3d' 
          }}
          className="relative w-0 h-0 flex items-center justify-center"
        >
          <div style={{ transform: 'translateZ(0px)' }} className="absolute w-40 h-40 -mt-20 -ml-20 flex items-center justify-center preserve-3d">
            <div className="absolute inset-0 bg-blue-600/20 rounded-full blur-3xl opacity-80 animate-pulse"></div>
            
            <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black rounded-full border border-blue-500/20 flex items-center justify-center shadow-xl">
                <div className="text-center px-4">
                    <div className="text-blue-400 font-black text-3xl tracking-tighter uppercase drop-shadow-sm">STACK</div>
                </div>
            </div>
          </div>

          {techPositions.map((tech, i) => (
            <TechItem 
                key={i}
                tech={tech}
                rotationY={rotationY}
                counterRotationY={counterRotationY}
                sphereRadius={sphereRadius}
                hoveredTech={hoveredTech}
                setHoveredTech={setHoveredTech}
            />
          ))}
        </motion.div>
      </div>
    </div>
  )
}
