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
        <nav className="hidden w-full lg:flex justify-between p-5 mx-auto items-center z-10 sticky top-0 lg:backdrop-blur-2xl">
            <div className="logo">
                <Link className="p-3 font-bold text-2xl text-blue-800" href="/">Frisyk.</Link>
            </div>
            <div className="nav-link flex gap-5 lg:mr-[200px]">
                <Link className="p-3 font-semibold text-gray-600 hover:text-blue-600" href="/">Home</Link>
                <Link className="p-3 font-semibold text-gray-600 hover:text-blue-600" href="/about">About</Link>
                <Link className="p-3 font-semibold text-gray-600 hover:text-blue-600" href="/projects">Projects</Link>
                <Link className="p-3 font-semibold text-gray-600 hover:text-blue-600" href="/articles">Articles</Link>
                <Link className="p-3 font-semibold text-gray-600 hover:text-blue-600" href="/services">Services</Link>
            </div>
        </nav>

        {/* responsive */}
        <nav className="lg:hidden w-full mx-auto sticky top-0 z-10">
            <div className="logo flex justify-between bg-orange-200">
                <Link className="p-3 font-bold text-lg text-blue-800" href="/">Frisyk.</Link>
                <div className='p-3 cursor-pointer text-blue-800 '>
                        {
                            !nav? ( <BiMenuAltRight onClick={handleNav} size={30} /> ) : ( <IoMdClose onClick={handleNav} size={30} /> )
                        }
                    </div>
            </div>
            <div className={!nav? "absolute h-screen flex flex-col justify-center gap-5 left-[-1000px] ease-in duration-500 text-center bg-slate-800" : "absolute w-full h-screen flex flex-col justify-center gap-5 left-0 ease-in duration-500 text-center bg-white"}>
                <Link onClick={handleNav} className="p-3 font-semibold text-gray-600 hover:text-blue-600" href="/">Home</Link>
                <Link onClick={handleNav} className="p-3 font-semibold text-gray-600 hover:text-blue-600" href="/about">About</Link>
                <Link onClick={handleNav} className="p-3 font-semibold text-gray-600 hover:text-blue-600" href="/projects">Projects</Link>
                <Link onClick={handleNav} className="p-3 font-semibold text-gray-600 hover:text-blue-600" href="/articles">Articles</Link>
                <Link onClick={handleNav} className="p-3 font-semibold text-gray-600 hover:text-blue-600" href="/services">Services</Link>
            </div>
        </nav>
        </>
    )
}