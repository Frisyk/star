"use client"
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="home flex flex-col lg:gap-10 gap-5 pb-10 lg:flex-row items-center w-4/5 mx-auto">
      {/* Animated Image */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <Image
          src="/photo/profil2.png"
          width={1000}
          height={1200}
          alt="Frisnadiyk"
          className="relative w-full bottom-0 lg:w-[800px] -z-10"
        />
      </motion.div>

      {/* Animated Text Section */}
      <motion.div
        className="text-blue-800 flex flex-col gap-2"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <motion.h1
          className="lg:text-5xl text-3xl font-semibold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Hi, There!
        </motion.h1>
        <motion.h1
          className="lg:text-7xl text-4xl font-semibold uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 1 }}
        >
          I&apos;m{' '}
          <span className="animated-gradient relative text-transparent bg-clip-text font-extrabold ">
            Frisnadi✨
          </span>
        </motion.h1>
        <motion.p
          className="lg:text-3xl text-lg tracking-wider lg:py-2 leading-relaxed mb-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          Web and Mobile <span className="font-bold">Developer💻</span> also Graphic{' '}
          <span className="font-bold">Designer✒️</span> Enthusiasts
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <Link
            href="/about"
            className="bg-transparent text-blue-800 font-semibold text-xl py-2 px-6 rounded-md w-fit outline outline-blue-800 hover:bg-blue-800 hover:text-white duration-300"
          >
            About Me ➡️
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}

