"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";

export function GalleryModal({ item, isOpen, onClose, onNext, onPrev }) {
  if (!item) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-11/12 max-w-5xl bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden"
            style={{ maxHeight: '90vh' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute right-4 top-4 z-10">
              <button
                onClick={onClose}
                className="p-2 text-gray-100 hover:text-white bg-gray-800/70 rounded-full hover:bg-gray-700 transition-all"
              >
                <IoMdCloseCircleOutline className="w-8 h-8" />
              </button>
            </div>
            
            <div className="relative w-full h-[80vh] flex items-center justify-center">
              <Image
                src={item.photo}
                alt={item.name}
                className="object-contain w-full h-full"
                width={1200}
                height={900}
              />
              
              <button 
                className="absolute left-4 p-2 text-white bg-gray-800/70 rounded-full hover:bg-gray-700 transition-all"
                onClick={(e) => {
                  e.stopPropagation();
                  onPrev();
                }}
              >
                <MdNavigateBefore className="w-8 h-8" />
              </button>
              
              <button 
                className="absolute right-4 p-2 text-white bg-gray-800/70 rounded-full hover:bg-gray-700 transition-all"
                onClick={(e) => {
                  e.stopPropagation();
                  onNext();
                }}
              >
                <MdNavigateNext className="w-8 h-8" />
              </button>
            </div>
            
            <div className="p-4 bg-white dark:bg-gray-800 text-center">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-white">
                {item.name}
              </h2>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
} 