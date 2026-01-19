"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { FaEnvelope, FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";
import { BsSend } from "react-icons/bs";
import ForestScene from "@/components/ForestScene";

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate sending email by opening email client
    const subject = encodeURIComponent(`Message from ${formState.name}`);
    const body = encodeURIComponent(`Message: ${formState.message}\n\nFrom: ${formState.name} (${formState.email})`);
    window.open(`mailto:frisnadi1@gmail.com?subject=${subject}&body=${body}`);
    
    // Reset form after a moment
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormState({ name: "", email: "", message: "" });
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 3000);
    }, 1000);
  };

  const contactInfo = [
    {
      icon: <FaEnvelope className="text-blue-400" />,
      text: "frisnadi1@gmail.com",
      href: "mailto:frisnadi1@gmail.com",
      label: "Email"
    },
    {
      icon: <FaLinkedin className="text-blue-500" />,
      text: "LinkedIn Profile",
      href: "https://www.linkedin.com/in/frisnadi-nurul-huda-883334247/",
      label: "LinkedIn"
    },
    {
      icon: <FaGithub className="text-white" />,
      text: "GitHub Profile",
      href: "https://github.com/frisyk",
      label: "GitHub"
    },
    {
      icon: <FaInstagram className="text-pink-500" />,
      text: "@frisnadiyk",
      href: "https://www.instagram.com/frisnadiyk/",
      label: "Instagram"
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-gray-900 text-white">
      <ForestScene />

      <div className="relative z-10 pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-6 drop-shadow-sm">
            Get In Touch
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto backdrop-blur-sm bg-black/20 p-4 rounded-xl border border-white/5">
            Interested in collaborating? Have questions? Don&apos;t hesitate to reach out. I&apos;m always open to discussing new projects and opportunities.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gray-800/50 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/10"
          >
            <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
                <span className="w-1 h-8 bg-blue-500 rounded-full"></span>
                Send Message
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Name
                    </label>
                    <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-900/50 text-white transition-all outline-none"
                    placeholder="John Doe"
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email
                    </label>
                    <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-900/50 text-white transition-all outline-none"
                    placeholder="john@example.com"
                    />
                </div>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 rounded-lg border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-900/50 text-white transition-all outline-none resize-none"
                  placeholder="Tell me about your project..."
                ></textarea>
              </div>
              
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-white font-bold text-lg shadow-lg ${isSubmitting 
                        ? 'bg-blue-500/50 cursor-not-allowed' 
                        : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-[1.02]' 
                  } transition-all duration-300`}
                >
                  {isSubmitting ? 'Sending...' : (
                    <>
                      <span>Send Message</span>
                      <BsSend />
                    </>
                  )}
                </button>
                
                {submitSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-4 p-3 bg-green-500/20 border border-green-500/50 rounded-lg text-green-300 text-center"
                  >
                    Thank you! Your email client has been opened.
                  </motion.div>
                )}
              </div>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-8"
          >
            <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl shadow-xl p-8 border border-white/10">
                <h2 className="text-2xl font-semibold text-white mb-8 flex items-center gap-2">
                    <span className="w-1 h-8 bg-purple-500 rounded-full"></span>
                    Connect With Me
                </h2>
                
                <div className="space-y-4">
                {contactInfo.map((info, index) => (
                    <motion.a
                    key={index}
                    href={info.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02, x: 5 }}
                    className="flex items-center gap-5 p-4 rounded-xl bg-gray-900/50 border border-gray-700 hover:border-blue-500/50 hover:bg-gray-800/80 transition-all duration-300 group"
                    >
                        <div className="text-3xl p-3 bg-gray-800 rounded-lg group-hover:bg-gray-700 transition-colors">
                            {info.icon}
                        </div>
                        <div>
                            <p className="text-sm text-gray-400 mb-1">{info.label}</p>
                            <p className="text-lg text-white font-medium group-hover:text-blue-400 transition-colors">{info.text}</p>
                        </div>
                    </motion.a>
                ))}
                </div>
            </div>
            
            <motion.div 
                className="bg-gradient-to-br from-blue-900/40 to-purple-900/40 backdrop-blur-md p-8 rounded-2xl border border-white/10 text-center"
                whileHover={{ scale: 1.02 }}
            >
              <h3 className="text-xl font-bold text-white mb-2">Based in Yogyakarta</h3>
              <p className="text-gray-300">
                Open to remote work and global opportunities.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}