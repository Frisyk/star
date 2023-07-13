import { BsInstagram, BsWhatsapp, BsGithub, BsDribbble } from 'react-icons/bs'

export default function Footer() {
    return (
        <footer className="flex items-center justify-between p-10 gap-10 text-xl font-bold text-gray-600">
            <p>Frisyk.</p>
            <section className="flex gap-8">
                <BsInstagram size={30} />
                <BsWhatsapp size={30} />
                <BsGithub size={30} />
                <BsDribbble size={30} />
            </section>
            <p>&#169;2023</p>
        </footer>
    )
}