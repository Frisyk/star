import Header from '@/components/Header'
import './globals.css'
import { Poppins } from 'next/font/google'
import Footer from '@/components/Footer'

const inter = Poppins({ subsets: ['latin'], weight: ['400', '600', '800'] })

export const metadata = {
  title: {
    default: 'Frisyk',
    template: '%s | Frisyk',
  },
  description: 'frisnadi Nurul Huda or Frisyk web developer frontend android mobile development',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
          {children}
        <Footer />
        </body>
    </html>
  )
}
