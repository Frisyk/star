import { projectData } from '@/components/Data';
import Image from 'next/image';
import Link from 'next/link';
import { BsGithub } from 'react-icons/bs';

export const metadata = {
  title: 'Projects',
};

export default function ProjectsPage() {
  return (
    <main className="min-h-screen w-full overflow-hidden bg-gray-100">
      <section className="flex flex-wrap justify-center p-5">
        {projectData.map((it) => (
          <div
            key={it.id}
            className="bg-white shadow-md m-5 w-full md:w-1/2 lg:w-1/3 xl:w-1/3 rounded-lg overflow-hidden transform hover:scale-105 transition duration-500 animate-fadeInUp"
          >
            <Link href={it.slug} target="_blank" className="relative">
              <Image
                src={it.image}
                width={500}
                height={500}
                alt={it.title}
                className="hover:opacity-75 object-cover transition-opacity duration-300"
              />
            </Link>
            <div className="p-4">
              <div className="flex justify-between items-center mb-2">
                <h1 className="text-xl md:text-2xl font-semibold text-gray-800">
                  {it.title}
                </h1>
                <Link
                  href={it.github}
                  passHref
                  className="text-black text-xl hover:bg-slate-900 hover:text-slate-100 py-2 px-5 rounded-full outline transition-colors duration-300"
                  target="_blank"
                >
                  <BsGithub />
                </Link>
              </div>
              <p
                className="text-gray-600"
                dangerouslySetInnerHTML={{ __html: it.desc || '' }}
              ></p>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
