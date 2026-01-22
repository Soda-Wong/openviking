import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { motion } from 'framer-motion'
import { useState } from 'react'
import {
  ChevronRight,
  Book,
  Database,
  Search,
  Settings,
  Zap,
  Code2,
  FileText,
} from 'lucide-react'
import { docs } from '@/pages/Docs/docInfo'

const DocsPage = () => {
  const [selectedSection, setSelectedSection] = useState(docs[0].children[0])
  const [expandedSections, setExpandedSections] = useState<string[]>([
    'getting-started',
  ])

  const toggleSection = (id: string) => {
    setExpandedSections((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id],
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20">
        <div className="flex">
          {/* Sidebar */}
          <motion.aside
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="w-72 min-h-[calc(100vh-5rem)] border-r border-border/30 bg-card/30 p-6 fixed left-0 top-20 overflow-y-auto"
          >
            <h2 className="text-lg font-semibold mb-6 text-gradient">
              Documentation
            </h2>
            <nav className="space-y-2">
              {docs.map((section) => {
                const Icon = section.icon
                const isExpanded = expandedSections.includes(section.id)
                return (
                  <div key={section.id}>
                    <button
                      onClick={() => toggleSection(section.id)}
                      className="flex items-center gap-2 w-full p-2 rounded-lg hover:bg-muted/50 transition-colors text-left"
                    >
                      <ChevronRight
                        className={`w-4 h-4 text-muted-foreground transition-transform ${
                          isExpanded ? 'rotate-90' : ''
                        }`}
                      />
                      <Icon className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium">
                        {section.title}
                      </span>
                    </button>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        className="ml-6 mt-1 space-y-1"
                      >
                        {section.children.map((child) => (
                          <button
                            key={child.id}
                            onClick={() => setSelectedSection(child)}
                            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                              selectedSection.id === child.id
                                ? 'bg-primary/10 text-primary border-l-2 border-primary'
                                : 'text-muted-foreground hover:text-foreground hover:bg-muted/30'
                            }`}
                          >
                            {child.title}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </div>
                )
              })}
            </nav>
          </motion.aside>

          {/* Content */}
          <main className="flex-1 ml-72 p-8 max-w-4xl">
            <motion.article
              key={selectedSection.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="prose prose-invert max-w-none"
            >
              <div className="bg-card/30 rounded-2xl border border-border/30 p-8">
                <pre className="whitespace-pre-wrap font-sans text-foreground leading-relaxed">
                  {selectedSection.content.split('\n').map((line, i) => {
                    if (line.startsWith('# ')) {
                      return (
                        <h1
                          key={i}
                          className="text-3xl font-bold text-gradient mb-6"
                        >
                          {line.slice(2)}
                        </h1>
                      )
                    }
                    if (line.startsWith('## ')) {
                      return (
                        <h2
                          key={i}
                          className="text-xl font-semibold mt-8 mb-4 text-foreground"
                        >
                          {line.slice(3)}
                        </h2>
                      )
                    }
                    if (line.startsWith('### ')) {
                      return (
                        <h3
                          key={i}
                          className="text-lg font-medium mt-6 mb-3 text-foreground"
                        >
                          {line.slice(4)}
                        </h3>
                      )
                    }
                    if (line.startsWith('```')) {
                      return null
                    }
                    if (line.startsWith('|')) {
                      return (
                        <code
                          key={i}
                          className="block text-sm font-mono text-muted-foreground bg-muted/30 px-2 rounded"
                        >
                          {line}
                        </code>
                      )
                    }
                    if (
                      line.trim().startsWith('-') ||
                      line.trim().match(/^\d+\./)
                    ) {
                      return (
                        <li key={i} className="text-muted-foreground ml-4">
                          {line
                            .replace(/^[-\d.]+\s*\*\*/, '')
                            .replace(/\*\*/g, '')}
                        </li>
                      )
                    }
                    if (line.includes('`') && !line.startsWith('```')) {
                      const parts = line.split(/(`[^`]+`)/g)
                      return (
                        <p key={i} className="text-muted-foreground mb-2">
                          {parts.map((part, j) =>
                            part.startsWith('`') ? (
                              <code
                                key={j}
                                className="bg-muted/50 px-1.5 py-0.5 rounded text-primary font-mono text-sm"
                              >
                                {part.slice(1, -1)}
                              </code>
                            ) : (
                              part
                            ),
                          )}
                        </p>
                      )
                    }
                    if (line.trim() === '') return <br key={i} />
                    return (
                      <p key={i} className="text-muted-foreground mb-2">
                        {line}
                      </p>
                    )
                  })}
                </pre>
              </div>
            </motion.article>
          </main>
        </div>
      </div>
    </div>
  )
}

export default DocsPage
