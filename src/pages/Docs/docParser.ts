// src/utils/docParser.ts
import { marked } from 'marked'
import { stripHtml } from 'string-strip-html'

// 1. 定义 doc 数组的类型（TS 类型约束，关键）
export interface DocItem {
  /** 文件名称（不含后缀） */
  name: string
  /** 文件完整路径 */
  path: string
  /** MD 转换后的纯文本内容 */
  content: string
  /** 原始 MD 内容（可选） */
  rawContent?: string
}

// 2. 封装 MD 转纯文本函数（复用）
const mdToPlainText = (mdContent: string): string => {
  try {
    const htmlContent = marked.parse(mdContent) as string
    const { result } = stripHtml(htmlContent)
    return result.replace(/\s+/g, ' ').trim()
  } catch (error) {
    console.error('MD 转纯文本失败：', error)
    return ''
  }
}

// 3. 批量加载并解析 MD 文件，生成 doc 数组
export const docList: DocItem[] = []

// Vite 专属：批量加载 src/assets/docs 下的所有 .md 文件（静态分析）
const mdModules = import.meta.glob('../Docs/*.md', {
  as: 'raw', // 以原始文本加载
  eager: true, // 同步加载（关键：确保导出时已有数据）
})

// 遍历所有 MD 文件，解析并填充 docList
for (const [filePath, rawContent] of Object.entries(mdModules)) {
  // 提取文件名（如 "../assets/docs/guide.md" → "guide"）
  const fileName = filePath.split('/').pop()?.replace('.md', '') || 'unknown'
  // 转换为纯文本内容
  const plainContent = mdToPlainText(rawContent as string)
  // 封装为 DocItem 对象，加入数组
  docList.push({
    name: fileName,
    path: filePath,
    content: plainContent,
    rawContent: rawContent as string, // 可选：保留原始 MD 内容
  })
}

// 4. 导出 doc 数组（默认导出/命名导出均可）
export default docList
