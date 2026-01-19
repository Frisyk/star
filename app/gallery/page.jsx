"use client";

import { useState } from 'react';
import Image from 'next/image';
import { catalogData } from '@/components/Data';
import { motion } from 'framer-motion';
import { GalleryModal } from '@/components/GalleryModal';
import ForestScene from '@/components/ForestScene';
import TiltCard from '@/components/TiltCard';

export default function GalleryPage() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openModal = (item, index) => {
    setSelectedItem(item);
    setCurrentIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const goToNext = () => {
    const nextIndex = (currentIndex + 1) % catalogData.length;
    setCurrentIndex(nextIndex);
    setSelectedItem(catalogData[nextIndex]);
  };

  const goToPrev = () => {
    const prevIndex = (currentIndex - 1 + catalogData.length) % catalogData.length;
    setCurrentIndex(prevIndex);
    setSelectedItem(catalogData[prevIndex]);
  };

  return (
    <main className="min-h-screen w-full relative overflow-hidden bg-gray-900 text-white">
      <ForestScene />
      
      <div className="relative z-10 py-24 px-4 container mx-auto">
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
        >
            <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500 mb-4 drop-shadow-lg">
                My Gallery
            </h1>
            <p className="text-gray-300 max-w-2xl mx-auto text-lg backdrop-blur-sm bg-black/30 p-4 rounded-xl border border-white/10">
                A collection of moments and creations.
            </p>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {catalogData.map((item, index) => (
            <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, rotateX: 10 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="perspective-1000"
            >
                <TiltCard>
                    <div 
                        className="bg-gray-800/60 backdrop-blur-md rounded-xl overflow-hidden shadow-2xl border border-white/10 cursor-pointer group h-full"
                        onClick={() => openModal(item, index)}
                    >
                        <div className="relative h-64 w-full overflow-hidden">
                            <Image
                                src={item.photo}
                                alt={item.name}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                                <span className="text-white font-medium px-4 py-2 border border-white/30 rounded-full backdrop-blur-sm bg-black/30">View Image</span>
                            </div>
                        </div>
                        <div className="p-4 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <h2 className="text-lg font-medium text-gray-200 text-center relative z-10 group-hover:text-white transition-colors">
                                {item.name}
                            </h2>
                        </div>
                    </div>
                </TiltCard>
            </motion.div>
            ))}
        </div>
      </div>
      
      <GalleryModal 
        item={selectedItem}
        isOpen={isModalOpen}
        onClose={closeModal}
        onNext={goToNext}
        onPrev={goToPrev}
      />
    </main>
  );
}
