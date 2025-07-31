'use client'

import { useEffect } from 'react'

const TawkToChat = () => {
  useEffect(() => {
    // Inisialisasi Tawk.to
    var Tawk_API = Tawk_API || {}
    var Tawk_LoadStart = new Date()
    
    // Fungsi untuk memuat script Tawk.to
    const loadTawkTo = () => {
      const script = document.createElement('script')
      const firstScript = document.getElementsByTagName('script')[0]
      
      script.async = true
      script.src = 'https://embed.tawk.to/688acba2c001281928a1b9a2/1j1f2mtb0'
      script.charset = 'UTF-8'
      script.setAttribute('crossorigin', '*')
      
      if (firstScript && firstScript.parentNode) {
        firstScript.parentNode.insertBefore(script, firstScript)
      }
    }

    // Load script hanya jika belum ada
    if (!window.Tawk_API) {
      loadTawkTo()
    }

    // Cleanup function
    return () => {
      // Optional: Anda bisa menambahkan cleanup logic di sini jika diperlukan
    }
  }, [])

  return null // Komponen ini tidak merender apapun secara visual
}

export default TawkToChat 