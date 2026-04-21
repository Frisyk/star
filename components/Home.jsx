import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { BsInstagram, BsGithub, BsLinkedin } from 'react-icons/bs';
import { MdOutlineAttachEmail } from "react-icons/md";
import TreeScene from "./TreeScene";
import CustomCursor from "./CustomCursor";

export function Home() {
  const texts = ["Frisnadi✨", "a Full-stack Developer🚀", "a Software Engineer💻", "an AI Enthusiast🤖"];
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
      <motion.div
        className="w-full lg:w-1/2 flex flex-col justify-center px-6 lg:pl-24 order-2 lg:order-1 gap-6 pb-20 lg:pb-0 z-10"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <div className="space-y-2">
            <motion.span
                className="text-blue-600 dark:text-blue-400 font-bold tracking-widest uppercase text-sm"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                Welcome to my portfolio
            </motion.span>
            <motion.h1
            className="text-4xl lg:text-7xl font-black text-gray-900 dark:text-white leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            >
            Hi, I&apos;m <br />
            <AnimatePresence mode="wait">
                <motion.span
                key={texts[index]}
                className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-500"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.5 }}
                >
                {texts[index]}
                </motion.span>
            </AnimatePresence>
            </motion.h1>
        </div>
        
        <p className="text-gray-600 dark:text-gray-400 max-w-lg text-lg lg:text-xl leading-relaxed font-medium">
            I build high-performance, beautiful digital experiences with a focus on clean architecture and innovative AI integration.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.7 }}
          className="flex items-center gap-4 mt-2"
        >
          {[
            { icon: <BsInstagram />, href: 'https://www.instagram.com/frisnadiyk/', color: 'hover:bg-pink-500' },
            { icon: <MdOutlineAttachEmail />, href: 'mailto:frisnadi1@gmail.com', color: 'hover:bg-green-500' },
            { icon: <BsGithub />, href: 'https://github.com/frisyk', color: 'hover:bg-gray-900' },
            { icon: <BsLinkedin />, href: 'https://www.linkedin.com/in/frisnadi-nurul-huda-883334247/', color: 'hover:bg-blue-600' }
          ].map((social, i) => (
            <Link 
                key={i}
                target='_blank' 
                href={social.href} 
                className={`w-12 h-12 flex items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 ${social.color} hover:text-white transition-all duration-300 shadow-sm`}
            >
                <motion.div whileHover={{ scale: 1.2, rotate: 5 }}>
                    {social.icon}
                </motion.div>
            </Link>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 1 }}
          className="flex flex-wrap gap-4 mt-8"
        >
          <Link
            href="/projects"
            className="group relative inline-flex items-center justify-center px-10 py-4 font-bold text-white transition-all duration-300 bg-gray-900 dark:bg-white dark:text-gray-900 rounded-2xl hover:scale-105 active:scale-95 shadow-xl"
          >
            View Projects
          </Link>
          <Link
            href="/about"
            className="group relative inline-flex items-center justify-center px-10 py-4 font-bold text-gray-900 dark:text-white transition-all duration-300 bg-transparent border-2 border-gray-200 dark:border-gray-700 rounded-2xl hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 hover:scale-105 active:scale-95"
          >
            My Story
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );

}
