import { GoogleGenerativeAI } from '@google/generative-ai'
import { NextResponse } from 'next/server'

// Inisialisasi Google Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

// Konfigurasi model
const model = genAI.getGenerativeModel({ 
  model: "gemini-1.5-flash",
  generationConfig: {
    temperature: 0.7,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 1000,
  },
})

// System prompt untuk konteks AI Assistant
const SYSTEM_PROMPT = `
Anda adalah AI Assistant untuk website portfolio Frisyk (Frisnadi Nurul Huda), seorang Web Developer dan Mobile Developer profesional. 

INFORMASI TENTANG FRISYK:
- Nama: Frisnadi Nurul Huda (Frisyk)
- Profesi: Web Developer & Mobile Developer
- Spesialisasi: Next.js, React.js, Android Development
- Website: frisyk.vercel.app
- Berpengalaman dalam UI/UX Design dan Performance Optimization

LAYANAN YANG DITAWARKAN:
🌐 Website Development:
- Landing Page: Rp 299.000-599.000
- Company Profile: Rp 599.000-1.099.000
- E-commerce: Rp 1.099.000-2.599.000
- Custom Web App: Rp 1.599.000-5.099.000

📱 Mobile App Development:
- Simple App: Rp 1.599.000-3.099.000
- Medium App: Rp 3.099.000-5.099.000
- Complex App: Rp 5.099.000-10.099.000

⚡ Add-on Services:
- UI/UX Design: Rp 299.000-899.000
- SEO Optimization: Rp 399.000-1.999.000
- Maintenance (per bulan): Rp 500.000-2.999.000

KONTAK INFORMASI:
- Email: frisnadi1@gmail.com
- WhatsApp: +62-852-2550-5839
- Instagram: @frisnadi
- LinkedIn: https://www.linkedin.com/in/frisnadi-nurul-huda-883334247/
- GitHub: github.com/frisyk

PANDUAN RESPON:
1. Selalu ramah, profesional, dan membantu
2. Gunakan emoji untuk membuat percakapan lebih menarik
3. Jawab dalam bahasa Indonesia yang sopan
4. **FORMAT RESPONSE DENGAN MARKDOWN:**
   - Gunakan **bold** untuk penekanan penting
   - Gunakan backtick untuk nama teknologi/file
   - Gunakan ## untuk heading
   - Gunakan - atau * untuk list
   - Gunakan triple backtick untuk code blocks
   - Gunakan > untuk quotes
   - Gunakan | untuk tables jika diperlukan
5. Jika ditanya tentang layanan, berikan informasi lengkap dengan harga dalam format markdown
6. Jika ditanya hal umum (tidak terkait portfolio), berikan jawaban yang bermanfaat
7. Jika tidak tahu sesuatu, jujur katakan dan tawarkan bantuan lain
8. Selalu akhiri dengan pertanyaan follow-up untuk melanjutkan percakapan

**CONTOH FORMAT RESPONSE:**

## 🌐 Layanan Web Development

Saya menyediakan berbagai **layanan pengembangan website** dengan teknologi modern:

### Frontend Technologies:
- Next.js - Framework React untuk production
- React.js - Library JavaScript populer  
- Tailwind CSS - Utility-first CSS framework

### Pricing:
| Jenis Website | Harga | Timeline |
|---------------|-------|----------|
| Landing Page | Rp 299k-599k | 1-2 minggu |
| Company Profile | Rp 599k-1.099k | 2-3 minggu |

> **Semua project termasuk responsive design dan optimasi SEO dasar**

Anda bisa menjawab pertanyaan umum apa saja, tapi prioritaskan informasi tentang layanan Frisyk jika relevan.
`

export async function POST(request) {
  try {
    const { message, chatHistory, stream = true } = await request.json()

    if (!message) {
      return NextResponse.json(
        { success: false, error: 'Message is required' },
        { status: 400 }
      )
    }

    // Format chat history untuk context
    let conversationContext = SYSTEM_PROMPT + "\n\nPERCAKAPAN SEBELUMNYA:\n"
    
    if (chatHistory && chatHistory.length > 1) {
      // Ambil 5 pesan terakhir untuk context (exclude welcome message)
      const recentMessages = chatHistory.slice(-5).filter(msg => msg.id !== 1)
      
      recentMessages.forEach(msg => {
        const role = msg.isBot ? "Assistant" : "User"
        conversationContext += `${role}: ${msg.text}\n`
      })
    }

    conversationContext += `\nUser: ${message}\nAssistant:`

    // Jika streaming diminta
    if (stream) {
      // Setup streaming response
      const encoder = new TextEncoder()
      
      const customReadable = new ReadableStream({
        async start(controller) {
          try {
            // Generate content dengan streaming
            const result = await model.generateContentStream(conversationContext)
            
            for await (const chunk of result.stream) {
              const chunkText = chunk.text()
              if (chunkText) {
                const data = JSON.stringify({ chunk: chunkText }) + '\n'
                controller.enqueue(encoder.encode(data))
              }
            }
            
            // Send final signal
            controller.enqueue(encoder.encode(JSON.stringify({ done: true }) + '\n'))
            controller.close()
          } catch (error) {
            console.error('Streaming error:', error)
            const errorData = JSON.stringify({ 
              error: 'Streaming failed', 
              message: error.message 
            }) + '\n'
            controller.enqueue(encoder.encode(errorData))
            controller.close()
          }
        }
      })

      return new Response(customReadable, {
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Cache-Control': 'no-cache, no-transform',
          'Connection': 'keep-alive',
        },
      })
    } else {
      // Non-streaming fallback
      const result = await model.generateContent(conversationContext)
      const response = await result.response
      const text = response.text()

      return NextResponse.json({
        success: true,
        response: text.trim()
      })
    }

  } catch (error) {
    console.error('Error in chat API:', error)
    
    // Handle specific Gemini API errors
    if (error.message?.includes('API_KEY')) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'API key configuration error. Please check Gemini API key.' 
        },
        { status: 500 }
      )
    }

    if (error.message?.includes('quota')) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'API quota exceeded. Please try again later.' 
        },
        { status: 429 }
      )
    }

    return NextResponse.json(
      { 
        success: false, 
        error: 'Maaf, terjadi kesalahan pada server. Silakan coba lagi nanti.' 
      },
      { status: 500 }
    )
  }
}

// Handle GET request untuk testing
export async function GET() {
  return NextResponse.json({
    success: true,
    message: 'Gemini Chat API is running',
    timestamp: new Date().toISOString()
  })
} 