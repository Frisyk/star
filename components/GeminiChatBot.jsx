'use client'

import { useState, useRef, useEffect } from 'react'
import { FiMessageCircle, FiX, FiSend, FiUser, FiCpu } from 'react-icons/fi'
import MarkdownRenderer from './MarkdownRenderer'
import { useDarkMode } from './DarkModeProvider'

const GeminiChatBot = () => {
  // Custom scrollbar styles
  useEffect(() => {
    const style = document.createElement('style')
    style.textContent = `
      .custom-scrollbar::-webkit-scrollbar {
        width: 6px;
      }
      
      .custom-scrollbar::-webkit-scrollbar-track {
        background: transparent;
      }
      
      .custom-scrollbar::-webkit-scrollbar-thumb {
        background: #cbd5e1;
        border-radius: 3px;
        transition: background 0.2s ease;
      }
      
      .custom-scrollbar::-webkit-scrollbar-thumb:hover {
        background: #94a3b8;
      }
      
      .dark .custom-scrollbar::-webkit-scrollbar-thumb {
        background: #4b5563;
      }
      
      .dark .custom-scrollbar::-webkit-scrollbar-thumb:hover {
        background: #6b7280;
      }
      
      /* Firefox scrollbar */
      .custom-scrollbar {
        scrollbar-width: thin;
        scrollbar-color: #cbd5e1 transparent;
      }
      
      .dark .custom-scrollbar {
        scrollbar-color: #4b5563 transparent;
      }
      
      /* Hide scrollbar for horizontal overflow in markdown content */
      .markdown-content {
        overflow-x: auto;
      }
      
      .markdown-content::-webkit-scrollbar {
        height: 4px;
      }
      
      .markdown-content::-webkit-scrollbar-track {
        background: transparent;
      }
      
      .markdown-content::-webkit-scrollbar-thumb {
        background: #e2e8f0;
        border-radius: 2px;
      }
      
      .dark .markdown-content::-webkit-scrollbar-thumb {
        background: #374151;
      }
    `
    document.head.appendChild(style)
    
    return () => {
      document.head.removeChild(style)
    }
  }, [])
  const [isOpen, setIsOpen] = useState(false)
  const isDark = useDarkMode()
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "👋 Halo! Saya AI Assistant Frisyk. Saya siap membantu Anda dengan informasi tentang layanan web development, mobile development, dan menjawab pertanyaan umum lainnya. Ada yang bisa saya bantu?",
      isBot: true,
      timestamp: new Date()
    }
  ])
  const [inputText, setInputText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isStreaming, setIsStreaming] = useState(false)
  const [streamingMessageId, setStreamingMessageId] = useState(null)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  // Scroll ke pesan terakhir
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Focus input ketika chat dibuka
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  // Kirim pesan ke API Gemini dengan streaming
  const sendMessage = async (text) => {
    if (!text.trim()) return

    // Tambah pesan user
    const userMessage = {
      id: Date.now(),
      text: text,
      isBot: false,
      timestamp: new Date()
    }
    
    setMessages(prev => [...prev, userMessage])
    setInputText('')
    setIsLoading(true)

    // Create placeholder untuk bot response
    const botMessageId = Date.now() + 1
    const initialBotMessage = {
      id: botMessageId,
      text: '',
      isBot: true,
      timestamp: new Date(),
      isStreaming: true
    }

    setMessages(prev => [...prev, initialBotMessage])
    setIsStreaming(true)
    setStreamingMessageId(botMessageId)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          message: text,
          chatHistory: messages,
          stream: true
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const reader = response.body?.getReader()
      const decoder = new TextDecoder()
      let accumulatedText = ''

      if (reader) {
        setIsLoading(false) // Loading selesai, streaming dimulai

        while (true) {
          const { done, value } = await reader.read()
          
          if (done) break

          const chunk = decoder.decode(value, { stream: true })
          const lines = chunk.split('\n').filter(line => line.trim())

          for (const line of lines) {
            try {
              const data = JSON.parse(line)
              
              if (data.chunk) {
                accumulatedText += data.chunk
                
                // Update message dengan accumulated text
                setMessages(prev => prev.map(msg => 
                  msg.id === botMessageId 
                    ? { ...msg, text: accumulatedText, isStreaming: true }
                    : msg
                ))
              } else if (data.done) {
                // Streaming selesai
                setMessages(prev => prev.map(msg => 
                  msg.id === botMessageId 
                    ? { ...msg, text: accumulatedText, isStreaming: false }
                    : msg
                ))
                setIsStreaming(false)
                setStreamingMessageId(null)
                return
              } else if (data.error) {
                throw new Error(data.message || 'Streaming error')
              }
            } catch (parseError) {
              console.warn('Failed to parse chunk:', line, parseError)
            }
          }
        }
      }
    } catch (error) {
      console.error('Error:', error)
      
      // Update dengan error message
      setMessages(prev => prev.map(msg => 
        msg.id === botMessageId 
          ? { 
              ...msg, 
              text: "Maaf, terjadi kesalahan saat memproses pesan Anda. Silakan coba lagi nanti.",
              isStreaming: false 
            }
          : msg
      ))
    } finally {
      setIsLoading(false)
      setIsStreaming(false)
      setStreamingMessageId(null)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    sendMessage(inputText)
  }

  const formatTime = (date) => {
    return new Intl.DateTimeFormat('id-ID', {
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)
  }

  // Quick reply buttons
  const quickReplies = [
    "Apa saja layanan yang tersedia?",
    "Berapa biaya pembuatan website?",
    "Bagaimana cara menghubungi Anda?",
    "Lihat portfolio terbaru"
  ]

  const handleQuickReply = (reply) => {
    sendMessage(reply)
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 sm:bottom-6 sm:right-6">
      {/* Chat Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full p-5 shadow-xl transition-all duration-300 hover:scale-110 animate-pulse"
          aria-label="Buka Chat"
        >
          <FiMessageCircle size={28} />
          <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full h-7 w-7 flex items-center justify-center animate-bounce shadow-lg">
            AI
          </span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl w-[420px] h-[650px] flex flex-col border border-gray-200 dark:border-gray-700 max-w-[95vw] max-h-[90vh] sm:max-w-[90vw] sm:max-h-[85vh] md:max-h-[650px] md:w-[420px] lg:w-[480px] lg:h-[700px]">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-5 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <FiCpu size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-base">AI Assistant Frisyk</h3>
                <p className="text-sm opacity-90 flex items-center">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                  Powered by Google Gemini
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/20 rounded-full p-2 transition-colors"
              aria-label="Tutup Chat"
            >
              <FiX size={22} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0 custom-scrollbar">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div className={`flex items-start space-x-3 ${message.isBot ? 'max-w-[95%]' : 'max-w-[85%]'} ${message.isBot ? '' : 'flex-row-reverse space-x-reverse'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.isBot 
                      ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white' 
                      : 'bg-gradient-to-br from-gray-500 to-gray-600 text-white'
                  }`}>
                    {message.isBot ? <FiCpu size={14} /> : <FiUser size={14} />}
                  </div>
                  <div className={`p-4 rounded-2xl shadow-sm ${
                    message.isBot
                      ? 'bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-600'
                      : 'bg-gradient-to-br from-blue-600 to-blue-700 text-white'
                  }`}>
                    {message.isBot ? (
                      <div className="text-sm markdown-content">
                        <MarkdownRenderer 
                          content={message.text || ''} 
                          isDark={isDark}
                        />
                        {message.isStreaming && (
                          <span className="inline-block w-2 h-4 bg-blue-500 animate-pulse ml-1"></span>
                        )}
                      </div>
                    ) : (
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
                    )}
                    <p className={`text-xs mt-2 opacity-70 ${
                      message.isBot 
                        ? 'text-gray-500 dark:text-gray-400' 
                        : 'text-blue-100'
                    }`}>
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Loading/Thinking indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-full flex items-center justify-center flex-shrink-0">
                    <FiCpu size={14} />
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-600">
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">
                        {isStreaming ? 'Typing...' : 'Thinking...'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies */}
          {messages.length === 1 && !isLoading && !isStreaming && (
            <div className="px-4 py-3 dark:bg-gray-750 border-t border-gray-200 dark:border-gray-600 max-h-32 overflow-y-auto custom-scrollbar">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">💡 Pertanyaan cepat:</p>
              <div className="grid grid-cols-1 gap-2">
                {quickReplies.map((reply, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickReply(reply)}
                    className="text-left text-xs bg-white dark:bg-gray-700 hover:bg-blue-50 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 transition-all duration-200 hover:border-blue-300 dark:hover:border-blue-500 hover:shadow-sm break-words"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <div className="flex space-x-3">
              <input
                ref={inputRef}
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ketik pesan Anda..."
                disabled={isLoading || isStreaming}
                className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-sm disabled:opacity-50 transition-all duration-200"
              />
              <button
                type="submit"
                disabled={!inputText.trim() || isLoading || isStreaming}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-400 text-white px-4 py-3 rounded-xl transition-all duration-200 disabled:cursor-not-allowed shadow-sm hover:shadow-md disabled:shadow-none"
                aria-label="Kirim Pesan"
              >
                <FiSend size={18} />
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}

export default GeminiChatBot 