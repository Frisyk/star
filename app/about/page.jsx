"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import profile from "@/public/photo/pros.png";
import Link from "next/link";
import { TechStack } from "@/components/TechStack";
import SatelliteTechStack from "@/components/SatelliteTechStack";
import { useRef } from "react";
import { FiDownload, FiMail, FiArrowRight } from "react-icons/fi";

function Section({ children, className = "" }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
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
            color: "blue"
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
            color: "purple"
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
            color: "green"
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
            color: "orange"
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
            color: "red"
        }
    ];

    return (
        <div ref={containerRef} className="min-h-screen bg-white dark:bg-gray-900 pt-24 pb-20 px-4 md:px-8 overflow-hidden transition-colors duration-500">
            
            {/* Decorative Background Elements */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-1/4 -left-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>

            {/* Hero Section */}
            <Section className="flex flex-col lg:flex-row items-center gap-12 mb-32 relative">
                <motion.div 
                    className="lg:w-1/3 relative"
                    style={{ y: useTransform(scrollYProgress, [0, 0.5], [0, 50]) }}
                >
                    <div className="relative w-[280px] h-[280px] md:w-[350px] md:h-[350px] mx-auto">
                        {/* Dynamic border/glow */}
                        <div className="absolute -inset-4 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-3xl opacity-30 blur-2xl animate-spin-slow"></div>
                        
                        <div className="relative h-full w-full bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-2xl border-2 border-white dark:border-gray-700 z-10 group">
                            <Image
                                src={profile}
                                alt="Frisnadi"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                <p className="text-white font-medium">Building the future, one line at a time.</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <div className="lg:w-2/3 text-center lg:text-left">
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="inline-block px-4 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-bold text-sm mb-4 uppercase tracking-wider">
                            About Me
                        </span>
                    </motion.div>
                    
                    <motion.h1 
                        className="text-5xl md:text-7xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-[length:200%_auto] animate-gradient mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        Frisnadi Nurul Huda
                    </motion.h1>
                    
                    <motion.div 
                        className="text-2xl text-gray-700 dark:text-gray-300 font-medium mb-8 flex flex-wrap justify-center lg:justify-start gap-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        <span className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                            Full-stack Developer
                        </span>
                        <span className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                            Software Engineer
                        </span>
                        <span className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                            AI Enthusiast
                        </span>
                    </motion.div>

                    <motion.p 
                        className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed mb-10 max-w-3xl mx-auto lg:mx-0"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                    >
                        I am a <span className="font-bold text-blue-600 dark:text-blue-400">Software Engineer</span> with a deep-seated passion for creating scalable, high-performance applications. My journey is driven by the thrill of solving complex architectural puzzles and the constant exploration of <span className="font-bold text-purple-600 dark:text-purple-400">Artificial Intelligence</span> to enhance human-computer interaction.
                    </motion.p>

                    <motion.div 
                        className="flex flex-wrap justify-center lg:justify-start gap-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                    >
                        <Link
                            href="https://drive.google.com/file/d/1etucU2A9PSaP4cOPeHyvjHJ5HGbI8m5l/view?usp=sharing"
                            target="_blank"
                            className="group flex items-center gap-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-10 py-4 rounded-2xl font-bold transition-all hover:scale-105 shadow-xl hover:shadow-blue-500/20"
                        >
                            <FiDownload className="text-xl" /> Download CV
                        </Link>
                        <Link
                            href="/contact"
                            className="group flex items-center gap-3 bg-transparent text-gray-900 dark:text-white border-2 border-gray-200 dark:border-gray-700 px-10 py-4 rounded-2xl font-bold transition-all hover:scale-105 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400"
                        >
                            <FiMail className="text-xl" /> Let&apos;s Talk
                        </Link>
                    </motion.div>
                </div>
            </Section>

            {/* Interactive Tech Stack Section */}
            <Section className="mb-32">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
                        Technical Expertise
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Hover over the 3D ecosystem to explore my core technologies.
                    </p>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-800/30 rounded-[3rem] p-4 md:p-8 border border-gray-100 dark:border-white/5 shadow-inner">
                    <SatelliteTechStack />
                </div>
                
                {/* <div className="mt-16">
                    <TechStack />
                </div> */}
            </Section>

            {/* Professional Journey Section */}
            <Section className="mb-32">
                <div className="relative">
                    <div className="absolute left-4 md:left-1/2 h-full w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-green-500 opacity-30 -translate-x-1/2"></div>
                    
                    <div className="text-center mb-20 relative z-10">
                        <h2 className="text-3xl md:text-5xl font-bold bg-white dark:bg-gray-900 inline-block px-8 py-2 text-gray-900 dark:text-white">
                            Experience
                        </h2>
                    </div>

                    <div className="space-y-24">
                        {experiences.map((item, index) => (
                            <motion.div 
                                key={index}
                                className={`flex flex-col md:flex-row items-center ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''} gap-12 relative`}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, type: "spring" }}
                            >
                                {/* Timeline Node */}
                                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-12 h-12 bg-white dark:bg-gray-800 rounded-full border-4 border-blue-500 z-10 items-center justify-center shadow-lg">
                                    <div className="w-4 h-4 bg-blue-500 rounded-full animate-ping"></div>
                                </div>

                                <div className="md:w-1/2 w-full">
                                    <div className="bg-white dark:bg-gray-800/50 backdrop-blur-md p-8 md:p-10 rounded-[2.5rem] shadow-2xl border border-gray-100 dark:border-white/10 hover:border-blue-500 transition-all duration-500 group relative overflow-hidden">
                                        <div className={`absolute top-0 right-0 w-32 h-32 bg-${item.color}-500/5 rounded-bl-full`}></div>
                                        
                                        <div className="relative z-10">
                                            <span className="text-blue-600 dark:text-blue-400 font-bold text-sm mb-2 block">{item.date}</span>
                                            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 transition-colors">
                                                {item.title}
                                            </h3>
                                            <div className="flex items-center justify-between mb-6">
                                                <h4 className="text-lg font-semibold text-gray-600 dark:text-gray-300">{item.company}</h4>
                                                <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                                                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                                                    {item.location}
                                                </span>
                                            </div>
                                            
                                            <ul className="space-y-4">
                                                {item.desc.map((point, i) => (
                                                    <li key={i} className="text-gray-600 dark:text-gray-400 flex items-start gap-3">
                                                        <FiArrowRight className="mt-1 flex-shrink-0 text-blue-500" />
                                                        <span className="leading-relaxed">{point}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="md:w-1/2"></div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </Section>
        </div>
    );
}
