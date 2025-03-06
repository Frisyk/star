import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "./Footer";

export function Home() {
  const texts = ["Frisnadi✨", "Web Dev💻", "Mobile Dev📱", "Backend Dev🫙"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 2500); // Ganti teks setiap 2.5 detik
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col h-screen lg:gap-10 gap-5 lg:flex-row items-center w-full mx-auto">
      {/* Animated Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="order-2 md:order-1 mt-auto lg:mt-0 "
      >
        <Image
          src="/photo/profil2.png"
          width={600}
          height={600}
          alt="Frisnadiyk"
          className="relative w-[500px] bottom-0 lg:w-[600px] -z-10"
        />
      </motion.div>

      {/* Animated Text Section */}
      <motion.div
        className="text-blue-800 flex flex-col order-1 md:order-2 gap-5 w-full lg:w-auto px-6 lg:mt-0 mt-32 "
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
          className="lg:text-5xl text-3xl font-semibold uppercase flex"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <span className="mr-2">I&apos;m</span>
          <AnimatePresence mode="wait">
            <motion.span
              key={texts[index]}
              className=" bg-clip-text font-extrabold"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
            >
              {texts[index]}
            </motion.span>
          </AnimatePresence>
        </motion.h1>

        <Footer/>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9, duration: 1 }}
          className="mt-4"
        >
          <Link
            href="/about"
            className="bg-transparent mt-6 text-blue-800 font-semibold text-xl py-2 px-6 rounded-md w-fit outline outline-blue-800 hover:bg-blue-800 hover:text-white duration-300 transform hover:scale-105"
          >
            About Me ➡️
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
