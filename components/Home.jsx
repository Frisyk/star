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
    <div className="flex flex-col lg:flex-row items-center w-full h-screen mx-auto overflow-hidden relative">
      <CustomCursor />
      {/* 3D Scene Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="w-full lg:w-1/2 h-1/2 lg:h-full order-1 lg:order-2 flex items-center justify-center relative -z-10 lg:z-0"
      >
        <div className="absolute inset-0 w-full h-full">
            <TreeScene />
        </div>
      </motion.div>

      {/* Animated Text Section */}
      <motion.div
        className="w-full lg:w-1/2 h-1/2 lg:h-full flex flex-col justify-center px-6 lg:pl-20 order-2 lg:order-1 gap-4 lg:gap-6 pb-10 lg:pb-0 z-10"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <motion.h1
          className="lg:text-5xl text-3xl font-semibold text-blue-800 dark:text-blue-400"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          Hi, There!
        </motion.h1>

        <motion.h1
          className="lg:text-5xl text-2xl font-semibold uppercase flex flex-wrap"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <span className="mr-2 text-blue-800 dark:text-blue-400">I&apos;m</span>
          <AnimatePresence mode="wait">
            <motion.span
              key={texts[index]}
              className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-400 dark:to-purple-500 font-extrabold"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
            >
              {texts[index]}
            </motion.span>
          </AnimatePresence>
        </motion.h1>
        
        <p className="text-gray-600 dark:text-gray-300 max-w-xl text-lg leading-relaxed">
            With a strong background in frontend and backend development, I craft seamless user experiences while
            ensuring robust and efficient server-side logic. I thrive on solving complex problems and transforming ideas
            into fully functional digital products.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.7 }}
          className="flex text-xl md:text-2xl lg:text-3xl gap-6 mt-2"
        >
          <Link target='_blank' href={'https://www.instagram.com/frisnadiyk/'} className="text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-500 transition-colors duration-300">
            <motion.div whileHover={{ scale: 1.2 }} className="inline-block">
              <BsInstagram />
            </motion.div>
          </Link>
          <a target='_blank' href='mailto:frisnadi1@gmail.com' className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-500 transition-colors duration-300">
            <motion.div whileHover={{ scale: 1.2 }} className="inline-block">
              <MdOutlineAttachEmail />
            </motion.div>
          </a>
          <Link target='_blank' href={'https://github.com/frisyk'} className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-300">
            <motion.div whileHover={{ scale: 1.2 }} className="inline-block">
              <BsGithub />
            </motion.div>
          </Link>
          <Link target='_blank' href={'https://www.linkedin.com/in/frisnadi-nurul-huda-883334247/'} className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500 transition-colors duration-300">
            <motion.div whileHover={{ scale: 1.2 }} className="inline-block">
              <BsLinkedin />
            </motion.div>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9, duration: 1 }}
          className="flex flex-wrap gap-4 mt-6"
        >
          <Link
            href="/about"
            className="group relative inline-flex items-center justify-center px-8 py-3 font-semibold text-blue-600 transition-all duration-200 bg-transparent border-2 border-blue-600 rounded-full hover:bg-blue-600 hover:text-white dark:text-blue-400 dark:border-blue-400 dark:hover:bg-blue-600 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
          >
            About Me <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
          </Link>
          <Link
            href="/contact"
            className="group relative inline-flex items-center justify-center px-8 py-3 font-semibold text-white transition-all duration-200 bg-blue-600 border-2 border-transparent rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 shadow-lg hover:shadow-xl"
          >
            Contact Me <span className="ml-2">📧</span>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
