import Catalog from '@/components/Catalog'
import Image from 'next/image'

export default function Home() {
  return (
    <>
      <main className="relative top-0 left-0 -z-10 bg-orange-100">
        <div className="home flex flex-col lg:gap-10 lg:flex-row items-center w-4/5 mx-auto">
          <Image
          src="/photo/profil2.png"
          width={800}
          height={700}
          alt="Frisnadiyk"
          className="relative w-[800px]"
          />
          <div className="text-blue-800">
          <h1>Assalamua&apos;laikum <br /> <span className="text-7xl font-semibold uppercase">I&apos;m Frisnadi</span> <br /> <span className="border-b-4 lg:py-2 border-orange-400">a Web Developer and Graphic Designer Enthusiants</span> </h1>

          <p className="py-5"><br />In the ever-evolving world of the web, great looks and optimal functionality are the keys to captivating online visitors. Are you ready to create a stunning website with a touch of inspired creativity?</p>
          </div>
        </div>
      </main>
      <Catalog />
    </>
  )
}
