//从本地md文件中提取文本内容并返回
import { marked } from 'marked'
import { stripHtml } from 'string-strip-html'

/**
 * 将 MD 内容转换为纯文本（移除所有 MD 语法）
 * @param mdContent MD 文件原始内容
 * @returns 清理后的纯文本
 */
export const mdToPlainText = (mdContent: string): string => {
  try {
    // 1. 将 MD 解析为 HTML
    const htmlContent = marked.parse(mdContent) as string
    // 2. 从 HTML 中提取纯文本（自动移除标签/实体）
    const { result } = stripHtml(htmlContent)
    // 3. 清理多余空格/换行，优化格式
    const cleanText = result.replace(/\s+/g, ' ').trim()
    return cleanText
  } catch (error) {
    console.error('MD 转纯文本失败：', error)
    return ''
  }
}
