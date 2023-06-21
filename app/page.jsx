import Image from 'next/image'

export default function Home() {
  return (
    <main className=" h-screen absolute top-0 left-0 -z-10">
      <div className="home flex flex-col lg:gap-10 lg:flex-row items-center w-4/5 mx-auto">
        <Image
        src="/photo/profil2.png"
        width={800}
        height={700}
        alt="Frisnadiyk"
        className=" mt-[17.5%] w-[850px]"
        />
        <div className="home-text">
        <h1>Assalamualaikum <br /> <span className="text-4xl font-semibold">I&apos;m Frisnadi</span> <br /> <span>a Web Developer and Graphic Designer Enthusiants</span> </h1>

        <p><br />In the ever-evolving world of the web, great looks and optimal functionality are the keys to captivating online visitors. Are you ready to create a stunning website with a touch of inspired creativity?</p>
        </div>
      </div>
    </main>
  )
}
