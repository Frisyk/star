'use client';
import { useState } from 'react';
import { BiMenuAltRight } from 'react-icons/bi';
import { IoMdClose } from 'react-icons/io';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeToggle } from './ThemeToggle';

export default function Header() {
  const [nav, setNav] = useState(false);
  const handleNav = () => setNav(!nav);
  const pathname = usePathname();

  const getPageTitle = (pathname) => {
    if (pathname === '/') return 'Home';
    const title = pathname.substring(1);
    return title.charAt(0).toUpperCase() + title.slice(1);
  };

  const pageTitle = getPageTitle(pathname);

  const navLinks = [
    { href: '/', text: 'Home' },
    { href: '/about', text: 'About' },
    { href: '/projects', text: 'Projects' },
    { href: '/gallery', text: 'Gallery' },
    { href: '/contact', text: 'Contact' },
  ];

  return (
    <>
      {/* Large Screen Navigation */}
      <nav className="hidden w-full lg:flex justify-between p-5 mx-auto items-center z-10 fixed top-0 lg:backdrop-blur-2xl dark:bg-gray-900/70 dark:backdrop-blur-2xl">
        <Link className="p-3 font-bold text-2xl text-blue-800 dark:text-blue-400" href="/">
          Frisyk.
        </Link>
        <div className="flex gap-5 items-center">
          <div className="flex gap-3 lg:mr-[100px]">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                className={`flex items-center rounded-md justify-center gap-2 p-5 text-sm font-medium text-blue-400 dark:text-blue-300 hover:bg-sky-100 dark:hover:bg-sky-900/30 hover:text-blue-600 dark:hover:text-blue-400 md:flex-none md:justify-start md:p-4 md:px-5 transition-colors duration-300 ${
                  pathname === link.href ? 'bg-sky-100 dark:bg-sky-900/40 text-blue-600 dark:text-blue-300 font-bold' : ''
                }`}
                prefetch={false}
                href={link.href}
              >
                {link.text}
              </Link>
            ))}
          </div>
          <ThemeToggle />
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div className="lg:hidden flex items-center justify-between p-5 dark:bg-gray-900">
        <Link className="font-bold text-2xl text-blue-800 dark:text-blue-400 z-20" href="/">
          Frisyk.
        </Link>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button
            onClick={handleNav}
            className="cursor-pointer text-blue-800 dark:text-blue-300 z-20"
          >
            {nav ? <IoMdClose size={30} /> : <BiMenuAltRight size={30} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {nav && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed top-0 right-0 w-full h-screen bg-white dark:bg-gray-900 flex flex-col justify-center items-center text-center z-10"
          >
            <div className="absolute top-5 right-5">
              {/* Button displayed in previous div */}
            </div>
            <div className="flex flex-col gap-5">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <Link
                    onClick={handleNav}
                    className={`text-2xl font-medium ${
                      pathname === link.href
                        ? 'text-blue-600 dark:text-blue-400 font-bold'
                        : 'text-blue-400 dark:text-blue-300'
                    }`}
                    href={link.href}
                  >
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
