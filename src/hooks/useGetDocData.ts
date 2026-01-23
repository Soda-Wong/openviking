// 请帮我实现一个hooks，没有输入  请将@/assets/docs/目录下的所有md文件 使用remark remark-html shiki 渲染为html字符串 输出为一个数组 数组元素为md文件名和html字符串

import { useEffect, useState } from 'react'
import { remark } from 'remark'
import remarkHtml from 'remark-html'

export type DocHtmlItem = {
  name: string
  html: string
}

type DocsState =
  | {
      loading: true
      error: null
      docs: []
    }
  | {
      loading: false
      error: null
      docs: DocHtmlItem[]
    }
  | {
      loading: false
      error: string
      docs: []
    }

const mdModules = import.meta.glob('../assets/docs/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

const stripFrontmatter = (md: string) => {
  if (!md.startsWith('---')) return md
  const end = md.indexOf('\n---', 3)
  if (end === -1) return md
  const after = md.indexOf('\n', end + 1)
  if (after === -1) return ''
  return md.slice(after + 1)
}

let shikiHighlighterPromise: Promise<{
  codeToHtml: (
    code: string,
    options: { lang?: string; theme?: string },
  ) => string | Promise<string>
}> | null = null

const getShikiHighlighter = async () => {
  if (shikiHighlighterPromise) return shikiHighlighterPromise

  shikiHighlighterPromise = (async () => {
    const shikiModule: unknown = await import('shiki')
    const mod = shikiModule as {
      getHighlighter?: (options: {
        themes: string[]
        langs: string[]
      }) => Promise<{
        codeToHtml: (
          code: string,
          options: { lang?: string; theme?: string },
        ) => string | Promise<string>
      }>
      createHighlighter?: (options: {
        themes: string[]
        langs: string[]
      }) => Promise<{
        codeToHtml: (
          code: string,
          options: { lang?: string; theme?: string },
        ) => string | Promise<string>
      }>
    }

    const factory = mod.getHighlighter ?? mod.createHighlighter
    if (!factory) {
      throw new Error('shiki 高亮器初始化失败')
    }

    return factory({
      themes: ['github-dark', 'github-light'],
      langs: [
        'text',
        'bash',
        'shell',
        'sh',
        'js',
        'ts',
        'jsx',
        'tsx',
        'json',
        'yaml',
        'yml',
        'css',
        'html',
        'md',
        'python',
      ],
    })
  })()

  return shikiHighlighterPromise
}

type MdastNode = {
  type: string
  value?: string
  lang?: string | null
  children?: MdastNode[]
}

const transformCodeBlocksWithShiki = async (tree: MdastNode, theme: string) => {
  const highlighter = await getShikiHighlighter()

  const visit = async (node: MdastNode) => {
    const children = node.children
    if (!children || children.length === 0) return

    for (let index = 0; index < children.length; index += 1) {
      const child = children[index]

      if (child.type === 'code' && typeof child.value === 'string') {
        const lang =
          typeof child.lang === 'string' && child.lang.length > 0
            ? child.lang
            : 'text'
        const codeHtml = await highlighter.codeToHtml(child.value, {
          lang,
          theme,
        })
        children[index] = { type: 'html', value: codeHtml } as MdastNode
        continue
      }

      if (child.children && child.children.length > 0) {
        await visit(child)
      }
    }
  }

  await visit(tree)
}

const renderMarkdownToHtml = async (rawMarkdown: string, theme: string) => {
  const content = stripFrontmatter(rawMarkdown)

  const processor = remark()
    .use(() => async (tree: MdastNode) => {
      try {
        await transformCodeBlocksWithShiki(tree, theme)
      } catch {
        return
      }
    })
    .use(remarkHtml, { sanitize: false })

  const vfile = await processor.process(content)
  return String(vfile)
}

export const useGetDocData = (options?: { theme?: string }) => {
  const theme = options?.theme ?? 'github-dark'

  const [state, setState] = useState<DocsState>({
    loading: true,
    error: null,
    docs: [],
  })

  useEffect(() => {
    let canceled = false
    setState({ loading: true, error: null, docs: [] })
    ;(async () => {
      try {
        const entries = Object.entries(mdModules).sort(([a], [b]) =>
          a.localeCompare(b),
        )

        const renderedDocs = await Promise.all(
          entries.map(async ([filePath, rawMarkdown]) => {
            const fileName =
              filePath.split('/').pop()?.replace('.md', '') || 'unknown'
            try {
              const html = await renderMarkdownToHtml(rawMarkdown, theme)
              return { name: fileName, html } satisfies DocHtmlItem
            } catch {
              const fallback = await remark()
                .use(remarkHtml, { sanitize: false })
                .process(rawMarkdown)
              return {
                name: fileName,
                html: String(fallback),
              } satisfies DocHtmlItem
            }
          }),
        )

        if (canceled) return
        setState({ loading: false, error: null, docs: renderedDocs })
      } catch (error) {
        if (canceled) return
        const message = error instanceof Error ? error.message : '加载文档失败'
        setState({ loading: false, error: message, docs: [] })
      }
    })()

    return () => {
      canceled = true
    }
  }, [theme])

  return state
}

export default useGetDocData
