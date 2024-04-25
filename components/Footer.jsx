import Link from 'next/link'
import { BsInstagram, BsWhatsapp, BsGithub, BsLinkedin } from 'react-icons/bs'

export default function Footer() {
    return (
        <footer className="flex w-full items-center justify-between p-10 gap-3 lg:gap-10 text-sm lg:text-xl font-bold text-gray-600">
            <p>Frisyk.</p>
            <section className="flex  gap-5 lg:gap-8">

                <Link target='_blank' className="hover:text-blue-600" href={'https://www.instagram.com/frisnadiyk/'} ><BsInstagram size={30} /> </Link>
                <Link target='_blank' className="hover:text-blue-600" href={'https://wa.me/6285225505839'} ><BsWhatsapp size={30} /> </Link>
                <Link target='_blank' className="hover:text-blue-600" href={'https://github.com/frisyk'} ><BsGithub size={30} /> </Link>
                <Link target='_blank' className="hover:text-blue-600" href={'https://www.linkedin.com/in/frisnadi-nurul-huda-883334247/'} ><BsLinkedin size={30} /> </Link>
            </section>
            <p>&#169;2023</p>
        </footer>
    )
}