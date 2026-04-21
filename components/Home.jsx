import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { BsInstagram, BsGithub, BsLinkedin } from 'react-icons/bs';
import { MdOutlineAttachEmail } from "react-icons/md";
import TreeScene from "./TreeScene";
import CustomCursor from "./CustomCursor";

const texts = ["Frisnadi✨", "a Full-stack Developer🚀", "a Software Engineer💻", "an AI Enthusiast🤖"];

export function Home() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 2500); // Change text every 2.5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col lg:flex-row items-center w-full min-h-screen mx-auto overflow-hidden relative bg-white dark:bg-gray-900 transition-colors duration-500">
      <CustomCursor />
      
      {/* Background Decorative Circles */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

      {/* 3D Scene Section */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="w-full lg:w-1/2 h-[40vh] lg:h-full order-1 lg:order-2 flex items-center justify-center relative z-0"
      >
        <div className="absolute inset-0 w-full h-full">
            <TreeScene mode={index} />
        </div>
      </motion.div>

      {/* Animated Text Section */}
      <div className="w-full lg:w-1/2 px-6 py-12 lg:px-24 z-10 order-2 lg:order-1 flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-blue-600 dark:text-blue-400 font-bold text-lg md:text-xl mb-4 tracking-widest uppercase flex items-center gap-3">
             <span className="w-12 h-[2px] bg-blue-600 dark:bg-blue-400"></span>
             Hello World!
          </h2>
          <h1 className="text-gray-900 dark:text-white font-black text-5xl md:text-7xl mb-6 leading-[1.1]">
            I&apos;m {" "}
            <div className="h-[1.2em] relative overflow-hidden inline-block align-bottom min-w-[250px]">
              <AnimatePresence mode="wait">
                <motion.span
                  key={texts[index]}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -50, opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="absolute left-0 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500 dark:from-blue-400 dark:to-cyan-300"
                >
                  {texts[index]}
                </motion.span>
              </AnimatePresence>
            </div>
          </h1>
          
          <p className="text-gray-600 dark:text-gray-400 text-lg md:text-xl max-w-xl mb-10 leading-relaxed font-medium">
            Building robust applications and exploring the future of artificial intelligence with clean, scalable, and efficient code.
          </p>

          {/* Social Links & CTA */}
          <div className="flex flex-wrap items-center gap-6 mb-12">
            <Link 
                href="/projects" 
                className="px-10 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-2xl font-bold transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-blue-500/20"
            >
              View Projects
            </Link>
            <div className="flex items-center gap-5">
              <a href="https://github.com/frisnadidwi" target="_blank" rel="noopener noreferrer" className="p-3 bg-gray-100 dark:bg-gray-800 rounded-xl text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-all duration-300 hover:scale-110">
                <BsGithub size={24} />
              </a>
              <a href="https://www.linkedin.com/in/frisnadi-dwi-f-91757a24b/" target="_blank" rel="noopener noreferrer" className="p-3 bg-gray-100 dark:bg-gray-800 rounded-xl text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-all duration-300 hover:scale-110">
                <BsLinkedin size={24} />
              </a>
              <a href="https://www.instagram.com/frisnadidwi/" target="_blank" rel="noopener noreferrer" className="p-3 bg-gray-100 dark:bg-gray-800 rounded-xl text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-all duration-300 hover:scale-110">
                <BsInstagram size={24} />
              </a>
              <a href="mailto:frisnadidwi@gmail.com" className="p-3 bg-gray-100 dark:bg-gray-800 rounded-xl text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-all duration-300 hover:scale-110">
                <MdOutlineAttachEmail size={24} />
              </a>
            </div>
          </div>

          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="flex items-center gap-4 text-gray-400 font-bold uppercase tracking-widest text-xs"
          >
            <div className="w-12 h-px bg-gray-300 dark:bg-gray-700"></div>
            Scroll to explore
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
