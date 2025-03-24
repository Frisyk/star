"use client";

import { motion } from "framer-motion";
import { FaReact, FaNodeJs, FaDocker, FaGithub, FaGit } from "react-icons/fa";
import { SiNextdotjs, SiKotlin, SiLaravel, SiTailwindcss, SiShadcn, SiMongodb, SiPostgresql, SiPrisma, SiTypescript, SiVercel, SiJavascript } from "react-icons/si";
import { TbBrandFramerMotion } from "react-icons/tb";

export function TechStack() {
  const technologies = [
    { name: "Next.js", icon: <SiNextdotjs className="w-10 h-10" />, color: "hover:text-black dark:hover:text-white" },
    { name: "React", icon: <FaReact className="w-10 h-10" />, color: "hover:text-blue-500" },
    { name: "PostgreSQL", icon: <SiPostgresql className="w-10 h-10" />, color: "hover:text-blue-600" },
    { name: "MongoDB", icon: <SiMongodb className="w-10 h-10" />, color: "hover:text-green-500" },
    { name: "Prisma", icon: <SiPrisma className="w-10 h-10" />, color: "hover:text-cyan-600" },
    { name: "JavaScript", icon: <SiJavascript className="w-10 h-10" />, color: "hover:text-yellow-400" },
    { name: "Vercel", icon: <SiVercel className="w-10 h-10" />, color: "hover:text-black dark:hover:text-white" },
    { name: "TypeScript", icon: <SiTypescript className="w-10 h-10" />, color: "hover:text-blue-600" },
    { name: "Tailwind CSS", icon: <SiTailwindcss className="w-10 h-10" />, color: "hover:text-cyan-500" },
    { name: "Framer Motion", icon: <TbBrandFramerMotion className="w-10 h-10" />, color: "hover:text-purple-600" },
    { name: "Node.js", icon: <FaNodeJs className="w-10 h-10" />, color: "hover:text-green-600" },
    { name: "Docker", icon: <FaDocker className="w-10 h-10" />, color: "hover:text-blue-500" },
    { name: "GitHub", icon: <FaGithub className="w-10 h-10" />, color: "hover:text-gray-900 dark:hover:text-white" },
    { name: "Git", icon: <FaGit className="w-10 h-10" />, color: "hover:text-orange-600" },
    { name: "Kotlin", icon: <SiKotlin className="w-10 h-10" />, color: "hover:text-orange-600" },
    { name: "Laravel", icon: <SiLaravel className="w-10 h-10" />, color: "hover:text-red-600" },
    // { name: "Shadcn UI", icon: <SiShadcn className="w-10 h-10" />, color: "hover:text-red-600" },
  ];

  return (
    <div className="py-10">
      <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-blue-800 dark:text-blue-400">
        Tech Stack
      </h2>
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-6 justify-items-center">
        {technologies.map((tech, index) => (
          <motion.div
            key={tech.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.5, 
              delay: index * 0.05,
              type: "spring",
              stiffness: 100
            }}
            whileHover={{ scale: 1.1 }}
            className="flex flex-col items-center justify-center"
          >
            <div className={`text-gray-600 dark:text-gray-300 ${tech.color} transition-colors duration-300`}>
              {tech.icon}
            </div>
            <p className="mt-2 text-xs md:text-sm text-center text-gray-700 dark:text-gray-300">
              {tech.name}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
} 