'use client'

import { useEffect } from 'react'
import { findBestResponse } from './AutoResponder'

const TawkToChat = () => {
  useEffect(() => {
    // Inisialisasi Tawk.to
    var Tawk_API = Tawk_API || {}
    var Tawk_LoadStart = new Date()
    
    // Konfigurasi otomatis untuk Tawk.to
    Tawk_API.onLoad = function() {
      console.log('Tawk.to berhasil dimuat!')
      
      // Kirim pesan selamat datang otomatis
      setTimeout(() => {
        if (typeof Tawk_API.addEvent === 'function') {
          Tawk_API.addEvent('Welcome Message Sent', {
            'message_type': 'welcome',
            'timestamp': new Date().toISOString()
          })
        }
      }, 2000)
      
      // Auto-responder pintar menggunakan keyword detection
      Tawk_API.onChatMessageVisitor = function(message) {
        console.log('Pesan dari visitor:', message)
        
        // Cari response yang tepat berdasarkan pesan
        const response = findBestResponse(message)
        
        // Log aktivitas untuk tracking
        setTimeout(() => {
          if (typeof Tawk_API.addEvent === 'function') {
            Tawk_API.addEvent(`Auto Response: ${response.category}`, {
              'visitor_message': message,
              'response_category': response.category,
              'timestamp': new Date().toISOString(),
              'keywords_detected': true
            })
          }
        }, 1000)
        
        // Simulasi typing indicator (untuk membuat bot terlihat lebih natural)
        setTimeout(() => {
          console.log('Auto response would be:', response.response)
          // Note: Actual auto-response harus diatur di dashboard Tawk.to
          // Ini hanya untuk logging dan tracking di client side
        }, 2000)
      }
      
      // Track ketika chat dimulai
      Tawk_API.onChatStarted = function() {
        Tawk_API.addEvent('Chat Session Started', {
          'session_start': new Date().toISOString(),
          'page_url': window.location.href,
          'user_agent': navigator.userAgent
        })
      }
      
      // Track ketika chat berakhir  
      Tawk_API.onChatEnded = function() {
        Tawk_API.addEvent('Chat Session Ended', {
          'session_end': new Date().toISOString()
        })
      }
    }
    
    // Kustomisasi tampilan chat
    Tawk_API.customStyle = {
      visibility: {
        desktop: {
          position: 'br', // bottom right
          xOffset: '20px',
          yOffset: '20px'
        },
        mobile: {
          position: 'br',
          xOffset: '10px', 
          yOffset: '10px'
        }
      }
    }
    
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