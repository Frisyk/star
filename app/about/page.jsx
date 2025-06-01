"use client";

import { motion } from "framer-motion";
import Image from "next/image";
// import profile from "@/public/portofolio/15.png";
import profile from "@/public/photo/pros.png";
import Link from "next/link";
import { TechStack } from "@/components/TechStack";

export default function AboutPage() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen bg-orange-50 dark:bg-gray-900 flex flex-col -mt-3 items-center justify-start p-4 md:p-10"
        >
            <div className="max-w-5xl w-full lg:flex items-center justify-center gap-10 my-8">
                <motion.div 
                    className="lg:w-1/3"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <Image
                        src={profile}
                        width={500}
                        height={500}
                        alt="Frisnadi"
                        className="rounded-xl shadow-lg"
                    />
                </motion.div>
                <motion.div 
                    className="lg:w-2/3 mt-8 lg:mt-0"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <h1 className="text-blue-800 dark:text-blue-400 lg:text-5xl text-3xl font-bold mb-5 lg:text-left">
                        Frisnadi Nurul Huda
                    </h1>
                    <div className="mb-6">
                        <motion.h3 
                            className="text-xl text-blue-600 dark:text-blue-300 font-medium mb-2"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.6 }}
                        >
                            Web Developer | Mobile Developer | UI/UX Enthusiast
                        </motion.h3>
                    </div>
                    <motion.p 
                        className="text-lg lg:text-xl leading-8 mb-8 lg:text-left text-gray-700 dark:text-gray-300"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.7 }}
                    >
                        An undergraduate Islamic Religious Education student at UIN Sunan Kalijaga Yogyakarta with strong interests in Education, IT, and Graphic Design. Experienced in frontend development using <span className="font-semibold text-blue-700 dark:text-blue-400">React.js</span>, <span className="font-semibold text-blue-700 dark:text-blue-400">Next.js</span> and Laravel along with backend skills in Node.js with Hapi Framework, experience in databases like <span className="font-semibold text-blue-700 dark:text-blue-400">MongoDB</span> and SQL. Skilled in mobile development with Kotlin and excels in design-to-code workflows, translating UI/UX designs from Figma into responsive web interfaces.
                    </motion.p>
                    <motion.div 
                        className="flex justify-center lg:justify-start gap-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.8 }}
                    >
                        <Link
                            href="https://drive.google.com/file/d/1etucU2A9PSaP4cOPeHyvjHJ5HGbI8m5l/view?usp=sharing"
                            className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-full text-center text-lg font-semibold transition duration-300 shadow-md hover:shadow-lg"
                            target="_blank"
                        >
                            View Resume
                        </Link>
                        <Link
                            href="/contact"
                            className="bg-transparent border-2 border-blue-600 text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-white py-3 px-6 rounded-full text-center text-lg font-semibold transition duration-300"
                        >
                            Contact Me
                        </Link>
                    </motion.div>
                </motion.div>
            </div>

            <motion.div 
                className="mt-16 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md w-full max-w-5xl"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
            >
                <h2 className="text-3xl font-bold text-blue-800 dark:text-blue-400 mb-10 text-center">Experience & Education</h2>
                
                <div className="space-y-8">
                    <motion.div 
                        className="border-l-4 border-blue-500 pl-6 space-y-2"
                        whileInView={{ x: [50, 0], opacity: [0, 1] }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">UIN Sunan Kalijaga Yogyakarta</h3>
                        <p className="text-blue-600 dark:text-blue-400">Islamic Religious Education (2021 - Present)</p>
                        <p className="text-gray-600 dark:text-gray-400">Active student focusing on integrating technology in religious education materials.</p>
                    </motion.div>
                    
                    <motion.div 
                        className="border-l-4 border-blue-500 pl-6 space-y-2"
                        whileInView={{ x: [50, 0], opacity: [0, 1] }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">GDSC UIN Sunan Kalijaga Yogyakarta</h3>
                        <p className="text-blue-600 dark:text-blue-400">Web Development Core Team (2023 - 2024)</p>
                        <p className="text-gray-600 dark:text-gray-400">Developing innovative web solutions with a focus on frontend development using React.js and Next.js.</p>
                    </motion.div>
                    
                    <motion.div 
                        className="border-l-4 border-blue-500 pl-6 space-y-2"
                        whileInView={{ x: [50, 0], opacity: [0, 1] }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Freelance Web Developer</h3>
                        <p className="text-blue-600 dark:text-blue-400">Frontend & UI/UX Developer (2022 - Present)</p>
                        <p className="text-gray-600 dark:text-gray-400">Developing websites and web applications for various clients with a focus on responsive design and user experience.</p>
                    </motion.div>
                </div>
            </motion.div>

            <motion.div 
                className="w-full max-w-5xl mt-16 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
            >
                <TechStack />
            </motion.div>
        </motion.div>
    );
}
