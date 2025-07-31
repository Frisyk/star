import Header from '@/components/Header'
import './globals.css'
import { Poppins } from 'next/font/google'
import Footer from '@/components/Footer'
import { ThemeProvider } from '@/components/ThemeProvider'
import TawkToChat from '@/components/TawkToChat'

const inter = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800', '900', '100', '200', '300'] })

export const metadata = {
  title: {
    default: "Frisyk - Web Developer & Mobile Developer",
    template: "%s | Frisyk",
  },
  description:
    "Frisnadi Nurul Huda, atau dikenal sebagai Frisyk, adalah seorang Web Developer dan Mobile Developer yang berfokus pada pengembangan aplikasi berbasis Next.js, React.js, dan Android. Dengan pengalaman dalam membangun website interaktif, aplikasi berbasis mobile, serta optimasi performa web, Frisyk siap membantu menciptakan solusi digital yang inovatif dan berkualitas.",

  openGraph: {
    title: "Frisyk - Web Developer & Mobile Developer",
    description:
      "Frisnadi Nurul Huda (Frisyk) adalah seorang profesional di bidang Web Development dan Mobile Development, mengembangkan aplikasi dengan Next.js, React.js, dan Android. Dengan keahlian dalam desain responsif, UX/UI, serta performa tinggi, Frisyk menawarkan layanan pengembangan web dan aplikasi mobile yang modern dan inovatif.",
    url: "https://frisyk.vercel.app",
    type: "website",
    images: [
      {
        url: "https://frisyk.vercel.app/og-image.jpg", // Ganti dengan gambar OG yang relevan
        width: 1200,
        height: 630,
        alt: "Frisyk - Web Developer & Mobile Developer",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Frisyk - Web Developer & Mobile Developer",
    description:
      "Frisyk adalah seorang Web Developer dan Mobile Developer berpengalaman yang membangun website dan aplikasi berbasis Next.js, React.js, dan Android. Dengan keahlian dalam pengembangan front-end dan optimasi performa, Frisyk menawarkan solusi digital yang efektif dan inovatif.",
    site: "@frisyk", // Ganti dengan username Twitter (jika ada)
    images: ["https://frisyk.vercel.app/twitter-image.jpg"], // Ganti dengan gambar Twitter yang sesuai
  },

  keywords: [
    "Web Developer",
    "Mobile Developer",
    "Frontend Developer",
    "Next.js",
    "React.js",
    "Android Developer",
    "Website Development",
    "Frisyk",
    "UI/UX Design",
    "Optimasi Performa Web",
  ],

  robots: "index, follow",
  author: "Frisnadi Nurul Huda",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.className} dark:bg-gray-900 dark:text-white`}>
        <ThemeProvider>
          <Header />
          <main className='md:mt-20'>{children}</main>
          {/* <Footer /> */}
          <TawkToChat />
        </ThemeProvider>
      </body>
    </html>
  );
}
