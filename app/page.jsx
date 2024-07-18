import Image from 'next/image';
import Link from 'next/link';


export default function Home() {
  return (
    <>
        <div className="home flex flex-col lg:gap-10 gap-5 lg:flex-row items-center w-4/5 mx-auto">
          <Image
            src="/photo/profil2.png"
            width={1000}
            height={1200}
            alt="Frisnadiyk"
            className="relative w-full lg:w-[800px] -z-10 "
          />
          <div className="text-blue-800 flex flex-col gap-2">
            <h1 className="lg:text-5xl text-3xl font-semibold">Hi, There!</h1>
            <h1 className="lg:text-7xl text-4xl font-semibold uppercase">I&apos;m Frisnadi✨</h1>
            <p className="lg:text-4xl text-lg leading-loose lg:py-2 mb-10">
              Web and Mobile <span className="font-bold">Developer💻</span> also Graphic{' '}
              <span className="font-bold">Designer✒️</span> Enthusiasts
            </p>
            <Link
              href="/about"
              className="bg-transparent text-blue-800 font-semibold text-xl py-2 px-6 rounded-md w-fit outline outline-blue-800 hover:bg-blue-800 hover:text-white duration-300"
            >
              About Me ➡️
            </Link>
          </div>
        </div>
    </>
  );
}
