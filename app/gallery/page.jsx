import Catalog from '@/components/Catalog';
import { catalogData } from '@/components/Data';


export const metadata = {
    title: "Gallery"
}

export default function GalleryPage() {
    return (
      <main className="relative">
        <h1 className="text-2xl p-5 mt-2 font-bold outline text-blue-800 text-center">✨My Gallery✨</h1>
        <Catalog catalog={catalogData} />
      </main>
    )
}