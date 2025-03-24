"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { BsGithub, BsGlobe } from "react-icons/bs";
import { IoMdCloseCircleOutline } from "react-icons/io";

export function ProjectModal({ project, isOpen, onClose }) {
  if (!project) return null;

  // Extract tech stacks from desc
  const techStackRegex = /<br\/>\s*Tech Stack: ([^<]+)/;
  const techStackMatch = project.desc.match(techStackRegex);
  const techStack = techStackMatch ? techStackMatch[1].split(", ") : [];
  
  // Desc without tech stack
  const cleanDesc = project.desc.replace(/<br\/>\s*Tech Stack: [^<]+/, "");

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-11/12 max-w-3xl bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden"
              style={{ maxHeight: '90vh', overflowY: 'auto' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute right-4 top-4 z-10">
                <button
                  onClick={onClose}
                  className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white rounded-full bg-white/80 dark:bg-gray-700/80 hover:bg-gray-100 dark:hover:bg-gray-600 transition-all"
                >
                  <IoMdCloseCircleOutline className="w-6 h-6" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative w-full aspect-video md:h-full">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    priority
                    className="object-cover rounded-t-lg md:rounded-l-lg md:rounded-tr-none"
                  />
                </div>
                
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">{project.title}</h2>
                  
                  <div className="mb-6">
                    <h3 className="font-semibold text-lg mb-2 text-gray-700 dark:text-gray-200">Description</h3>
                    <p className="text-gray-600 dark:text-gray-300" dangerouslySetInnerHTML={{ __html: cleanDesc }}></p>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="font-semibold text-lg mb-2 text-gray-700 dark:text-gray-200">Tech Stack</h3>
                    <div className="flex flex-wrap gap-2">
                      {techStack.map((tech, index) => (
                        <span 
                          key={index} 
                          className="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 rounded-full"
                        >
                          {tech.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex gap-4 mt-auto">
                    <Link
                      href={project.github}
                      target="_blank"
                      className="flex items-center gap-1 py-2 px-4 text-gray-700 dark:text-white bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg transition duration-300"
                    >
                      <BsGithub className="mr-1" /> Source Code
                    </Link>
                    {
                      project.slug && (
                        <Link
                          href={project.slug}
                      target="_blank"
                      className="flex items-center gap-1 py-2 px-4 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition duration-300"
                    >
                          <BsGlobe className="mr-1" /> Live Demo
                        </Link>
                      )
                    }
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
} 