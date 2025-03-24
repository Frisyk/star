"use client";

import { useState } from 'react';
import Image from 'next/image';
import { catalogData } from '@/components/Data';
import { motion } from 'framer-motion';
import { GalleryModal } from '@/components/GalleryModal';



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
    <main className="min-h-screen w-full overflow-hidden bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-center text-blue-800 dark:text-blue-400 mb-10"
      >
        My Gallery
      </motion.h1>
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {catalogData.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            whileHover={{ scale: 1.03 }}
            className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md cursor-pointer transform transition-all duration-300 hover:shadow-xl"
            onClick={() => openModal(item, index)}
          >
            <div className="relative h-64 w-full">
              <Image
                src={item.photo}
                alt={item.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h2 className="text-lg font-medium text-gray-800 dark:text-white text-center">
                {item.name}
              </h2>
            </div>
          </motion.div>
        ))}
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