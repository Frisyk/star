'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeToggle } from './ThemeToggle';
import { FiHome, FiUser, FiCode, FiImage, FiBox, FiMail, FiMenu } from 'react-icons/fi';
import { IoMdClose } from 'react-icons/io';

export default function FloatingNavbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', text: 'Home', icon: <FiHome /> },
    { href: '/about', text: 'About', icon: <FiUser /> },
    { href: '/projects', text: 'Projects', icon: <FiCode /> },
    { href: '/gallery', text: 'Gallery', icon: <FiImage /> },
    // { href: '/experience', text: '3D View', icon: <FiBox /> },
    { href: '/contact', text: 'Contact', icon: <FiMail /> },
  ];

  return (
    <>
      {/* Desktop Floating Navbar */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`hidden lg:flex fixed top-6 left-1/2 -translate-x-1/2 z-50 items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-lg border border-gray-200 dark:border-gray-700' 
            : 'bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-transparent'
        }`}
      >
        <div className="flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-4 py-2 rounded-full text-sm font-medium transition-colors"
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-blue-100 dark:bg-blue-900/50 rounded-full"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className={`relative z-10 flex items-center gap-2 ${
                  isActive 
                    ? 'text-blue-600 dark:text-blue-300' 
                    : 'text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-300'
                }`}>
                  {link.icon}
                  {link.text}
                </span>
              </Link>
            );
          })}
        </div>

        <div className="ml-2 pl-2 border-l border-gray-300 dark:border-gray-700">
          <ThemeToggle />
        </div>
      </motion.nav>

      {/* Mobile Floating Button */}
      <div className="lg:hidden fixed top-5 right-5 z-50 flex items-center gap-3">
        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-full shadow-lg border border-gray-200 dark:border-gray-700 p-1">
             <ThemeToggle />
        </div>
       
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-3 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-full shadow-lg border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-white"
        >
          {mobileMenuOpen ? <IoMdClose size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-40 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl flex flex-col items-center justify-center lg:hidden"
          >
            <div className="flex flex-col gap-6 w-full max-w-xs">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-4 text-2xl font-medium p-4 rounded-xl transition-colors ${
                      pathname === link.href
                        ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                        : 'text-gray-600 dark:text-gray-300'
                    }`}
                  >
                    <span className="text-3xl">{link.icon}</span>
                    {link.text}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
