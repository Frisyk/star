'use client';
import { useState } from 'react';
import { BiMenuAltRight } from 'react-icons/bi';
import { IoMdClose } from 'react-icons/io';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [nav, setNav] = useState(false);
  const handleNav = () => setNav(!nav);
  const pathname = usePathname();

  // Function to extract page title from pathname
  const getPageTitle = (pathname) => {
    if (pathname === '/') return 'Home';
    const title = pathname.substring(1); // Remove the leading '/'
    return title.charAt(0).toUpperCase() + title.slice(1); // Capitalize the first letter
  };

  const pageTitle = getPageTitle(pathname);

  const navLinks = [
    { href: '/', text: 'Home' },
    { href: '/about', text: 'About' },
    { href: '/projects', text: 'Projects' },
    { href: '/gallery', text: 'Gallery' },
    { href: '/services', text: 'Services' },
  ];

  return (
    <>
      {/* Large Screen Navigation */}
      <nav className="hidden w-full lg:flex justify-between p-5 mx-auto items-center z-10 sticky top-0 lg:backdrop-blur-2xl">
        <Link className="p-3 font-bold text-2xl text-blue-800" href="/">
          Frisyk.
        </Link>
        <div className="flex gap-5 lg:mr-[200px]">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              className={`flex items-center rounded-md justify-center gap-2 p-5 text-sm font-medium text-blue-400 hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-4 md:px-5 ${
                pathname === link.href ? 'bg-sky-100 text-blue-600 font-bold' : ''
              }`}
              prefetch={false}
              href={link.href}
            >
              {link.text}
            </Link>
          ))}
        </div>
      </nav>

      {/* Responsive Navigation */}
      <nav className="lg:hidden w-full mx-auto sticky top-0 z-10">
        <div className="flex justify-between bg-orange-200 items-center px-5">
            <div className='flex items-center'>
                <Link prefetch={false} className="p-3 font-bold text-lg text-blue-800" href="/">
                    Frisyk.
                </Link>
                <span className="mr-2 text-white bg-blue-600 font-bold p-2 rounded">{pageTitle}</span>
            </div>

          
            <div className='p-3 cursor-pointer text-blue-800'>
              {!nav ? (
                <BiMenuAltRight onClick={handleNav} size={30} />
              ) : (
                <IoMdClose onClick={handleNav} size={30} />
              )}
            </div>
          </div>
        
        <div
          className={`${
            nav ? 'absolute w-full' : 'absolute left-[-1000px]'
          } h-screen flex flex-col justify-center gap-5 ease-in duration-500 text-center bg-white`}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              prefetch={false}
              onClick={handleNav}
              className="p-3 font-semibold text-gray-600 hover:text-blue-600"
              href={link.href}
            >
              {link.text}
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}
