"use client";

import { useState } from 'react';
import { projectData } from '@/components/Data';
import Image from 'next/image';
import Link from 'next/link';
import { BsGithub } from 'react-icons/bs';
import { ProjectModal } from '@/components/ProjectModal';
import { motion } from 'framer-motion';

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
    <main className="min-h-screen w-full overflow-hidden bg-gray-50 dark:bg-gray-900 py-8">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-center text-blue-800 dark:text-blue-400 mb-10"
      >
        My Projects
      </motion.h1>
      
      <section className="flex flex-wrap justify-center p-5 max-w-7xl mx-auto">
        {projectData.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 shadow-md m-5 w-full md:w-[45%] lg:w-[30%] rounded-lg overflow-hidden hover:shadow-xl transition duration-300"
          >
            <div 
              onClick={() => openModal(project)} 
              className="cursor-pointer"
            >
              <div className="relative h-56 w-full">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover hover:opacity-75 transition-opacity duration-300"
                />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <h1 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-white">
                    {project.title}
                  </h1>
                  <Link
                    href={project.github}
                    passHref
                    className="text-black dark:text-white text-xl hover:bg-slate-900 hover:text-slate-100 py-2 px-5 rounded-full outline outline-1 transition-colors duration-300"
                    target="_blank"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <BsGithub />
                  </Link>
                </div>
                <p
                  className="text-gray-600 dark:text-gray-300 line-clamp-2"
                  dangerouslySetInnerHTML={{ __html: project.desc.split('<br/>')[0] || '' }}
                ></p>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-4 text-blue-600 dark:text-blue-400 font-medium"
                >
                  View Details →
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </section>
      
      <ProjectModal 
        project={selectedProject} 
        isOpen={isModalOpen} 
        onClose={closeModal} 
      />
    </main>
  );
}
