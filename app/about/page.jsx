"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import profile from "@/public/photo/pros.png";
import Link from "next/link";
import { TechStack } from "@/components/TechStack";
import { useRef } from "react";
import { FiDownload, FiMail } from "react-icons/fi";

function Section({ children, className = "" }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className={`w-full max-w-6xl mx-auto ${className}`}
        >
            {children}
        </motion.div>
    );
}

export default function AboutPage() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, 200]);

    const experiences = [
        {
            title: "Junior Full stack Developer",
            company: "PT. Infini Inovasi Asia",
            date: "Apr 2025 - Present",
            location: "Bogor, Indonesia",
            desc: [
                "Spearheaded the end-to-end development and seamless integration of backend and frontend systems through robust API design, ensuring optimal data flow and user experience.",
                "Refactored a large-scale legacy codebase, achieving a 30% reduction in code complexity and accelerating feature delivery speed by 25%.",
                "Diagnosed and resolved critical technical issues efficiently, maintaining an impressive average bug resolution time of less than 24 hours.",
                "Led migration from a monolithic architecture to a containerized environment using Docker, reducing infrastructure costs by 40%."
            ],
            align: "left"
        },
        {
            title: "External React Development Code Reviewer",
            company: "Dicoding Indonesia",
            date: "Aug 2025 - Present",
            location: "Indonesia · Remote",
            desc: [
                "Reviewing React development code submissions from students.",
                "Providing constructive feedback and guidance to ensure code quality and best practices.",
                "Contributing to the growth of new developers in the React ecosystem."
            ],
            align: "right"
        },
        {
            title: "Fullstack Web Developer",
            company: "Freelance - Self Employed",
            date: "Jul 2024 - Present",
            location: "Remote",
            desc: [
                "Developed and deployed 5+ full-stack web applications using React.js, Next.js and Tailwind CSS.",
                "Implemented database management and API integrations with MongoDB, MySQL, and third-party services.",
                "Collaborated with clients to deliver customized web solutions, focusing on UI/UX optimization, responsive design, and accessibility."
            ],
            align: "left"
        },
        {
            title: "Mentor Android Development Class",
            company: "Bangkit Academy led by Google, Tokopedia, Gojek, & Traveloka",
            date: "Sep 2024 - Jan 2025",
            location: "Yogyakarta, Indonesia",
            desc: [
                "Conducted 15 weekly consultation sessions and achieved a 4.93/5.00 rating from student feedback.",
                "Supported instructors in conducting 12 ILT sessions covering tech and soft skills, earning a 4.83 rating for effectiveness.",
                "Reviewed 4 times monthly logbooks of 24 students to ensure adherence to learning objectives."
            ],
            align: "right"
        },
        {
            title: "Web Developer Core Team",
            company: "Google Developer Student Club UIN Sunan Kalijaga Yogyakarta",
            date: "Aug 2022 - Jul 2024",
            location: "Yogyakarta, Indonesia · Hybrid",
            desc: [
                "Designed, developed, and delivered comprehensive material on Web and Android development to GDSC members.",
                "Collaborated on designing for various GDSC activities content, resulting in a 20% increase in social media engagement."
            ],
            align: "left"
        }
    ];

    return (
        <div ref={containerRef} className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 pb-20 px-4 md:px-8 overflow-hidden">
            
            {/* Hero Section */}
            <Section className="flex flex-col lg:flex-row items-center gap-12 mb-32">
                <motion.div 
                    className="lg:w-1/3 relative"
                    style={{ y: useTransform(scrollYProgress, [0, 0.5], [0, 50]) }}
                >
                    <div className="relative w-[250px] h-[250px] md:w-[300px] md:h-[300px] mx-auto">
                        <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-2xl rotate-6 opacity-20 animate-pulse"></div>
                        <div className="absolute inset-0 bg-blue-100 dark:bg-gray-800 rounded-2xl -rotate-3 transition-transform hover:rotate-0 duration-500 overflow-hidden shadow-2xl border-4 border-white dark:border-gray-700">
                            <Image
                                src={profile}
                                alt="Frisnadi"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                </motion.div>

                <div className="lg:w-2/3 text-center lg:text-left">
                    <motion.h1 
                        className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-6"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        Frisnadi Nurul Huda
                    </motion.h1>
                    
                    <motion.h3 
                        className="text-2xl text-gray-700 dark:text-gray-300 font-medium mb-6 flex flex-wrap justify-center lg:justify-start gap-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        <span>Full-stack Developer</span>
                        <span className="text-blue-500">•</span>
                        <span>Software Engineer</span>
                        <span className="text-blue-500">•</span>
                        <span>AI Enthusiast</span>
                    </motion.h3>

                    <motion.p 
                        className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-8 max-w-2xl mx-auto lg:mx-0"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                    >
                        A dedicated <span className="font-semibold text-blue-600">Full-stack Developer</span> with a strong passion for building scalable software solutions and exploring the vast potential of <span className="font-semibold text-blue-600">Artificial Intelligence</span>.I thrive at the intersection of robust backend logic and intuitive frontend design, always looking for innovative ways to integrate AI into functional software products.
                    </motion.p>

                    <motion.div 
                        className="flex flex-wrap justify-center lg:justify-start gap-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                    >
                        <Link
                            href="https://drive.google.com/file/d/1etucU2A9PSaP4cOPeHyvjHJ5HGbI8m5l/view?usp=sharing"
                            target="_blank"
                            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold transition-all hover:scale-105 shadow-lg shadow-blue-500/30"
                        >
                            <FiDownload /> Resume
                        </Link>
                        <Link
                            href="/contact"
                            className="flex items-center gap-2 bg-white dark:bg-gray-800 text-gray-800 dark:text-white border border-gray-200 dark:border-gray-700 px-8 py-3 rounded-full font-semibold transition-all hover:scale-105 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 shadow-md"
                        >
                            <FiMail /> Contact Me
                        </Link>
                    </motion.div>
                </div>
            </Section>

            {/* Experience Section */}
            <Section className="mb-32">
                <div className="relative">
                    <div className="absolute left-0 md:left-1/2 h-full w-1 bg-gray-200 dark:bg-gray-700 -translate-x-1/2"></div>
                    <h2 className="text-3xl font-bold text-center mb-16 relative z-10 bg-gray-50 dark:bg-gray-900 inline-block px-4 mx-auto block w-fit text-blue-800 dark:text-blue-400">
                        Professional Journey
                    </h2>

                    <div className="space-y-12">
                        {experiences.map((item, index) => (
                            <motion.div 
                                key={index}
                                className={`flex flex-col md:flex-row items-stretch ${item.align === 'right' ? 'md:flex-row-reverse' : ''} gap-8 relative`}
                                initial={{ opacity: 0, x: item.align === 'left' ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.2 }}
                            >
                                <div className="hidden md:block absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white dark:border-gray-900 z-10 top-6"></div>
                                <div className={`md:w-1/2 ${item.align === 'right' ? 'text-left md:text-left' : 'text-left md:text-right'}`}>
                                    <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-300 h-full group">
                                        <div className="flex flex-col h-full">
                                            <div className="mb-4">
                                                <h3 className="text-xl font-bold text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{item.title}</h3>
                                                <h4 className="text-lg font-semibold text-blue-600 dark:text-blue-400">{item.company}</h4>
                                                <div className="flex flex-wrap gap-2 text-sm text-gray-500 dark:text-gray-400 mt-2">
                                                    <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">{item.date}</span>
                                                    <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">{item.location}</span>
                                                </div>
                                            </div>
                                            
                                            {/* <ul className="space-y-2 mt-2">
                                                {item.desc.map((point, i) => (
                                                    <li key={i} className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed flex items-start gap-2 text-left">
                                                        <span className="mt-1.5 w-1.5 h-1.5 bg-blue-400 rounded-full flex-shrink-0"></span>
                                                        <span>{point}</span>
                                                    </li>
                                                ))}
                                            </ul> */}
                                        </div>
                                    </div>
                                </div>
                                <div className="md:w-1/2"></div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </Section>

            {/* Tech Stack Section */}
            <Section>
                <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-white/20 shadow-xl">
                    <TechStack />
                </div>
            </Section>

        </div>
    );
}
