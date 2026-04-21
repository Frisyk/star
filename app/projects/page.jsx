"use client";

import { useState } from 'react';
import { projectData } from '@/components/Data';
import Image from 'next/image';
import Link from 'next/link';
import { BsGithub, BsGlobe } from 'react-icons/bs';
import { ProjectModal } from '@/components/ProjectModal';
import { motion } from 'framer-motion';
import TiltCard from '@/components/TiltCard';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';

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

  // Split projects into two rows for variety
  const firstRow = projectData.slice(0, Math.ceil(projectData.length / 2));
  const secondRow = projectData.slice(Math.ceil(projectData.length / 2));

  return (
    <main className="min-h-screen w-full bg-white dark:bg-gray-900 py-24 px-4 overflow-hidden transition-colors duration-500">
      <div className="max-w-screen-2xl mx-auto">
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
        >
            <span className="inline-block px-4 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-bold text-sm mb-4 uppercase tracking-wider">
                My Work
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-gray-900 dark:text-white mb-6">
                Featured Projects
            </h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
                A selection of my recent full-stack applications and technical experiments.
            </p>
        </motion.div>
        
        <div className="space-y-12">
            {/* First Row Slider */}
            <motion.div
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
            >
                <Swiper
                    modules={[Autoplay, FreeMode]}
                    spaceBetween={30}
                    slidesPerView={1.2}
                    loop={true}
                    freeMode={true}
                    speed={8000}
                    autoplay={{
                        delay: 0,
                        disableOnInteraction: false,
                        reverseDirection: false
                    }}
                    breakpoints={{
                        640: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                        1536: { slidesPerView: 4 },
                    }}
                    className="pb-10 linear-swiper"
                >
                    {firstRow.map((project) => (
                        <SwiperSlide key={project.id} className="h-full">
                            <TiltCard className="h-full">
                                <div 
                                    onClick={() => openModal(project)} 
                                    className="h-[450px] bg-gray-50 dark:bg-gray-800/50 rounded-3xl shadow-xl overflow-hidden cursor-pointer group border border-gray-100 dark:border-white/5 transition-all duration-500 hover:shadow-blue-500/10"
                                >
                                    <div className="relative h-64 w-full overflow-hidden">
                                        <Image
                                            src={project.image}
                                            alt={project.title}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                            <span className="text-white font-bold bg-blue-600 px-4 py-2 rounded-xl text-sm shadow-lg">View Project</span>
                                        </div>
                                    </div>
                                    <div className="p-8">
                                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-1 group-hover:text-blue-600 transition-colors">
                                            {project.title}
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 mb-6 leading-relaxed">
                                            {project.desc.replace(/<br\/>/g, ' ')}
                                        </p>
                                        <div className="flex gap-4">
                                            <div className="w-8 h-8 rounded-lg bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-400">
                                                <BsGithub size={18} />
                                            </div>
                                            {project.slug && (
                                                <div className="w-8 h-8 rounded-lg bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-blue-500">
                                                    <BsGlobe size={18} />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </TiltCard>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </motion.div>

            {/* Second Row Slider (Reversed) */}
            <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                <Swiper
                    modules={[Autoplay, FreeMode]}
                    spaceBetween={30}
                    slidesPerView={1.2}
                    loop={true}
                    freeMode={true}
                    speed={10000}
                    autoplay={{
                        delay: 0,
                        disableOnInteraction: false,
                        reverseDirection: true
                    }}
                    breakpoints={{
                        640: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                        1536: { slidesPerView: 4 },
                    }}
                    className="linear-swiper"
                >
                    {secondRow.map((project) => (
                        <SwiperSlide key={project.id} className="h-full">
                            <TiltCard className="h-full">
                                <div 
                                    onClick={() => openModal(project)} 
                                    className="h-[450px] bg-gray-50 dark:bg-gray-800/50 rounded-3xl shadow-xl overflow-hidden cursor-pointer group border border-gray-100 dark:border-white/5 transition-all duration-500 hover:shadow-purple-500/10"
                                >
                                    <div className="relative h-64 w-full overflow-hidden">
                                        <Image
                                            src={project.image}
                                            alt={project.title}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                            <span className="text-white font-bold bg-purple-600 px-4 py-2 rounded-xl text-sm shadow-lg">View Project</span>
                                        </div>
                                    </div>
                                    <div className="p-8">
                                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-1 group-hover:text-purple-600 transition-colors">
                                            {project.title}
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 mb-6 leading-relaxed">
                                            {project.desc.replace(/<br\/>/g, ' ')}
                                        </p>
                                        <div className="flex gap-4">
                                            <div className="w-8 h-8 rounded-lg bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-400">
                                                <BsGithub size={18} />
                                            </div>
                                            {project.slug && (
                                                <div className="w-8 h-8 rounded-lg bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-purple-500">
                                                    <BsGlobe size={18} />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </TiltCard>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </motion.div>
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