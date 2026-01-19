"use client";

import { useState } from 'react';
import { projectData } from '@/components/Data';
import Image from 'next/image';
import Link from 'next/link';
import { BsGithub, BsGlobe } from 'react-icons/bs';
import { ProjectModal } from '@/components/ProjectModal';
import { motion } from 'framer-motion';
import TiltCard from '@/components/TiltCard';

export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <main className="min-h-screen w-full bg-gray-50 dark:bg-gray-900 py-24 px-4 overflow-hidden perspective-1000">
      <div className="max-w-7xl mx-auto">
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
        >
            <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
                Featured Projects
            </h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Explore a collection of my recent work, ranging from web applications to interactive experiences. Interact with the cards to see the 3D effect.
            </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projectData.map((project, index) => (
            <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.9, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="h-full"
            >
                <TiltCard className="h-full">
                    <div 
                        onClick={() => openModal(project)} 
                        className="h-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden cursor-pointer group border border-gray-200 dark:border-gray-700"
                    >
                        {/* Image Container */}
                        <div className="relative h-60 w-full overflow-hidden">
                            <Image
                                src={project.image}
                                alt={project.title}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
                                <span className="text-white font-medium text-sm">View Details</span>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 flex flex-col h-[calc(100%-15rem)]">
                            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2 line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                {project.title}
                            </h3>
                            <p
                                className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2 mb-4 flex-grow"
                                dangerouslySetInnerHTML={{ __html: project.desc.split('<br/>')[0] || '' }}
                            ></p>
                            
                            <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
                                <div className="flex gap-3">
                                    <Link
                                        href={project.github}
                                        target="_blank"
                                        onClick={(e) => e.stopPropagation()}
                                        className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                                        title="View Source Code"
                                    >
                                        <BsGithub size={20} />
                                    </Link>
                                    {project.slug && (
                                        <Link
                                            href={project.slug}
                                            target="_blank"
                                            onClick={(e) => e.stopPropagation()}
                                            className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                            title="Live Demo"
                                        >
                                            <BsGlobe size={20} />
                                        </Link>
                                    )}
                                </div>
                                <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded-md">
                                    Project #{project.id}
                                </span>
                            </div>
                        </div>
                    </div>
                </TiltCard>
            </motion.div>
            ))}
        </div>
      </div>
      
      <ProjectModal 
        project={selectedProject} 
        isOpen={isModalOpen} 
        onClose={closeModal} 
      />
    </main>
  );
}