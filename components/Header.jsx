"use client";
import Link from 'next/link'
import { useState } from 'react'
import { BiMenuAltRight } from 'react-icons/bi'
import { IoMdClose } from 'react-icons/io'

export default function Header() {
    const [nav, setNav] = useState(false)
    function handleNav () {
        setNav(!nav)
    }

    return (
        <>
        <nav className="hidden w-full lg:flex justify-between p-5 mx-auto items-center fixed top-0 lg:backdrop-blur-2xl">
            <div className="logo">
                <Link className="p-3 font-bold text-2xl text-purple-950" href="/">Frisyk.</Link>
            </div>
            <div className="nav-link flex gap-5">
                <Link className="p-3 font-semibold text-gray-600 hover:text-purple-800" href="/">Home</Link>
                <Link className="p-3 font-semibold text-gray-600 hover:text-purple-800" href="/about">About</Link>
                <Link className="p-3 font-semibold text-gray-600 hover:text-purple-800" href="/projects">Projects</Link>
                <Link className="p-3 font-semibold text-gray-600 hover:text-purple-800" href="/articles">Articles</Link>
                <Link className="p-3 font-semibold text-gray-600 hover:text-purple-800" href="/services">Services</Link>
            </div>
            <Link className="p-3 font-bold text-lg text-purple-950" href="/contacts">Contact</Link>
        </nav>

        {/* responsive */}
        <nav className="lg:hidden w-full mx-auto fixed top-0">
            <div className="logo flex justify-between bg-orange-200">
                <Link className="p-3 font-bold text-lg text-purple-950" href="/">Frisyk.</Link>
                <div className='p-3 cursor-pointer text-purple-950 '>
                        {
                            !nav? ( <BiMenuAltRight onClick={handleNav} size={30} /> ) : ( <IoMdClose onClick={handleNav} size={30} /> )
                        }
                    </div>
            </div>
            <div className={!nav? "relative h-screen flex flex-col justify-center gap-5 left-[-1000px] ease-in duration-700 text-center bg-slate-800" : "relative h-screen flex flex-col justify-center gap-5 left-0 ease-in duration-700 text-center bg-white"}>
                <Link onClick={handleNav} className="p-3 font-semibold text-gray-600 hover:text-purple-800" href="/">Home</Link>
                <Link onClick={handleNav} className="p-3 font-semibold text-gray-600 hover:text-purple-800" href="/about">About</Link>
                <Link onClick={handleNav} className="p-3 font-semibold text-gray-600 hover:text-purple-800" href="/projects">Projects</Link>
                <Link onClick={handleNav} className="p-3 font-semibold text-gray-600 hover:text-purple-800" href="/articles">Articles</Link>
                <Link onClick={handleNav} className="p-3 font-semibold text-gray-600 hover:text-purple-800" href="/services">Services</Link>
                <Link onClick={handleNav} className="p-3 font-semibold text-gray-600 hover:text-purple-800" href="/contacts">Contact</Link>  
            </div>
        </nav>
        </>
    )
}