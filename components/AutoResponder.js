// Auto Responder Configuration untuk Tawk.to
export const autoResponses = {
  // Responses untuk pertanyaan tentang harga
  pricing: {
    keywords: ['harga', 'price', 'biaya', 'cost', 'tarif', 'budget'],
    response: `💰 **INFORMASI HARGA LAYANAN**

🌐 **Website Development:**
• Landing Page: Rp 2-5 juta
• Company Profile: Rp 5-10 juta  
• E-commerce: Rp 10-25 juta
• Custom Web App: Rp 15-50 juta

📱 **Mobile App Development:**
• Simple App: Rp 15-30 juta
• Medium App: Rp 30-50 juta
• Complex App: Rp 50-100 juta

⚡ **Add-on Services:**
• UI/UX Design: Rp 2-8 juta
• SEO Optimization: Rp 1-3 juta
• Maintenance (per bulan): Rp 500rb-2 juta

Harga dapat disesuaikan dengan kompleksitas project. Mau konsultasi gratis untuk project Anda? 😊`
  },

  // Responses untuk pertanyaan tentang layanan
  services: {
    keywords: ['layanan', 'service', 'jasa', 'bisa', 'dapat', 'what do you do'],
    response: `🚀 **LAYANAN YANG SAYA TAWARKAN:**

✅ **Frontend Development**
• Next.js, React.js, Vue.js
• Responsive Design & Mobile-First
• Performance Optimization

✅ **Mobile Development**  
• Android Native Development
• React Native (Cross-platform)
• UI/UX Mobile Design

✅ **Backend Development**
• Node.js, Express.js
• Database Integration
• API Development & Integration

✅ **Other Services**
• Website Maintenance
• SEO Optimization  
• Domain & Hosting Setup
• Technical Consultation

Project apa yang sedang Anda rencanakan? 🤔`
  },

  // Responses untuk informasi kontak
  contact: {
    keywords: ['kontak', 'contact', 'hubungi', 'reach', 'email', 'phone', 'whatsapp'],
    response: `📞 **MARI TERHUBUNG!**

📧 **Email:** frisnadi@example.com
📱 **WhatsApp:** +62-xxx-xxxx-xxxx
💼 **LinkedIn:** linkedin.com/in/frisyk
🌐 **Website:** frisyk.vercel.app
📱 **GitHub:** github.com/frisyk

💬 **Atau lanjutkan chat di sini untuk konsultasi langsung!**

Saya biasanya merespon dalam 1-2 jam selama jam kerja (09:00-17:00 WIB). Untuk project urgent, lebih baik via WhatsApp ya! 😊`
  },

  // Responses untuk portfolio/gallery
  portfolio: {
    keywords: ['portfolio', 'portofolio', 'karya', 'project', 'gallery', 'work', 'example'],
    response: `🎨 **LIHAT KARYA-KARYA SAYA:**

Silakan kunjungi halaman **Portfolio** dan **Gallery** di website ini untuk melihat project-project yang sudah saya kerjakan.

🌟 **Featured Projects:**
• E-learning Platform (Next.js + MongoDB)
• E-commerce Website (React + Node.js)  
• Mobile Banking App (React Native)
• Company Profile (Next.js + Tailwind)
• Inventory Management System

📊 **Total Project Completed:** 50+ projects
⭐ **Client Satisfaction:** 98% positive feedback

Ada project tertentu yang ingin Anda tanyakan lebih detail? 🤔`
  },

  // Response default untuk pertanyaan umum
  default: {
    keywords: ['hi', 'hello', 'halo', 'selamat', 'pagi', 'siang', 'malam'],
    response: `👋 **Halo! Selamat datang!**

Saya Frisyk, Web Developer & Mobile Developer yang siap membantu mewujudkan project digital Anda! 

🚀 **Yang bisa saya bantu:**
• Konsultasi project gratis
• Estimasi biaya development  
• Diskusi fitur dan teknologi
• Review portfolio & case study

Silakan ketik pertanyaan Anda atau pilih topik:
• Ketik "harga" untuk info pricing
• Ketik "layanan" untuk list services
• Ketik "portfolio" untuk lihat karya
• Ketik "kontak" untuk info contact

Ada yang bisa saya bantu hari ini? 😊`
  }
}

// Fungsi untuk mencari response yang tepat
export const findBestResponse = (message) => {
  const lowerMessage = message.toLowerCase()
  
  // Cek setiap kategori response
  for (const [category, config] of Object.entries(autoResponses)) {
    for (const keyword of config.keywords) {
      if (lowerMessage.includes(keyword)) {
        return {
          category,
          response: config.response
        }
      }
    }
  }
  
  // Return default jika tidak ada yang cocok
  return {
    category: 'default',
    response: autoResponses.default.response
  }
} 