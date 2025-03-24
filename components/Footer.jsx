import Link from 'next/link'
import { BsInstagram, BsGithub, BsLinkedin } from 'react-icons/bs'
import { MdOutlineAttachEmail } from "react-icons/md";

export default function Footer() {
    return (
            <section className="flex text-xl md:text-2xl lg:text-3xl gap-5 lg:gap-8">
                <Link target='_blank' className="hover:text-red-700" href={'https://www.instagram.com/frisnadiyk/'} ><BsInstagram /> </Link>
                <a target='_blank' className="hover:text-green-600" href='mailto:frisnadi1@gmail.com' ><MdOutlineAttachEmail /> </a>
                <Link target='_blank' className="hover:text-gray-800" href={'https://github.com/frisyk'} ><BsGithub /> </Link>
                <Link target='_blank' className="hover:text-blue-600" href={'https://www.linkedin.com/in/frisnadi-nurul-huda-883334247/'} ><BsLinkedin /> </Link>
            </section>
    )
}