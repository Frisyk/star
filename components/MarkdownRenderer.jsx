import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus, vs } from 'react-syntax-highlighter/dist/esm/styles/prism'
import remarkGfm from 'remark-gfm'
import { FiCopy, FiCheck } from 'react-icons/fi'
import { useState } from 'react'

const MarkdownRenderer = ({ content, isDark = false }) => {
  const [copiedCode, setCopiedCode] = useState(null)

  const copyToClipboard = async (code, language) => {
    try {
      await navigator.clipboard.writeText(code)
      setCopiedCode(`${language}-${Date.now()}`)
      setTimeout(() => setCopiedCode(null), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const components = {
    // Custom code block dengan syntax highlighting
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || '')
      const language = match ? match[1] : 'text'
      const code = String(children).replace(/\n$/, '')
      const copyId = `${language}-${Date.now()}`
      const isCopied = copiedCode === copyId

      if (!inline) {
        return (
          <div className="relative group my-4 overflow-hidden rounded-lg">
            {/* Header dengan language dan copy button */}
            <div className="flex items-center justify-between bg-gray-800 dark:bg-gray-900 text-gray-300 text-xs px-3 py-2 border-b border-gray-700">
              <span className="font-medium truncate">{language}</span>
              <button
                onClick={() => copyToClipboard(code, language)}
                className="flex items-center space-x-1 hover:bg-gray-700 px-2 py-1 rounded transition-colors flex-shrink-0 ml-2"
                title="Copy code"
              >
                {isCopied ? (
                  <>
                    <FiCheck size={12} className="text-green-400" />
                    <span className="text-green-400 text-xs">✓</span>
                  </>
                ) : (
                  <>
                    <FiCopy size={12} />
                    <span className="text-xs">Copy</span>
                  </>
                )}
              </button>
            </div>
            
            {/* Code content */}
            <div className="overflow-x-auto">
              <SyntaxHighlighter
                style={isDark ? vscDarkPlus : vs}
                language={language}
                PreTag="div"
                className="!mt-0 !rounded-none !bg-gray-900 dark:!bg-black"
                showLineNumbers={code.split('\n').length > 3}
                wrapLines={false}
                customStyle={{
                  margin: 0,
                  fontSize: '12px',
                  lineHeight: '1.4',
                  padding: '12px',
                  minWidth: 'max-content'
                }}
                {...props}
              >
                {code}
              </SyntaxHighlighter>
            </div>
          </div>
        )
      } else {
        // Inline code
        return (
          <code 
            className="bg-gray-100 dark:bg-gray-700 text-red-600 dark:text-red-400 px-1 py-0.5 rounded text-xs font-mono break-all"
            {...props}
          >
            {children}
          </code>
        )
      }
    },

    // Custom styling untuk elemen lain
    h1: ({ children }) => (
      <h1 className="text-lg font-bold mb-3 text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2 break-words">
        {children}
      </h1>
    ),
    
    h2: ({ children }) => (
      <h2 className="text-base font-semibold mb-2 text-gray-900 dark:text-white break-words">
        {children}
      </h2>
    ),
    
    h3: ({ children }) => (
      <h3 className="text-sm font-semibold mb-2 text-gray-900 dark:text-white break-words">
        {children}
      </h3>
    ),

    p: ({ children }) => (
      <p className="mb-3 text-gray-800 dark:text-gray-200 leading-relaxed break-words">
        {children}
      </p>
    ),

    ul: ({ children }) => (
      <ul className="mb-3 pl-4 space-y-1 break-words">
        {children}
      </ul>
    ),

    ol: ({ children }) => (
      <ol className="mb-3 pl-4 space-y-1 list-decimal break-words">
        {children}
      </ol>
    ),

    li: ({ children }) => (
      <li className="text-gray-800 dark:text-gray-200 leading-relaxed break-words">
        • {children}
      </li>
    ),

    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-blue-500 pl-4 py-2 mb-3 bg-blue-50 dark:bg-blue-900/20 italic text-gray-700 dark:text-gray-300">
        {children}
      </blockquote>
    ),

    table: ({ children }) => (
      <div className="overflow-x-auto mb-4 rounded-lg border border-gray-200 dark:border-gray-700">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          {children}
        </table>
      </div>
    ),

    thead: ({ children }) => (
      <thead className="bg-gray-50 dark:bg-gray-800">
        {children}
      </thead>
    ),

    th: ({ children }) => (
      <th className="px-3 py-2 text-left text-xs font-semibold text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600 whitespace-nowrap">
        {children}
      </th>
    ),

    td: ({ children }) => (
      <td className="px-3 py-2 text-xs text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-600 whitespace-nowrap">
        {children}
      </td>
    ),

    a: ({ href, children }) => (
      <a 
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline transition-colors"
      >
        {children}
      </a>
    ),

    strong: ({ children }) => (
      <strong className="font-semibold text-gray-900 dark:text-white">
        {children}
      </strong>
    ),

    em: ({ children }) => (
      <em className="italic text-gray-700 dark:text-gray-300">
        {children}
      </em>
    ),

    hr: () => (
      <hr className="my-4 border-gray-300 dark:border-gray-600" />
    )
  }

  return (
    <div className="prose prose-sm max-w-none dark:prose-invert overflow-hidden">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}

export default MarkdownRenderer 