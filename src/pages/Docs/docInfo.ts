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
// import { docList } from '@/pages/Docs/docParser'

interface DocSection {
  id: string
  title: string
  icon: React.ElementType
  children: { id: string; title: string; content: string }[]
}
//导出文档目录结构
export const docs: DocSection[] = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    icon: Zap,
    children: [
      {
        id: 'installation',
        title: 'Installation',
        content: `# Installation

Install OpenViking using pip:

\`\`\`bash
pip install openviking
\`\`\`

## Requirements
- Python 3.8+
- pip 21.0+

## Quick Setup

\`\`\`python
from openviking import OpenViking

# Initialize the client
ov = OpenViking()

# Start using OpenViking
ov.init()
\`\`\`

That's it! You're ready to start managing your AI agent context.`,
      },
      {
        id: 'quickstart',
        title: 'Quick Start Guide',
        content: `
      <h1>OpenViking 调用指南</h1>
<blockquote>
<p>本文档是 OpenViking Python 包的使用指南，帮助你快速上手 API 调用。</p>
<p>前置阅读：<a href="./openviking-deployment.md">部署接入文档</a> | 深入了解：<a href="./openviking-architecture.md">整体架构</a></p>
</blockquote>
<hr>
<h2>目录</h2>
<ol>
<li><a href="#%E5%BF%AB%E9%80%9F%E5%BC%80%E5%A7%8B">快速开始</a></li>
<li><a href="#%E8%B5%84%E6%BA%90%E7%AE%A1%E7%90%86">资源管理</a></li>
<li><a href="#%E6%8A%80%E8%83%BD%E7%AE%A1%E7%90%86">技能管理</a></li>
<li><a href="#%E6%95%B0%E6%8D%AE%E4%BA%A4%E6%8D%A2">数据交换</a></li>
<li><a href="#%E4%BC%9A%E8%AF%9D%E4%B8%8E%E6%A3%80%E7%B4%A2">会话与检索</a></li>
<li><a href="#%E4%B8%8A%E4%B8%8B%E6%96%87%E8%AF%BB%E5%8F%96">上下文读取</a></li>
<li><a href="#%E4%BC%9A%E8%AF%9D%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F">会话生命周期</a></li>
<li><a href="#%E9%85%8D%E7%BD%AE%E5%8F%82%E8%80%83">配置参考</a></li>
</ol>
<hr>
<h2>快速开始</h2>
<h3>基础配置</h3>
<p>推荐使用 JSON 配置文件进行初始化配置，简化环境变量管理：</p>
<div><!--beforebegin--><div class="v-md-pre-wrapper copy-code-mode v-md-pre-wrapper-bash extra-class" extra-attr=""><!--afterbegin--><pre class="v-md-prism-bash"><code><span class="token comment"># 设置配置文件路径，请复制 ov.conf.example 到 ov.conf 并配置好你的 API 密钥等信息。</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">OPENVIKING_CONFIG_FILE</span><span class="token operator">=</span>examples/ov.conf

<span class="token comment"># 然后参照下一步初始化客户端，或者直接启动你基于 OpenViking 开发的应用程序</span>
</code></pre>

    <button class="v-md-copy-code-btn" type="button">
      <i>
        <svg viewBox="64 64 896 896" focusable="false" data-icon="copy" width="1em" height="1em" fill="currentColor" aria-hidden="true">
          <path d="M832 64H296c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h496v688c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V96c0-17.7-14.3-32-32-32zM704 192H192c-17.7 0-32 14.3-32 32v530.7c0 8.5 3.4 16.6 9.4 22.6l173.3 173.3c2.2 2.2 4.7 4 7.4 5.5v1.9h4.2c3.5 1.3 7.2 2 11 2H704c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32zM350 856.2L263.9 770H350v86.2zM664 888H414V746c0-22.1-17.9-40-40-40H232V264h432v624z"></path>
        </svg>
      </i>
    </button><!--beforeend--></div><!--afterend--></div><p>配置文件示例见 <code>examples/ov.conf.example</code>。</p>
<h3>初始化客户端</h3>
<p>OpenViking 提供异步和同步两种客户端：</p>
<div><!--beforebegin--><div class="v-md-pre-wrapper copy-code-mode v-md-pre-wrapper-python extra-class" extra-attr=""><!--afterbegin--><pre class="v-md-prism-python"><code><span class="token keyword">from</span> openviking <span class="token keyword">import</span> SyncOpenViking<span class="token punctuation">,</span> AsyncOpenViking

<span class="token comment"># 异步客户端（推荐，默认）</span>
client <span class="token operator">=</span> AsyncOpenViking<span class="token punctuation">(</span>path<span class="token operator">=</span><span class="token string">"./data"</span><span class="token punctuation">)</span>  <span class="token comment"># OpenViking 是 AsyncOpenViking 的别名</span>
<span class="token keyword">await</span> client<span class="token punctuation">.</span>initialize<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment"># 同步客户端（阻塞式调用）</span>
client <span class="token operator">=</span> SyncOpenViking<span class="token punctuation">(</span>path<span class="token operator">=</span><span class="token string">"./data"</span><span class="token punctuation">)</span>
client<span class="token punctuation">.</span>initialize<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre>

    <button class="v-md-copy-code-btn" type="button">
      <i>
        <svg viewBox="64 64 896 896" focusable="false" data-icon="copy" width="1em" height="1em" fill="currentColor" aria-hidden="true">
          <path d="M832 64H296c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h496v688c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V96c0-17.7-14.3-32-32-32zM704 192H192c-17.7 0-32 14.3-32 32v530.7c0 8.5 3.4 16.6 9.4 22.6l173.3 173.3c2.2 2.2 4.7 4 7.4 5.5v1.9h4.2c3.5 1.3 7.2 2 11 2H704c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32zM350 856.2L263.9 770H350v86.2zM664 888H414V746c0-22.1-17.9-40-40-40H232V264h432v624z"></path>
        </svg>
      </i>
    </button><!--beforeend--></div><!--afterend--></div><h3>关闭客户端</h3>
<div><!--beforebegin--><div class="v-md-pre-wrapper copy-code-mode v-md-pre-wrapper-python extra-class" extra-attr=""><!--afterbegin--><pre class="v-md-prism-python"><code>client<span class="token punctuation">.</span>close<span class="token punctuation">(</span><span class="token punctuation">)</span>  <span class="token comment"># 释放资源（嵌入式模式会停止 AGFS）</span>
</code></pre>

    <button class="v-md-copy-code-btn" type="button">
      <i>
        <svg viewBox="64 64 896 896" focusable="false" data-icon="copy" width="1em" height="1em" fill="currentColor" aria-hidden="true">
          <path d="M832 64H296c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h496v688c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V96c0-17.7-14.3-32-32-32zM704 192H192c-17.7 0-32 14.3-32 32v530.7c0 8.5 3.4 16.6 9.4 22.6l173.3 173.3c2.2 2.2 4.7 4 7.4 5.5v1.9h4.2c3.5 1.3 7.2 2 11 2H704c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32zM350 856.2L263.9 770H350v86.2zM664 888H414V746c0-22.1-17.9-40-40-40H232V264h432v624z"></path>
        </svg>
      </i>
    </button><!--beforeend--></div><!--afterend--></div><hr>
<h2>资源管理</h2>
<h3>添加资源</h3>
<div><!--beforebegin--><div class="v-md-pre-wrapper copy-code-mode v-md-pre-wrapper-python extra-class" extra-attr=""><!--afterbegin--><pre class="v-md-prism-python"><code>result <span class="token operator">=</span> <span class="token keyword">await</span> client<span class="token punctuation">.</span>add_resource<span class="token punctuation">(</span>
    data<span class="token operator">=</span><span class="token string">"./document.pdf"</span><span class="token punctuation">,</span>  <span class="token comment"># 文件路径、URL 或内容</span>
    reason<span class="token operator">=</span><span class="token string">"项目参考文档"</span><span class="token punctuation">,</span>    <span class="token comment"># 添加原因</span>
    instruction<span class="token operator">=</span><span class="token string">"用于架构设计参考"</span><span class="token punctuation">,</span> <span class="token comment"># 使用指令</span>
<span class="token punctuation">)</span>

<span class="token comment"># 返回值</span>
<span class="token comment"># {"status": "success", "resource": "viking://resources/..."}</span>
</code></pre>

    <button class="v-md-copy-code-btn" type="button">
      <i>
        <svg viewBox="64 64 896 896" focusable="false" data-icon="copy" width="1em" height="1em" fill="currentColor" aria-hidden="true">
          <path d="M832 64H296c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h496v688c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V96c0-17.7-14.3-32-32-32zM704 192H192c-17.7 0-32 14.3-32 32v530.7c0 8.5 3.4 16.6 9.4 22.6l173.3 173.3c2.2 2.2 4.7 4 7.4 5.5v1.9h4.2c3.5 1.3 7.2 2 11 2H704c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32zM350 856.2L263.9 770H350v86.2zM664 888H414V746c0-22.1-17.9-40-40-40H232V264h432v624z"></path>
        </svg>
      </i>
    </button><!--beforeend--></div><!--afterend--></div><p><strong>支持的输入类型</strong>：</p>
<ul>
<li>文件路径：<code>"./doc.pdf"</code>, <code>"/Users/YourName/docs/introduction.md"</code></li>
<li>URL：<code>"https://example.com/doc.pdf"</code></li>
<li>字符串内容：直接传入文本内容</li>
</ul>
<hr>
<h2>技能管理</h2>
<h3>添加技能</h3>
<div><!--beforebegin--><div class="v-md-pre-wrapper copy-code-mode v-md-pre-wrapper-python extra-class" extra-attr=""><!--afterbegin--><pre class="v-md-prism-python"><code><span class="token comment"># 1. 从文件夹添加（推荐）</span>
result <span class="token operator">=</span> <span class="token keyword">await</span> client<span class="token punctuation">.</span>add_skill<span class="token punctuation">(</span>Path<span class="token punctuation">(</span><span class="token string">"./skills/pdf"</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token comment"># 2. 从单个文件添加</span>
result <span class="token operator">=</span> <span class="token keyword">await</span> client<span class="token punctuation">.</span>add_skill<span class="token punctuation">(</span>Path<span class="token punctuation">(</span><span class="token string">"./my-skill.md"</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token comment"># 3. 从 MCP Tool 添加</span>
mcp_tool <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token string">"name"</span><span class="token punctuation">:</span> <span class="token string">"search_files"</span><span class="token punctuation">,</span>
    <span class="token string">"description"</span><span class="token punctuation">:</span> <span class="token string">"Search files by pattern"</span><span class="token punctuation">,</span>
    <span class="token string">"inputSchema"</span><span class="token punctuation">:</span> <span class="token punctuation">{</span>
        <span class="token string">"type"</span><span class="token punctuation">:</span> <span class="token string">"object"</span><span class="token punctuation">,</span>
        <span class="token string">"properties"</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token string">"pattern"</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token string">"type"</span><span class="token punctuation">:</span> <span class="token string">"string"</span><span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token string">"required"</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">"pattern"</span><span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
result <span class="token operator">=</span> <span class="token keyword">await</span> client<span class="token punctuation">.</span>add_skill<span class="token punctuation">(</span>mcp_tool<span class="token punctuation">)</span>

<span class="token comment"># 4. 从字符串添加</span>
skill_md <span class="token operator">=</span> <span class="token triple-quoted-string string">"""---
name: hello
description: Say hello
---
# Hello Skill
"""</span>
result <span class="token operator">=</span> <span class="token keyword">await</span> client<span class="token punctuation">.</span>add_skill<span class="token punctuation">(</span>skill_md<span class="token punctuation">)</span>

<span class="token comment"># 返回值</span>
<span class="token comment"># {"status": "success", "skill": "viking://agent/skills/pdf", "name": "pdf"}</span>
</code></pre>

    <button class="v-md-copy-code-btn" type="button">
      <i>
        <svg viewBox="64 64 896 896" focusable="false" data-icon="copy" width="1em" height="1em" fill="currentColor" aria-hidden="true">
          <path d="M832 64H296c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h496v688c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V96c0-17.7-14.3-32-32-32zM704 192H192c-17.7 0-32 14.3-32 32v530.7c0 8.5 3.4 16.6 9.4 22.6l173.3 173.3c2.2 2.2 4.7 4 7.4 5.5v1.9h4.2c3.5 1.3 7.2 2 11 2H704c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32zM350 856.2L263.9 770H350v86.2zM664 888H414V746c0-22.1-17.9-40-40-40H232V264h432v624z"></path>
        </svg>
      </i>
    </button><!--beforeend--></div><!--afterend--></div><p><strong>SKILL.md 格式</strong>：</p>
<div><!--beforebegin--><div class="v-md-pre-wrapper copy-code-mode v-md-pre-wrapper-yaml extra-class" extra-attr=""><!--afterbegin--><pre class="v-md-prism-yaml"><code><span class="token punctuation">---</span>
<span class="token key atrule">name</span><span class="token punctuation">:</span> skill<span class="token punctuation">-</span>name
<span class="token key atrule">description</span><span class="token punctuation">:</span> <span class="token string">"技能描述"</span>
<span class="token key atrule">allowed-tools</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>Read<span class="token punctuation">,</span> Grep<span class="token punctuation">]</span>
<span class="token key atrule">tags</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>tag1<span class="token punctuation">,</span> tag2<span class="token punctuation">]</span>
<span class="token punctuation">---</span>

<span class="token comment"># 技能内容（Markdown）</span>
</code></pre>

    <button class="v-md-copy-code-btn" type="button">
      <i>
        <svg viewBox="64 64 896 896" focusable="false" data-icon="copy" width="1em" height="1em" fill="currentColor" aria-hidden="true">
          <path d="M832 64H296c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h496v688c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V96c0-17.7-14.3-32-32-32zM704 192H192c-17.7 0-32 14.3-32 32v530.7c0 8.5 3.4 16.6 9.4 22.6l173.3 173.3c2.2 2.2 4.7 4 7.4 5.5v1.9h4.2c3.5 1.3 7.2 2 11 2H704c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32zM350 856.2L263.9 770H350v86.2zM664 888H414V746c0-22.1-17.9-40-40-40H232V264h432v624z"></path>
        </svg>
      </i>
    </button><!--beforeend--></div><!--afterend--></div><hr>
<h2>数据交换</h2>
<p>OpenViking 支持通过 <code>.ovpack</code> 格式进行数据导入导出，便于跨系统迁移和备份。</p>
<p>详细规范参见：<a href="./openviking-context-pack-format.md">上下文数据交换协议</a></p>
<h3>导出数据</h3>
<div><!--beforebegin--><div class="v-md-pre-wrapper copy-code-mode v-md-pre-wrapper-python extra-class" extra-attr=""><!--afterbegin--><pre class="v-md-prism-python"><code><span class="token comment"># 将指定路径导出为 .ovpack 文件</span>
output_path <span class="token operator">=</span> <span class="token keyword">await</span> client<span class="token punctuation">.</span>export_ovpack<span class="token punctuation">(</span>
    uri<span class="token operator">=</span><span class="token string">"viking://resources/ProjectSpec"</span><span class="token punctuation">,</span>
    to<span class="token operator">=</span><span class="token string">"/tmp/ProjectSpec.ovpack"</span>
<span class="token punctuation">)</span>
</code></pre>

    <button class="v-md-copy-code-btn" type="button">
      <i>
        <svg viewBox="64 64 896 896" focusable="false" data-icon="copy" width="1em" height="1em" fill="currentColor" aria-hidden="true">
          <path d="M832 64H296c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h496v688c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V96c0-17.7-14.3-32-32-32zM704 192H192c-17.7 0-32 14.3-32 32v530.7c0 8.5 3.4 16.6 9.4 22.6l173.3 173.3c2.2 2.2 4.7 4 7.4 5.5v1.9h4.2c3.5 1.3 7.2 2 11 2H704c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32zM350 856.2L263.9 770H350v86.2zM664 888H414V746c0-22.1-17.9-40-40-40H232V264h432v624z"></path>
        </svg>
      </i>
    </button><!--beforeend--></div><!--afterend--></div><h3>导入数据</h3>
<div><!--beforebegin--><div class="v-md-pre-wrapper copy-code-mode v-md-pre-wrapper-python extra-class" extra-attr=""><!--afterbegin--><pre class="v-md-prism-python"><code><span class="token comment"># 导入 .ovpack 文件到指定位置（短名称）</span>
root_uri <span class="token operator">=</span> <span class="token keyword">await</span> client<span class="token punctuation">.</span>import_ovpack<span class="token punctuation">(</span>
    file_path<span class="token operator">=</span><span class="token string">"./ProjectSpec.ovpack"</span><span class="token punctuation">,</span>
    target<span class="token operator">=</span><span class="token string">"my_project"</span>
<span class="token punctuation">)</span>

<span class="token comment"># 导入 .ovpack 文件到指定位置（完整 URI）</span>
root_uri <span class="token operator">=</span> <span class="token keyword">await</span> client<span class="token punctuation">.</span>import_ovpack<span class="token punctuation">(</span>
    file_path<span class="token operator">=</span><span class="token string">"./ProjectSpec.ovpack"</span><span class="token punctuation">,</span>
    target<span class="token operator">=</span><span class="token string">"viking://resources/my_project"</span>
<span class="token punctuation">)</span>

<span class="token comment"># 强制覆盖已存在的资源</span>
root_uri <span class="token operator">=</span> <span class="token keyword">await</span> client<span class="token punctuation">.</span>import_ovpack<span class="token punctuation">(</span>
    file_path<span class="token operator">=</span><span class="token string">"./ProjectSpec.ovpack"</span><span class="token punctuation">,</span>
    target<span class="token operator">=</span><span class="token string">"viking://resources/my_project"</span><span class="token punctuation">,</span>
    force<span class="token operator">=</span><span class="token boolean">True</span>
<span class="token punctuation">)</span>
</code></pre>

    <button class="v-md-copy-code-btn" type="button">
      <i>
        <svg viewBox="64 64 896 896" focusable="false" data-icon="copy" width="1em" height="1em" fill="currentColor" aria-hidden="true">
          <path d="M832 64H296c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h496v688c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V96c0-17.7-14.3-32-32-32zM704 192H192c-17.7 0-32 14.3-32 32v530.7c0 8.5 3.4 16.6 9.4 22.6l173.3 173.3c2.2 2.2 4.7 4 7.4 5.5v1.9h4.2c3.5 1.3 7.2 2 11 2H704c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32zM350 856.2L263.9 770H350v86.2zM664 888H414V746c0-22.1-17.9-40-40-40H232V264h432v624z"></path>
        </svg>
      </i>
    </button><!--beforeend--></div><!--afterend--></div><hr>
<h2>会话与检索</h2>
<h3>创建会话</h3>
<div><!--beforebegin--><div class="v-md-pre-wrapper copy-code-mode v-md-pre-wrapper-python extra-class" extra-attr=""><!--afterbegin--><pre class="v-md-prism-python"><code>session <span class="token operator">=</span> client<span class="token punctuation">.</span>session<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token comment"># session.session_id 获取会话 ID</span>

<span class="token comment"># 加载已有会话</span>
existing_session <span class="token operator">=</span> client<span class="token punctuation">.</span>session<span class="token punctuation">(</span>session_id<span class="token operator">=</span><span class="token string">"existing-id"</span><span class="token punctuation">)</span>
<span class="token keyword">await</span> existing_session<span class="token punctuation">.</span>load<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre>

    <button class="v-md-copy-code-btn" type="button">
      <i>
        <svg viewBox="64 64 896 896" focusable="false" data-icon="copy" width="1em" height="1em" fill="currentColor" aria-hidden="true">
          <path d="M832 64H296c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h496v688c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V96c0-17.7-14.3-32-32-32zM704 192H192c-17.7 0-32 14.3-32 32v530.7c0 8.5 3.4 16.6 9.4 22.6l173.3 173.3c2.2 2.2 4.7 4 7.4 5.5v1.9h4.2c3.5 1.3 7.2 2 11 2H704c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32zM350 856.2L263.9 770H350v86.2zM664 888H414V746c0-22.1-17.9-40-40-40H232V264h432v624z"></path>
        </svg>
      </i>
    </button><!--beforeend--></div><!--afterend--></div><h3>复杂检索 - client.search()</h3>
<p><code>search()</code> 用于执行复杂检索，支持意图分析和层级检索：</p>
<div><!--beforebegin--><div class="v-md-pre-wrapper copy-code-mode v-md-pre-wrapper-python extra-class" extra-attr=""><!--afterbegin--><pre class="v-md-prism-python"><code><span class="token comment"># 基本用法</span>
result <span class="token operator">=</span> <span class="token keyword">await</span> client<span class="token punctuation">.</span>search<span class="token punctuation">(</span><span class="token string">"项目架构设计"</span><span class="token punctuation">,</span> limit<span class="token operator">=</span><span class="token number">3</span><span class="token punctuation">)</span>

<span class="token comment"># 带过滤的用法</span>
result <span class="token operator">=</span> <span class="token keyword">await</span> client<span class="token punctuation">.</span>search<span class="token punctuation">(</span>
    <span class="token string">"项目架构设计"</span><span class="token punctuation">,</span>
    <span class="token builtin">filter</span><span class="token operator">=</span><span class="token punctuation">{</span><span class="token string">"created_at"</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token string">"$gte"</span><span class="token punctuation">:</span> <span class="token string">"2024-01-01"</span><span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
    limit<span class="token operator">=</span><span class="token number">5</span>
<span class="token punctuation">)</span>

<span class="token comment"># 访问检索结果</span>
<span class="token keyword">for</span> resource <span class="token keyword">in</span> result<span class="token punctuation">.</span>resources<span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f"URI: </span><span class="token interpolation"><span class="token punctuation">{</span>resource<span class="token punctuation">.</span>uri<span class="token punctuation">}</span></span><span class="token string">"</span></span><span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f"摘要: </span><span class="token interpolation"><span class="token punctuation">{</span>resource<span class="token punctuation">.</span>abstract<span class="token punctuation">}</span></span><span class="token string">"</span></span><span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f"得分: </span><span class="token interpolation"><span class="token punctuation">{</span>resource<span class="token punctuation">.</span>score<span class="token punctuation">}</span></span><span class="token string">"</span></span><span class="token punctuation">)</span>

<span class="token keyword">for</span> skill <span class="token keyword">in</span> result<span class="token punctuation">.</span>skills<span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f"技能: </span><span class="token interpolation"><span class="token punctuation">{</span>skill<span class="token punctuation">.</span>uri<span class="token punctuation">}</span></span><span class="token string">"</span></span><span class="token punctuation">)</span>

<span class="token keyword">for</span> memory <span class="token keyword">in</span> result<span class="token punctuation">.</span>memories<span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f"记忆: </span><span class="token interpolation"><span class="token punctuation">{</span>memory<span class="token punctuation">.</span>uri<span class="token punctuation">}</span></span><span class="token string">"</span></span><span class="token punctuation">)</span>
</code></pre>

    <button class="v-md-copy-code-btn" type="button">
      <i>
        <svg viewBox="64 64 896 896" focusable="false" data-icon="copy" width="1em" height="1em" fill="currentColor" aria-hidden="true">
          <path d="M832 64H296c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h496v688c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V96c0-17.7-14.3-32-32-32zM704 192H192c-17.7 0-32 14.3-32 32v530.7c0 8.5 3.4 16.6 9.4 22.6l173.3 173.3c2.2 2.2 4.7 4 7.4 5.5v1.9h4.2c3.5 1.3 7.2 2 11 2H704c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32zM350 856.2L263.9 770H350v86.2zM664 888H414V746c0-22.1-17.9-40-40-40H232V264h432v624z"></path>
        </svg>
      </i>
    </button><!--beforeend--></div><!--afterend--></div><p><strong>FindResult 结构</strong>：</p>
<table>
<thead>
<tr>
<th>属性</th>
<th>类型</th>
<th>说明</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>memories</code></td>
<td>List</td>
<td>匹配的记忆列表</td>
</tr>
<tr>
<td><code>resources</code></td>
<td>List</td>
<td>匹配的资源列表</td>
</tr>
<tr>
<td><code>skills</code></td>
<td>List</td>
<td>匹配的技能列表</td>
</tr>
<tr>
<td><code>total</code></td>
<td>int</td>
<td>总结果数</td>
</tr>
</tbody>
</table>
<h3>记录使用</h3>
<p>检索返回的是<strong>候选</strong>上下文，实际使用时需记录：</p>
<div><!--beforebegin--><div class="v-md-pre-wrapper copy-code-mode v-md-pre-wrapper-python extra-class" extra-attr=""><!--afterbegin--><pre class="v-md-prism-python"><code><span class="token comment"># 记录使用的上下文</span>
session<span class="token punctuation">.</span>used<span class="token punctuation">(</span>contexts<span class="token operator">=</span><span class="token punctuation">[</span><span class="token string">"viking://resources/my_project/doc"</span><span class="token punctuation">]</span><span class="token punctuation">)</span>

<span class="token comment"># 记录技能使用</span>
session<span class="token punctuation">.</span>used<span class="token punctuation">(</span>skill<span class="token operator">=</span><span class="token punctuation">{</span>
    <span class="token string">"uri"</span><span class="token punctuation">:</span> <span class="token string">"viking://agent/planner/skills/code-search"</span><span class="token punctuation">,</span>
    <span class="token string">"input"</span><span class="token punctuation">:</span> <span class="token string">"搜索 React 组件"</span><span class="token punctuation">,</span>
    <span class="token string">"output"</span><span class="token punctuation">:</span> <span class="token string">"找到 3 个文件"</span><span class="token punctuation">,</span>
    <span class="token string">"success"</span><span class="token punctuation">:</span> <span class="token boolean">True</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre>

    <button class="v-md-copy-code-btn" type="button">
      <i>
        <svg viewBox="64 64 896 896" focusable="false" data-icon="copy" width="1em" height="1em" fill="currentColor" aria-hidden="true">
          <path d="M832 64H296c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h496v688c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V96c0-17.7-14.3-32-32-32zM704 192H192c-17.7 0-32 14.3-32 32v530.7c0 8.5 3.4 16.6 9.4 22.6l173.3 173.3c2.2 2.2 4.7 4 7.4 5.5v1.9h4.2c3.5 1.3 7.2 2 11 2H704c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32zM350 856.2L263.9 770H350v86.2zM664 888H414V746c0-22.1-17.9-40-40-40H232V264h432v624z"></path>
        </svg>
      </i>
    </button><!--beforeend--></div><!--afterend--></div><hr>
<h2>上下文读取</h2>
<h3>核心 API</h3>
<div><!--beforebegin--><div class="v-md-pre-wrapper copy-code-mode v-md-pre-wrapper-python extra-class" extra-attr=""><!--afterbegin--><pre class="v-md-prism-python"><code><span class="token comment"># 读取 L0/L1/L2 内容</span>
abstract <span class="token operator">=</span> <span class="token keyword">await</span> client<span class="token punctuation">.</span>abstract<span class="token punctuation">(</span>uri<span class="token punctuation">)</span>      <span class="token comment"># L0 摘要</span>
overview <span class="token operator">=</span> <span class="token keyword">await</span> client<span class="token punctuation">.</span>overview<span class="token punctuation">(</span>uri<span class="token punctuation">)</span>      <span class="token comment"># L1 概览</span>
content <span class="token operator">=</span> <span class="token keyword">await</span> client<span class="token punctuation">.</span>read<span class="token punctuation">(</span>uri<span class="token punctuation">)</span>           <span class="token comment"># L2 内容</span>

<span class="token comment"># 获取关联列表</span>
relations <span class="token operator">=</span> <span class="token keyword">await</span> client<span class="token punctuation">.</span>relations<span class="token punctuation">(</span>uri<span class="token punctuation">)</span>    <span class="token comment"># [{"uri": "...", "reason": "..."}]</span>

<span class="token comment"># 列出目录</span>
items <span class="token operator">=</span> <span class="token keyword">await</span> client<span class="token punctuation">.</span>ls<span class="token punctuation">(</span>uri<span class="token punctuation">)</span>
</code></pre>

    <button class="v-md-copy-code-btn" type="button">
      <i>
        <svg viewBox="64 64 896 896" focusable="false" data-icon="copy" width="1em" height="1em" fill="currentColor" aria-hidden="true">
          <path d="M832 64H296c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h496v688c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V96c0-17.7-14.3-32-32-32zM704 192H192c-17.7 0-32 14.3-32 32v530.7c0 8.5 3.4 16.6 9.4 22.6l173.3 173.3c2.2 2.2 4.7 4 7.4 5.5v1.9h4.2c3.5 1.3 7.2 2 11 2H704c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32zM350 856.2L263.9 770H350v86.2zM664 888H414V746c0-22.1-17.9-40-40-40H232V264h432v624z"></path>
        </svg>
      </i>
    </button><!--beforeend--></div><!--afterend--></div><h3>完整工作流：检索 → 读取 → 使用记录</h3>
<div><!--beforebegin--><div class="v-md-pre-wrapper copy-code-mode v-md-pre-wrapper-python extra-class" extra-attr=""><!--afterbegin--><pre class="v-md-prism-python"><code><span class="token comment"># 1. 智能检索</span>
result <span class="token operator">=</span> <span class="token keyword">await</span> client<span class="token punctuation">.</span>search<span class="token punctuation">(</span><span class="token string">"如何处理PDF文件？"</span><span class="token punctuation">,</span> limit<span class="token operator">=</span><span class="token number">3</span><span class="token punctuation">)</span>

<span class="token comment"># 2. 处理检索结果</span>
used_uris <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>

<span class="token keyword">if</span> result<span class="token punctuation">.</span>skills<span class="token punctuation">:</span>
    skill <span class="token operator">=</span> result<span class="token punctuation">.</span>skills<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f"找到技能: </span><span class="token interpolation"><span class="token punctuation">{</span>skill<span class="token punctuation">.</span>abstract<span class="token punctuation">}</span></span><span class="token string">"</span></span><span class="token punctuation">)</span>

    <span class="token comment"># 读取完整内容</span>
    skill_content <span class="token operator">=</span> <span class="token keyword">await</span> client<span class="token punctuation">.</span>read<span class="token punctuation">(</span>skill<span class="token punctuation">.</span>uri<span class="token punctuation">)</span>
    used_uris<span class="token punctuation">.</span>append<span class="token punctuation">(</span>skill<span class="token punctuation">.</span>uri<span class="token punctuation">)</span>

<span class="token keyword">if</span> result<span class="token punctuation">.</span>resources<span class="token punctuation">:</span>
    resource <span class="token operator">=</span> result<span class="token punctuation">.</span>resources<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span>

    <span class="token comment"># L0: 先看摘要（~100 tokens）</span>
    abstract <span class="token operator">=</span> <span class="token keyword">await</span> client<span class="token punctuation">.</span>abstract<span class="token punctuation">(</span>resource<span class="token punctuation">.</span>uri<span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f"摘要: </span><span class="token interpolation"><span class="token punctuation">{</span>abstract<span class="token punctuation">}</span></span><span class="token string">"</span></span><span class="token punctuation">)</span>

    <span class="token comment"># L1: 需要更多信息，读概览（~2k tokens）</span>
    overview <span class="token operator">=</span> <span class="token keyword">await</span> client<span class="token punctuation">.</span>overview<span class="token punctuation">(</span>resource<span class="token punctuation">.</span>uri<span class="token punctuation">)</span>

    <span class="token comment"># L2: 读取完整内容（可选）</span>
    <span class="token keyword">if</span> <span class="token string">"PDF"</span> <span class="token keyword">in</span> abstract<span class="token punctuation">:</span>
        content <span class="token operator">=</span> <span class="token keyword">await</span> client<span class="token punctuation">.</span>read<span class="token punctuation">(</span>resource<span class="token punctuation">.</span>uri<span class="token punctuation">)</span><span class="token punctuation">.</span>head<span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span>
        used_uris<span class="token punctuation">.</span>append<span class="token punctuation">(</span>resource<span class="token punctuation">.</span>uri<span class="token punctuation">)</span>

<span class="token comment"># 3. 记录真正使用的上下文</span>
session<span class="token punctuation">.</span>used<span class="token punctuation">(</span>contexts<span class="token operator">=</span>used_uris<span class="token punctuation">)</span>

<span class="token comment"># 4. 添加对话</span>
session<span class="token punctuation">.</span>add<span class="token punctuation">(</span>
    user_msg<span class="token operator">=</span><span class="token string">"如何处理PDF文件？"</span><span class="token punctuation">,</span>
    assistant_msg<span class="token operator">=</span><span class="token string">"可以使用 PDF 技能..."</span>
<span class="token punctuation">)</span>

<span class="token comment"># 5. 提交会话</span>
<span class="token keyword">await</span> session<span class="token punctuation">.</span>commit<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre>

    <button class="v-md-copy-code-btn" type="button">
      <i>
        <svg viewBox="64 64 896 896" focusable="false" data-icon="copy" width="1em" height="1em" fill="currentColor" aria-hidden="true">
          <path d="M832 64H296c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h496v688c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V96c0-17.7-14.3-32-32-32zM704 192H192c-17.7 0-32 14.3-32 32v530.7c0 8.5 3.4 16.6 9.4 22.6l173.3 173.3c2.2 2.2 4.7 4 7.4 5.5v1.9h4.2c3.5 1.3 7.2 2 11 2H704c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32zM350 856.2L263.9 770H350v86.2zM664 888H414V746c0-22.1-17.9-40-40-40H232V264h432v624z"></path>
        </svg>
      </i>
    </button><!--beforeend--></div><!--afterend--></div><h3>读取方法详解</h3>
<h4>分层读取（L0/L1/L2）</h4>
<div><!--beforebegin--><div class="v-md-pre-wrapper copy-code-mode v-md-pre-wrapper-python extra-class" extra-attr=""><!--afterbegin--><pre class="v-md-prism-python"><code>uri <span class="token operator">=</span> <span class="token string">"viking://resources/project/doc"</span>

<span class="token comment"># L0: 摘要（~100 tokens）- 快速预览</span>
abstract <span class="token operator">=</span> <span class="token keyword">await</span> client<span class="token punctuation">.</span>abstract<span class="token punctuation">(</span>uri<span class="token punctuation">)</span>

<span class="token comment"># L1: 概览（~2k tokens）- 详细了解</span>
overview <span class="token operator">=</span> <span class="token keyword">await</span> client<span class="token punctuation">.</span>overview<span class="token punctuation">(</span>uri<span class="token punctuation">)</span>

<span class="token comment"># L2: 完整内容 - 深入阅读</span>
content <span class="token operator">=</span> <span class="token keyword">await</span> client<span class="token punctuation">.</span>read<span class="token punctuation">(</span>uri<span class="token punctuation">)</span>
</code></pre>

    <button class="v-md-copy-code-btn" type="button">
      <i>
        <svg viewBox="64 64 896 896" focusable="false" data-icon="copy" width="1em" height="1em" fill="currentColor" aria-hidden="true">
          <path d="M832 64H296c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h496v688c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V96c0-17.7-14.3-32-32-32zM704 192H192c-17.7 0-32 14.3-32 32v530.7c0 8.5 3.4 16.6 9.4 22.6l173.3 173.3c2.2 2.2 4.7 4 7.4 5.5v1.9h4.2c3.5 1.3 7.2 2 11 2H704c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32zM350 856.2L263.9 770H350v86.2zM664 888H414V746c0-22.1-17.9-40-40-40H232V264h432v624z"></path>
        </svg>
      </i>
    </button><!--beforeend--></div><!--afterend--></div><h4>目录操作</h4>
<div><!--beforebegin--><div class="v-md-pre-wrapper copy-code-mode v-md-pre-wrapper-python extra-class" extra-attr=""><!--afterbegin--><pre class="v-md-prism-python"><code>uri <span class="token operator">=</span> <span class="token string">"viking://resources/project"</span>

<span class="token comment"># 列出目录</span>
items <span class="token operator">=</span> <span class="token keyword">await</span> client<span class="token punctuation">.</span>ls<span class="token punctuation">(</span>uri<span class="token punctuation">)</span>
<span class="token comment"># 返回: [{"name": "doc1", "is_dir": False, "uri": "..."}, ...]</span>
</code></pre>

    <button class="v-md-copy-code-btn" type="button">
      <i>
        <svg viewBox="64 64 896 896" focusable="false" data-icon="copy" width="1em" height="1em" fill="currentColor" aria-hidden="true">
          <path d="M832 64H296c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h496v688c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V96c0-17.7-14.3-32-32-32zM704 192H192c-17.7 0-32 14.3-32 32v530.7c0 8.5 3.4 16.6 9.4 22.6l173.3 173.3c2.2 2.2 4.7 4 7.4 5.5v1.9h4.2c3.5 1.3 7.2 2 11 2H704c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32zM350 856.2L263.9 770H350v86.2zM664 888H414V746c0-22.1-17.9-40-40-40H232V264h432v624z"></path>
        </svg>
      </i>
    </button><!--beforeend--></div><!--afterend--></div><hr>
<h2>会话生命周期</h2>
<h3>添加对话</h3>
<div><!--beforebegin--><div class="v-md-pre-wrapper copy-code-mode v-md-pre-wrapper-python extra-class" extra-attr=""><!--afterbegin--><pre class="v-md-prism-python"><code>session<span class="token punctuation">.</span>add<span class="token punctuation">(</span>
    user_msg<span class="token operator">=</span><span class="token string">"请介绍项目架构"</span><span class="token punctuation">,</span>
    assistant_msg<span class="token operator">=</span><span class="token string">"根据文档，项目采用微服务架构..."</span>
<span class="token punctuation">)</span>
</code></pre>

    <button class="v-md-copy-code-btn" type="button">
      <i>
        <svg viewBox="64 64 896 896" focusable="false" data-icon="copy" width="1em" height="1em" fill="currentColor" aria-hidden="true">
          <path d="M832 64H296c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h496v688c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V96c0-17.7-14.3-32-32-32zM704 192H192c-17.7 0-32 14.3-32 32v530.7c0 8.5 3.4 16.6 9.4 22.6l173.3 173.3c2.2 2.2 4.7 4 7.4 5.5v1.9h4.2c3.5 1.3 7.2 2 11 2H704c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32zM350 856.2L263.9 770H350v86.2zM664 888H414V746c0-22.1-17.9-40-40-40H232V264h432v624z"></path>
        </svg>
      </i>
    </button><!--beforeend--></div><!--afterend--></div><h3>提交会话</h3>
<div><!--beforebegin--><div class="v-md-pre-wrapper copy-code-mode v-md-pre-wrapper-python extra-class" extra-attr=""><!--afterbegin--><pre class="v-md-prism-python"><code><span class="token comment"># 提交会话（自动归档 + 提取记忆）</span>
result <span class="token operator">=</span> <span class="token keyword">await</span> session<span class="token punctuation">.</span>commit<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment"># 返回值</span>
<span class="token comment"># {</span>
<span class="token comment">#     "session_id": "...",</span>
<span class="token comment">#     "status": "committed",</span>
<span class="token comment">#     "archived": true,  # 是否创建了归档</span>
<span class="token comment">#     "memories_extracted": 2,</span>
<span class="token comment"># }</span>

<span class="token comment"># 获取压缩信息</span>
compression <span class="token operator">=</span> session<span class="token punctuation">.</span>compression
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f"原始消息数: </span><span class="token interpolation"><span class="token punctuation">{</span>compression<span class="token punctuation">.</span>original_count<span class="token punctuation">}</span></span><span class="token string">"</span></span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f"压缩后消息数: </span><span class="token interpolation"><span class="token punctuation">{</span>compression<span class="token punctuation">.</span>compressed_count<span class="token punctuation">}</span></span><span class="token string">"</span></span><span class="token punctuation">)</span>
</code></pre>

    <button class="v-md-copy-code-btn" type="button">
      <i>
        <svg viewBox="64 64 896 896" focusable="false" data-icon="copy" width="1em" height="1em" fill="currentColor" aria-hidden="true">
          <path d="M832 64H296c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h496v688c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V96c0-17.7-14.3-32-32-32zM704 192H192c-17.7 0-32 14.3-32 32v530.7c0 8.5 3.4 16.6 9.4 22.6l173.3 173.3c2.2 2.2 4.7 4 7.4 5.5v1.9h4.2c3.5 1.3 7.2 2 11 2H704c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32zM350 856.2L263.9 770H350v86.2zM664 888H414V746c0-22.1-17.9-40-40-40H232V264h432v624z"></path>
        </svg>
      </i>
    </button><!--beforeend--></div><!--afterend--></div><h3>恢复会话</h3>
<div><!--beforebegin--><div class="v-md-pre-wrapper copy-code-mode v-md-pre-wrapper-python extra-class" extra-attr=""><!--afterbegin--><pre class="v-md-prism-python"><code>session <span class="token operator">=</span> <span class="token keyword">await</span> Session<span class="token punctuation">.</span>load<span class="token punctuation">(</span>client<span class="token punctuation">,</span> session_id<span class="token operator">=</span><span class="token string">"abc-123"</span><span class="token punctuation">)</span>
</code></pre>

    <button class="v-md-copy-code-btn" type="button">
      <i>
        <svg viewBox="64 64 896 896" focusable="false" data-icon="copy" width="1em" height="1em" fill="currentColor" aria-hidden="true">
          <path d="M832 64H296c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h496v688c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V96c0-17.7-14.3-32-32-32zM704 192H192c-17.7 0-32 14.3-32 32v530.7c0 8.5 3.4 16.6 9.4 22.6l173.3 173.3c2.2 2.2 4.7 4 7.4 5.5v1.9h4.2c3.5 1.3 7.2 2 11 2H704c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32zM350 856.2L263.9 770H350v86.2zM664 888H414V746c0-22.1-17.9-40-40-40H232V264h432v624z"></path>
        </svg>
      </i>
    </button><!--beforeend--></div><!--afterend--></div><hr>
<h2>配置详解</h2>
<h3>1. 配置加载优先级</h3>
<p>OpenViking 在初始化时按以下顺序确定最终配置（高优先级会覆盖低优先级）：</p>
<ol>
<li><strong>直接传参（Path）</strong>
<ul>
<li><code>client = OpenViking(path="./data")</code></li>
<li><strong>最高优先级</strong>。如果指定了 <code>path</code> 参数，将强制使用本地嵌入式模式（Local Backend），覆盖所有其他存储配置。</li>
</ul>
</li>
<li><strong>直接传参（URL）</strong>
<ul>
<li><code>client = OpenViking(vectordb_url="...", agfs_url="...")</code></li>
<li>如果未指定 <code>path</code> 但指定了服务 URL，将强制使用远程服务模式（HTTP Backend）。</li>
</ul>
</li>
<li><strong>配置对象（Config Object）</strong>
<ul>
<li><code>client = OpenViking(config=my_config_obj)</code></li>
<li>通过 Python 代码构建的 <code>OpenVikingConfig</code> 对象。</li>
</ul>
</li>
<li><strong>环境变量配置文件（Env Config File）</strong>
<ul>
<li><code>export OPENVIKING_CONFIG_FILE=ov.conf</code></li>
<li>如果未传递 <code>config</code> 对象，系统会尝试加载此环境变量指向的 JSON 配置文件。</li>
</ul>
</li>
<li><strong>默认值 + 环境变量覆盖</strong>
<ul>
<li>如果以上都未提供，使用系统默认值。</li>
<li>各个组件（Embedding, VLM 等）会尝试读取特定的环境变量（如 <code>OPENVIKING_EMBEDDING_DENSE_API_KEY</code>）来补充缺失的字段。</li>
</ul>
</li>
</ol>
<h3>2. 配置文件示例 (ov.conf)</h3>
<p>推荐使用 JSON 配置文件管理所有设置。</p>
<div><!--beforebegin--><div class="v-md-pre-wrapper copy-code-mode v-md-pre-wrapper-json extra-class" extra-attr=""><!--afterbegin--><pre class="v-md-prism-json"><code><span class="token punctuation">{</span>
  <span class="token property">"storage"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">"vectordb"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">"name"</span><span class="token operator">:</span> <span class="token string">"context"</span><span class="token punctuation">,</span>
      <span class="token property">"backend"</span><span class="token operator">:</span> <span class="token string">"local"</span><span class="token punctuation">,</span>
      <span class="token property">"path"</span><span class="token operator">:</span> <span class="token string">"./data"</span><span class="token punctuation">,</span>
      <span class="token property">"volcengine"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">"region"</span><span class="token operator">:</span> <span class="token string">"cn-beijing"</span><span class="token punctuation">,</span>
        <span class="token property">"ak"</span><span class="token operator">:</span> <span class="token null keyword">null</span><span class="token punctuation">,</span>
        <span class="token property">"sk"</span><span class="token operator">:</span> <span class="token null keyword">null</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">"agfs"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">"port"</span><span class="token operator">:</span> <span class="token number">8080</span><span class="token punctuation">,</span>
      <span class="token property">"log_level"</span><span class="token operator">:</span> <span class="token string">"warn"</span><span class="token punctuation">,</span>
      <span class="token property">"path"</span><span class="token operator">:</span> <span class="token string">"./data"</span><span class="token punctuation">,</span>
      <span class="token property">"backend"</span><span class="token operator">:</span> <span class="token string">"local"</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">"embedding"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">"dense"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">"backend"</span><span class="token operator">:</span> <span class="token string">"volcengine"</span><span class="token punctuation">,</span>
        <span class="token property">"model"</span><span class="token operator">:</span> <span class="token string">"doubao-embedding-001"</span><span class="token punctuation">,</span>
        <span class="token property">"api_key"</span><span class="token operator">:</span> <span class="token string">"your-key"</span><span class="token punctuation">,</span>
        <span class="token property">"api_base"</span><span class="token operator">:</span> <span class="token string">"https://ark.cn-beijing.volces.com/api/v3"</span><span class="token punctuation">,</span>
        <span class="token property">"dimension"</span><span class="token operator">:</span> <span class="token number">2048</span><span class="token punctuation">,</span>
        <span class="token property">"input"</span><span class="token operator">:</span> <span class="token string">"multimodal"</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">"sparse"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">"backend"</span><span class="token operator">:</span> <span class="token string">"vikingdb"</span><span class="token punctuation">,</span>
        <span class="token property">"model"</span><span class="token operator">:</span> <span class="token string">"bge-m3"</span><span class="token punctuation">,</span>
        <span class="token property">"version"</span><span class="token operator">:</span> <span class="token string">"default"</span><span class="token punctuation">,</span>
        <span class="token property">"ak"</span><span class="token operator">:</span> <span class="token string">"your-ak"</span><span class="token punctuation">,</span>
        <span class="token property">"sk"</span><span class="token operator">:</span> <span class="token string">"your-sk"</span><span class="token punctuation">,</span>
        <span class="token property">"region"</span><span class="token operator">:</span> <span class="token string">"cn-beijing"</span><span class="token punctuation">,</span>
        <span class="token property">"host"</span><span class="token operator">:</span> <span class="token string">"api-vikingdb.vikingdb.cn-beijing.volces.com"</span><span class="token punctuation">,</span>
        <span class="token property">"input"</span><span class="token operator">:</span> <span class="token string">"text"</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">"vlm"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">"model"</span><span class="token operator">:</span> <span class="token string">"doubao-seed-1-8-251228"</span><span class="token punctuation">,</span>
    <span class="token property">"api_key"</span><span class="token operator">:</span> <span class="token string">"your-key"</span><span class="token punctuation">,</span>
    <span class="token property">"api_base"</span><span class="token operator">:</span> <span class="token string">"https://ark.cn-beijing.volces.com/api/v3"</span><span class="token punctuation">,</span>
    <span class="token property">"temperature"</span><span class="token operator">:</span> <span class="token number">0.0</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">"rerank"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">"host"</span><span class="token operator">:</span> <span class="token string">"api-vikingdb.vikingdb.cn-beijing.volces.com"</span><span class="token punctuation">,</span>
    <span class="token property">"model_name"</span><span class="token operator">:</span> <span class="token string">"doubao-seed-rerank"</span><span class="token punctuation">,</span>
    <span class="token property">"ak"</span><span class="token operator">:</span> <span class="token string">"your-ak"</span><span class="token punctuation">,</span>
    <span class="token property">"sk"</span><span class="token operator">:</span> <span class="token string">"your-sk"</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">"auto_generate_l0"</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token property">"default_search_mode"</span><span class="token operator">:</span> <span class="token string">"thinking"</span><span class="token punctuation">,</span>
  <span class="token property">"enable_memory_decay"</span><span class="token operator">:</span> <span class="token boolean">true</span>
<span class="token punctuation">}</span>
</code></pre>

    <button class="v-md-copy-code-btn" type="button">
      <i>
        <svg viewBox="64 64 896 896" focusable="false" data-icon="copy" width="1em" height="1em" fill="currentColor" aria-hidden="true">
          <path d="M832 64H296c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h496v688c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V96c0-17.7-14.3-32-32-32zM704 192H192c-17.7 0-32 14.3-32 32v530.7c0 8.5 3.4 16.6 9.4 22.6l173.3 173.3c2.2 2.2 4.7 4 7.4 5.5v1.9h4.2c3.5 1.3 7.2 2 11 2H704c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32zM350 856.2L263.9 770H350v86.2zM664 888H414V746c0-22.1-17.9-40-40-40H232V264h432v624z"></path>
        </svg>
      </i>
    </button><!--beforeend--></div><!--afterend--></div><h3>3. 环境变量列表</h3>
<p>除了配置文件，你也可以使用环境变量来覆盖部分设置：</p>
<p><strong>全局配置</strong></p>
<ul>
<li><code>OPENVIKING_CONFIG_FILE</code>: 配置文件路径</li>
</ul>
<p><strong>Embedding 配置</strong></p>
<ul>
<li><code>OPENVIKING_EMBEDDING_DENSE_API_KEY</code>: Dense 模型 API Key</li>
<li><code>OPENVIKING_EMBEDDING_DENSE_MODEL</code>: Dense 模型名称</li>
<li><code>OPENVIKING_EMBEDDING_DENSE_API_BASE</code>: Dense API Base URL</li>
<li><code>OPENVIKING_EMBEDDING_SPARSE_AK</code>: VikingDB Sparse 模型 AK(如有)</li>
<li><code>OPENVIKING_EMBEDDING_SPARSE_SK</code>: VikingDB Sparse 模型 SK(如有)</li>
<li><code>OPENVIKING_EMBEDDING_SPARSE_MODEL</code>: VikingDB Sparse 模型名称(如有)</li>
<li><code>OPENVIKING_EMBEDDING_SPARSE_REGION</code>: VikingDB Sparse 模式 Region(如有)</li>
<li><code>OPENVIKING_EMBEDDING_SPARSE_HOST</code>: VikingDB Sparse 模式 Host(如有)</li>
<li><code>OPENVIKING_EMBEDDING_HYBRID_AK</code>: VikingDB Hybrid 模式 AK</li>
<li><code>OPENVIKING_EMBEDDING_HYBRID_SK</code>: VikingDB Hybrid 模式 SK</li>
<li><code>OPENVIKING_EMBEDDING_HYBRID_MODEL</code>: VikingDB Hybrid 模型名称</li>
<li><code>OPENVIKING_EMBEDDING_HYBRID_REGION</code>: VikingDB Hybrid 模式 Region</li>
<li><code>OPENVIKING_EMBEDDING_HYBRID_HOST</code>: VikingDB Hybrid 模式 Host</li>
</ul>
<p><strong>VLM 配置</strong></p>
<ul>
<li><code>OPENVIKING_VLM_API_KEY</code>: VLM API Key</li>
<li><code>OPENVIKING_VLM_MODEL</code>: VLM 模型名称</li>
<li><code>OPENVIKING_VLM_API_BASE</code>: VLM API Base URL</li>
</ul>
<p><strong>Rerank 配置</strong></p>
<ul>
<li><code>OPENVIKING_RERANK_AK</code>: Rerank AK</li>
<li><code>OPENVIKING_RERANK_SK</code>: Rerank SK</li>
<li><code>OPENVIKING_RERANK_HOST</code>: Rerank 服务地址</li>
</ul>
<h3>4. 完整使用示例</h3>
<div><!--beforebegin--><div class="v-md-pre-wrapper copy-code-mode v-md-pre-wrapper-python extra-class" extra-attr=""><!--afterbegin--><pre class="v-md-prism-python"><code><span class="token keyword">import</span> asyncio
<span class="token keyword">from</span> openviking <span class="token keyword">import</span> OpenViking

<span class="token keyword">async</span> <span class="token keyword">def</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token comment"># 1. 初始化（配置已通过 OPENVIKING_CONFIG_FILE 加载）</span>
    client <span class="token operator">=</span> OpenViking<span class="token punctuation">(</span>path<span class="token operator">=</span><span class="token string">"./data"</span><span class="token punctuation">)</span>
    <span class="token keyword">await</span> client<span class="token punctuation">.</span>initialize<span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token comment"># 2. 添加资源</span>
    <span class="token keyword">await</span> client<span class="token punctuation">.</span>add_resource<span class="token punctuation">(</span><span class="token string">"./document.pdf"</span><span class="token punctuation">,</span> reason<span class="token operator">=</span><span class="token string">"项目文档"</span><span class="token punctuation">)</span>

    <span class="token comment"># 3. 创建会话</span>
    session <span class="token operator">=</span> client<span class="token punctuation">.</span>session<span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token comment"># 4. 检索（通过 client）</span>
    result <span class="token operator">=</span> <span class="token keyword">await</span> client<span class="token punctuation">.</span>search<span class="token punctuation">(</span><span class="token string">"项目架构"</span><span class="token punctuation">,</span> limit<span class="token operator">=</span><span class="token number">3</span><span class="token punctuation">)</span>

    <span class="token comment"># 5. 使用检索结果（通过 session 记录）</span>
    <span class="token keyword">if</span> result<span class="token punctuation">.</span>resources<span class="token punctuation">:</span>
        uri <span class="token operator">=</span> result<span class="token punctuation">.</span>resources<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>uri
        content <span class="token operator">=</span> <span class="token keyword">await</span> client<span class="token punctuation">.</span>read<span class="token punctuation">(</span>uri<span class="token punctuation">)</span>
        session<span class="token punctuation">.</span>used<span class="token punctuation">(</span>contexts<span class="token operator">=</span><span class="token punctuation">[</span>uri<span class="token punctuation">]</span><span class="token punctuation">)</span>

    <span class="token comment"># 6. 添加对话</span>
    session<span class="token punctuation">.</span>add<span class="token punctuation">(</span>
        user_msg<span class="token operator">=</span><span class="token string">"项目架构是怎样的？"</span><span class="token punctuation">,</span>
        assistant_msg<span class="token operator">=</span><span class="token string">"根据文档..."</span>
    <span class="token punctuation">)</span>

    <span class="token comment"># 7. 提交会话</span>
    <span class="token keyword">await</span> session<span class="token punctuation">.</span>commit<span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token comment"># 8. 关闭</span>
    client<span class="token punctuation">.</span>close<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token keyword">if</span> __name__ <span class="token operator">==</span> <span class="token string">"__main__"</span><span class="token punctuation">:</span>
    asyncio<span class="token punctuation">.</span>run<span class="token punctuation">(</span>main<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre>

    <button class="v-md-copy-code-btn" type="button">
      <i>
        <svg viewBox="64 64 896 896" focusable="false" data-icon="copy" width="1em" height="1em" fill="currentColor" aria-hidden="true">
          <path d="M832 64H296c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h496v688c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V96c0-17.7-14.3-32-32-32zM704 192H192c-17.7 0-32 14.3-32 32v530.7c0 8.5 3.4 16.6 9.4 22.6l173.3 173.3c2.2 2.2 4.7 4 7.4 5.5v1.9h4.2c3.5 1.3 7.2 2 11 2H704c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32zM350 856.2L263.9 770H350v86.2zM664 888H414V746c0-22.1-17.9-40-40-40H232V264h432v624z"></path>
        </svg>
      </i>
    </button><!--beforeend--></div><!--afterend--></div><hr>
<h2>API 速查表</h2>
<h3>OpenViking 客户端</h3>
<table>
<thead>
<tr>
<th>方法</th>
<th>说明</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>initialize()</code></td>
<td>初始化存储和索引</td>
</tr>
<tr>
<td><code>close()</code></td>
<td>关闭并释放资源</td>
</tr>
<tr>
<td><code>add_resource(data, reason, instruction)</code></td>
<td>添加资源</td>
</tr>
<tr>
<td><code>add_skill(data)</code></td>
<td>添加技能</td>
</tr>
<tr>
<td><code>session(session_id=None)</code></td>
<td>创建/加载会话</td>
</tr>
<tr>
<td><code>search(query, target_uri, session_info, limit, grep, filter)</code></td>
<td>复杂检索</td>
</tr>
<tr>
<td><code>find(query, target_uri, limit, grep, filter)</code></td>
<td>简单检索</td>
</tr>
<tr>
<td><code>abstract(uri)</code> / <code>overview(uri)</code> / <code>read(uri)</code></td>
<td>读取内容</td>
</tr>
<tr>
<td><code>list(uri)</code></td>
<td>列出目录</td>
</tr>
<tr>
<td><code>relations(uri)</code></td>
<td>获取关联</td>
</tr>
<tr>
<td><code>export_ovpack(uri, to)</code></td>
<td>导出为 .ovpack</td>
</tr>
<tr>
<td><code>import_ovpack(file_path, parent, force)</code></td>
<td>导入 .ovpack</td>
</tr>
</tbody>
</table>
<h3>Session 会话</h3>
<table>
<thead>
<tr>
<th>方法</th>
<th>说明</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>load()</code></td>
<td>从存储加载会话数据</td>
</tr>
<tr>
<td><code>used(contexts, skill)</code></td>
<td>记录使用</td>
</tr>
<tr>
<td><code>add(user_msg, assistant_msg)</code></td>
<td>添加对话</td>
</tr>
<tr>
<td><code>commit()</code></td>
<td>提交会话（自动归档+记忆提取）</td>
</tr>
</tbody>
</table>
<hr>
<blockquote>
<p><strong>相关文档</strong>：</p>
<ul>
<li><a href="./openviking-deployment.md">部署接入文档</a> - 安装和部署</li>
<li><a href="./openviking-architecture.md">整体架构</a> - 核心概念和系统架构</li>
<li><a href="./openviking-context.md">上下文使用</a> - 检索流程详解</li>
<li><a href="./openviking-context-pack-format.md">数据交换协议</a> - .ovpack 格式规范</li>
</ul>
</blockquote>
<hr>
<h2>版本历史</h2>
<table>
<thead>
<tr>
<th>版本</th>
<th>日期</th>
<th>更新内容</th>
</tr>
</thead>
<tbody>
<tr>
<td>v1.0</td>
<td>2026-01-04</td>
<td>创建调用指南文档</td>
</tr>
</tbody>
</table>

        `,
      },
    ],
  },
  {
    id: 'core-concepts',
    title: 'Core Concepts',
    icon: Book,
    children: [
      {
        id: 'file-system-paradigm',
        title: 'File System Paradigm',
        content: `# File System Paradigm

OpenViking organizes all AI agent context using a familiar file system structure.

## Directory Structure

\`\`\`
/openviking/
├── Resource/
│   ├── documents/
│   ├── media/
│   └── configs/
├── Memory/
│   ├── sessions/
│   ├── user_profiles/
│   └── conversations/
└── Skill/
    ├── tools/
    ├── functions/
    └── workflows/
\`\`\`

## Benefits

1. **Intuitive Organization**: Developers already understand file systems
2. **Hierarchical Context**: Natural LOD (Level of Detail) support
3. **Observable**: Easy to inspect and debug
4. **Portable**: Export and share context easily`,
      },
      {
        id: 'lod-supply',
        title: 'LOD Context Supply',
        content: `# Hierarchical (LOD) Context Supply

Level of Detail (LOD) is a core feature that reduces token costs by up to 95%.

## The Three Levels

### L2: Abstract Layer
- **Token Cost**: <100 tokens
- **Use Case**: Quick perception and routing
- **Content**: Summaries, metadata, categories

### L1: Overview Layer  
- **Token Cost**: <2,000 tokens
- **Use Case**: Triggered exploration
- **Content**: Outlines, key points, structure

### L0: Detail Layer
- **Token Cost**: Variable (deep work)
- **Use Case**: Full content access
- **Content**: Complete documents, full code

## Smart Loading

\`\`\`python
# OpenViking automatically selects the right level
context = ov.find(query, lod="auto")

# Or specify explicitly
context = ov.find(query, lod="L1")
\`\`\``,
      },
    ],
  },
  {
    id: 'api-reference',
    title: 'API Reference',
    icon: Code2,
    children: [
      {
        id: 'openviking-class',
        title: 'OpenViking Class',
        content: `# OpenViking Class

The main entry point for all OpenViking operations.

## Constructor

\`\`\`python
OpenViking(
    workspace: str = "./openviking",
    config: dict = None
)
\`\`\`

### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| workspace | str | "./openviking" | Path to workspace directory |
| config | dict | None | Configuration options |

## Methods

### add_data()

Add data to the context file system.

\`\`\`python
ov.add_data(
    source: str | dict,
    type: str = "resource",
    metadata: dict = None
)
\`\`\`

### find()

Search for relevant context.

\`\`\`python
results = ov.find(
    query: str,
    top_k: int = 5,
    lod: str = "auto",
    filters: dict = None
)
\`\`\``,
      },
      {
        id: 'session-class',
        title: 'Session Class',
        content: `# Session Class

Manage agent sessions and enable self-iteration.

## Creating a Session

\`\`\`python
from openviking import Session

session = Session(
    agent_id="my_agent",
    user_id="user_123"
)
\`\`\`

## Recording Interactions

\`\`\`python
# Log a conversation turn
session.log(
    role="user",
    content="What's the weather?",
    metadata={"intent": "weather_query"}
)

session.log(
    role="assistant", 
    content="It's sunny and 72°F",
    metadata={"tool_used": "weather_api"}
)
\`\`\`

## Committing to Memory

\`\`\`python
# Save session insights to long-term memory
session.commit()

# This triggers self-iteration:
# - User preferences are extracted
# - Skill improvements are logged
# - Context is optimized
\`\`\``,
      },
    ],
  },
  {
    id: 'integrations',
    title: 'Integrations',
    icon: Settings,
    children: [
      {
        id: 'langchain',
        title: 'LangChain Integration',
        content: `# LangChain Integration

Change your agent's context with a single line.

## Installation

\`\`\`bash
pip install openviking[langchain]
\`\`\`

## Usage

\`\`\`python
from langchain.agents import AgentExecutor
from openviking.integrations import LangChainContext

# Wrap your agent with OpenViking context
context = LangChainContext(workspace="./my_context")

agent = AgentExecutor(
    agent=my_agent,
    tools=tools,
    memory=context.as_memory(),  # One line!
    verbose=True
)
\`\`\`

## Features

- Automatic context injection
- Session management
- Long-term memory persistence
- Skill learning from interactions`,
      },
      {
        id: 'deerflow',
        title: 'DeerFlow Integration',
        content: `# DeerFlow Integration

Full support for long documents, sessions, and memory.

## Setup

\`\`\`python
from deerflow import Agent
from openviking.integrations import DeerFlowContext

context = DeerFlowContext()

agent = Agent(
    context_provider=context,
    features=[
        "long_document",
        "session_management", 
        "long_term_memory"
    ]
)
\`\`\`

## Long Document Support

OpenViking handles documents of any size through intelligent chunking and LOD layers.

\`\`\`python
# Add a 500-page PDF
context.add_document("./large_manual.pdf")

# Query across the entire document
results = context.find(
    "What are the safety procedures?",
    scope="documents"
)
\`\`\``,
      },
    ],
  },
]
