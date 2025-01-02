import { projectData } from '@/components/Data';
import Image from 'next/image';
import Link from 'next/link';
import { BsGithub } from 'react-icons/bs';

export const metadata = {
  title: "Projects"
};

export default function ProjectsPage() {
  return (
    <main className="min-h-screen w-full overflow-hidden bg-gray-100">
      <section className='flex flex-wrap justify-center p-5'>
        {
          projectData.map((it) => (
            <Project key={it.id} title={it.title} img={it.image} url={it.slug} desc={it.desc} github={it.github} />
          ))
        }
      </section>
    </main>
  );
}

function Project({ img, title, url, github, desc }) {
  return (
    <div className="bg-white shadow-md m-5 w-full md:w-1/2 lg:w-1/3 xl:w-1/3 rounded-lg overflow-hidden transform transition duration-500 hover:scale-105">
      <div className="relative ">
        <Image
          src={img}
          width={500}
          height={500}
          alt={title}
          className="hover:opacity-75 object-cover transition-opacity duration-300"
        />
      </div>
      <div className="p-4">
        <div className='flex justify-between items-center mb-2'>
          <h1 className="text-xl md:text-2xl font-semibold text-gray-800">{title}</h1>
          <div className='flex gap-4'>
            <Link href={url} passHref
              className="text-blue-500 hover:bg-blue-600 hover:text-blue-100 py-2 px-5 rounded-full outline transition-colors duration-300" target='_blank'>
                Lihat🙄
            </Link>
            <Link href={github} passHref
              className="text-black text-xl hover:bg-slate-900 hover:text-slate-100 py-2 px-5 rounded-full outline transition-colors duration-300" target='_blank'>
                <BsGithub/>
            </Link>
          </div>
          
        </div>
        <p className="text-gray-600" dangerouslySetInnerHTML={{ __html: desc || "" }}></p>
      </div>
    </div>
  );
}
