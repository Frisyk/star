import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { BsInstagram, BsGithub, BsLinkedin } from 'react-icons/bs';
import { MdOutlineAttachEmail } from "react-icons/md";
import Footer from "./Footer";

export function Home() {
  const texts = ["Frisnadi✨", "a Web Developer💻", "a Mobile Developer📱", "a Backend Developer🫙"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 2500); // Change text every 2.5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col h-screen lg:gap-10 gap-5 lg:flex-row items-center w-full mx-auto">
      {/* Animated Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className=" md:order-1  lg:mt-0"
      >
        <Image
          src="/photo/profil2.png"
          width={600}
          height={600}
          alt="Frisnadiyk"
          className="relative w-[300px] md:w-[500px] bottom-0 lg:w-[600px] -z-10"
        />
      </motion.div>

      {/* Animated Text Section */}
      <motion.div
        className="text-blue-800 dark:text-blue-400 flex flex-col order-1 md:order-2 gap-5 w-full lg:w-auto px-6 lg:mt-0 md:mt-32"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <motion.h1
          className="lg:text-5xl text-3xl font-semibold"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          Hi, There!
        </motion.h1>

        <motion.h1
          className="lg:text-5xl text-2xl font-semibold uppercase flex"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <span className="mr-2">I&apos;m</span>
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
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl">With a strong background in frontend and backend development, I craft seamless user experiences while
            ensuring robust and efficient server-side logic. I thrive on solving complex problems and transforming ideas
            into fully functional digital products.</p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.7 }}
          className="flex text-xl md:text-2xl lg:text-3xl gap-5 lg:gap-8"
        >
          <Link target='_blank' href={'https://www.instagram.com/frisnadiyk/'} className="hover:text-red-700 transition-colors duration-300">
            <motion.div whileHover={{ scale: 1.2 }} className="inline-block">
              <BsInstagram />
            </motion.div>
          </Link>
          <a target='_blank' href='mailto:frisnadi1@gmail.com' className="hover:text-green-600 transition-colors duration-300">
            <motion.div whileHover={{ scale: 1.2 }} className="inline-block">
              <MdOutlineAttachEmail />
            </motion.div>
          </a>
          <Link target='_blank' href={'https://github.com/frisyk'} className="hover:text-gray-800 dark:hover:text-white transition-colors duration-300">
            <motion.div whileHover={{ scale: 1.2 }} className="inline-block">
              <BsGithub />
            </motion.div>
          </Link>
          <Link target='_blank' href={'https://www.linkedin.com/in/frisnadi-nurul-huda-883334247/'} className="hover:text-blue-600 transition-colors duration-300">
            <motion.div whileHover={{ scale: 1.2 }} className="inline-block">
              <BsLinkedin />
            </motion.div>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9, duration: 1 }}
          className="flex flex-wrap gap-4 mt-4"
        >
          <Link
            href="/about"
            className="bg-transparent text-blue-800 dark:text-blue-400 font-semibold text-xl py-2 px-6 rounded-md outline outline-blue-800 dark:outline-blue-400 hover:bg-blue-800 dark:hover:bg-blue-700 hover:text-white dark:hover:text-white duration-300 transform hover:scale-105"
          >
            About Me ➡️
          </Link>
          <Link
            href="/contact"
            className="bg-blue-800 dark:bg-blue-700 text-white font-semibold text-xl py-2 px-6 rounded-md hover:bg-blue-900 dark:hover:bg-blue-800 duration-300 transform hover:scale-105"
          >
            Contact Me 📧
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
