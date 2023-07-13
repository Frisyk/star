import Image from "next/image"

export const metadata = {
    title: "Services"
}

export default function ServicesPage() {
    return (
        <section className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-20">
      <div className=" mx-auto px-4 flex items-center justify-center">
        <div className="relative w-full">
          <Image
            src="/photo/profil2.png"
            width={400}
            height={500}
            alt="Hero Image"
            className="rounded-full w-48 h-48 object-cover shadow-lg"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">Welcome to My Website</h1>
            <p className="text-lg md:text-xl mb-8 text-white">Im a passionate Web Developer.</p>
          </div>
        </div>
      </div>
    </section>
    )
}