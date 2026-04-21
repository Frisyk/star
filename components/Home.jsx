import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { BsInstagram, BsGithub, BsLinkedin } from "react-icons/bs";
import { MdOutlineAttachEmail } from "react-icons/md";
import TreeScene from "./TreeScene";
import CustomCursor from "./CustomCursor";

const texts = [
  "Frisnadi✨",
  "a Full-stack Developer🚀",
  "a Software Engineer💻",
  "an AI Enthusiast🤖",
];

export function Home() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 2500); // Change text every 2.5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col lg:flex-row items-center w-full h-screen mx-auto overflow-hidden relative bg-white dark:bg-gray-900 transition-colors duration-500">
      <CustomCursor />

      {/* Background Decorative Circles - Scaled down */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-blue-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-purple-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

      {/* 3D Scene Section - Adjusted height */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="w-full lg:w-1/2 h-[35vh] lg:h-[80vh] order-1 lg:order-2 flex items-center justify-center relative z-0"
      >
        <div className="absolute inset-0 w-full h-full scale-90 lg:scale-100">
          <TreeScene mode={index} />
        </div>
      </motion.div>

      {/* Animated Text Section - Reduced padding and font sizes */}
      <div className="w-full lg:w-1/2 px-6 py-8 lg:px-16 z-10 order-2 lg:order-1 flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-blue-600 dark:text-blue-400 font-bold text-base md:text-lg mb-2 tracking-widest uppercase flex items-center gap-3">
            <span className="w-8 h-[2px] bg-blue-600 dark:bg-blue-400"></span>
            Hello World!
          </h2>
          <h1 className="text-gray-900 dark:text-white font-black text-4xl md:text-6xl mb-4 leading-tight flex flex-wrap items-center">
            {/* Gunakan span agar tetap satu baris dengan I'm */}
            <span className="mr-3">I&apos;m</span>

            {/* Container animasi diperlebar ruang vertikalnya */}
            <div className="relative h-[1.2em] flex-1 min-w-[280px] overflow-visible">
              <AnimatePresence mode="wait">
                <motion.span
                  key={texts[index]}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  // Tambahkan py-1 agar emoji atau aksen teks tidak terpotong
                  className="absolute left-0 top-0 py-1 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500 dark:from-blue-400 dark:to-cyan-300 whitespace-nowrap"
                >
                  {texts[index]}
                </motion.span>
              </AnimatePresence>
            </div>
          </h1>

          <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg max-w-xl mb-8 leading-relaxed font-medium">
            Building robust applications and exploring the future of artificial
            intelligence with clean, scalable, and efficient code.
          </p>

          {/* Social Links & CTA - Adjusted spacing */}
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <Link
              href="/projects"
              className="px-8 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-bold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-blue-500/20 text-sm md:text-base"
            >
              View Projects
            </Link>
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/frisyk"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-all duration-300 hover:scale-110"
              >
                <BsGithub size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/frisnadi-nurul-huda-883334247/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-all duration-300 hover:scale-110"
              >
                <BsLinkedin size={20} />
              </a>
              <a
                href="https://www.instagram.com/frisnadiyk/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-gray-100 dark:bg-gray-800 rounded-xl text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-all duration-300 hover:scale-110"
              >
                <BsInstagram size={20} />
              </a>
              <a
                href="mailto:frisnadiyk@gmail.com"
                className="p-2.5 bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-all duration-300 hover:scale-110"
              >
                <MdOutlineAttachEmail size={20} />
              </a>
            </div>
          </div>

          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="flex items-center gap-3 text-gray-400 font-bold uppercase tracking-widest text-[10px]"
          >
            <div className="w-8 h-px bg-gray-300 dark:bg-gray-700"></div>
            Explore Universe
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
