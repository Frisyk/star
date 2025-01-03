import Link from 'next/link'
import { BsInstagram, BsWhatsapp, BsGithub, BsLinkedin } from 'react-icons/bs'

export default function Footer() {
    return (
        <footer className="flex w-full items-center mt-10 justify-between p-10 gap-3 lg:gap-10 text-sm lg:text-xl font-bold text-gray-600">
            <p>Frisyk.</p>
            <section className="flex text-xl md:text-2xl lg:text-3xl gap-5 lg:gap-8">
                <Link target='_blank' className="hover:text-red-700" href={'https://www.instagram.com/frisnadiyk/'} ><BsInstagram /> </Link>
                <Link target='_blank' className="hover:text-green-600" href={'https://wa.me/6285225505839'} ><BsWhatsapp  /> </Link>
                <Link target='_blank' className="hover:text-gray-800" href={'https://github.com/frisyk'} ><BsGithub /> </Link>
                <Link target='_blank' className="hover:text-blue-600" href={'https://www.linkedin.com/in/frisnadi-nurul-huda-883334247/'} ><BsLinkedin /> </Link>
            </section>
            <p>&#169;2023</p>
        </footer>
    )
}