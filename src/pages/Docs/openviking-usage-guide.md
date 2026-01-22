# OpenViking 调用指南

> 本文档是 OpenViking Python 包的使用指南，帮助你快速上手 API 调用。
>
> 前置阅读：[部署接入文档](./openviking-deployment.md) | 深入了解：[整体架构](./openviking-architecture.md)

---

## 目录

1. [快速开始](#快速开始)
2. [资源管理](#资源管理)
3. [技能管理](#技能管理)
4. [数据交换](#数据交换)
5. [会话与检索](#会话与检索)
6. [上下文读取](#上下文读取)
7. [会话生命周期](#会话生命周期)
8. [配置参考](#配置参考)

---

## 快速开始

### 基础配置

推荐使用 JSON 配置文件进行初始化配置，简化环境变量管理：

```bash
# 设置配置文件路径，请复制 ov.conf.example 到 ov.conf 并配置好你的 API 密钥等信息。
export OPENVIKING_CONFIG_FILE=examples/ov.conf

# 然后参照下一步初始化客户端，或者直接启动你基于 OpenViking 开发的应用程序
```

配置文件示例见 `examples/ov.conf.example`。

### 初始化客户端

OpenViking 提供异步和同步两种客户端：

```python
from openviking import SyncOpenViking, AsyncOpenViking

# 异步客户端（推荐，默认）
client = AsyncOpenViking(path="./data")  # OpenViking 是 AsyncOpenViking 的别名
await client.initialize()

# 同步客户端（阻塞式调用）
client = SyncOpenViking(path="./data")
client.initialize()
```

### 关闭客户端

```python
client.close()  # 释放资源（嵌入式模式会停止 AGFS）
```

---

## 资源管理

### 添加资源

```python
result = await client.add_resource(
    data="./document.pdf",  # 文件路径、URL 或内容
    reason="项目参考文档",    # 添加原因
    instruction="用于架构设计参考", # 使用指令
)

# 返回值
# {"status": "success", "resource": "viking://resources/..."}
```

**支持的输入类型**：
- 文件路径：`"./doc.pdf"`, `"/Users/YourName/docs/introduction.md"`
- URL：`"https://example.com/doc.pdf"`
- 字符串内容：直接传入文本内容

---

## 技能管理

### 添加技能

```python
# 1. 从文件夹添加（推荐）
result = await client.add_skill(Path("./skills/pdf"))

# 2. 从单个文件添加
result = await client.add_skill(Path("./my-skill.md"))

# 3. 从 MCP Tool 添加
mcp_tool = {
    "name": "search_files",
    "description": "Search files by pattern",
    "inputSchema": {
        "type": "object",
        "properties": {"pattern": {"type": "string"}},
        "required": ["pattern"]
    }
}
result = await client.add_skill(mcp_tool)

# 4. 从字符串添加
skill_md = """---
name: hello
description: Say hello
---
# Hello Skill
"""
result = await client.add_skill(skill_md)

# 返回值
# {"status": "success", "skill": "viking://agent/skills/pdf", "name": "pdf"}
```

**SKILL.md 格式**：

```yaml
---
name: skill-name
description: "技能描述"
allowed-tools: [Read, Grep]
tags: [tag1, tag2]
---

# 技能内容（Markdown）
```

---

## 数据交换

OpenViking 支持通过 `.ovpack` 格式进行数据导入导出，便于跨系统迁移和备份。

详细规范参见：[上下文数据交换协议](./openviking-context-pack-format.md)

### 导出数据

```python
# 将指定路径导出为 .ovpack 文件
output_path = await client.export_ovpack(
    uri="viking://resources/ProjectSpec",
    to="/tmp/ProjectSpec.ovpack"
)
```

### 导入数据

```python
# 导入 .ovpack 文件到指定位置（短名称）
root_uri = await client.import_ovpack(
    file_path="./ProjectSpec.ovpack",
    target="my_project"
)

# 导入 .ovpack 文件到指定位置（完整 URI）
root_uri = await client.import_ovpack(
    file_path="./ProjectSpec.ovpack",
    target="viking://resources/my_project"
)

# 强制覆盖已存在的资源
root_uri = await client.import_ovpack(
    file_path="./ProjectSpec.ovpack",
    target="viking://resources/my_project",
    force=True
)
```

---

## 会话与检索

### 创建会话

```python
session = client.session()
# session.session_id 获取会话 ID

# 加载已有会话
existing_session = client.session(session_id="existing-id")
await existing_session.load()
```

### 复杂检索 - client.search()

`search()` 用于执行复杂检索，支持意图分析和层级检索：

```python
# 基本用法
result = await client.search("项目架构设计", limit=3)

# 带过滤的用法
result = await client.search(
    "项目架构设计",
    filter={"created_at": {"$gte": "2024-01-01"}},
    limit=5
)

# 访问检索结果
for resource in result.resources:
    print(f"URI: {resource.uri}")
    print(f"摘要: {resource.abstract}")
    print(f"得分: {resource.score}")

for skill in result.skills:
    print(f"技能: {skill.uri}")

for memory in result.memories:
    print(f"记忆: {memory.uri}")
```

**FindResult 结构**：

| 属性 | 类型 | 说明 |
|------|------|------|
| `memories` | List | 匹配的记忆列表 |
| `resources` | List | 匹配的资源列表 |
| `skills` | List | 匹配的技能列表 |
| `total` | int | 总结果数 |

### 记录使用

检索返回的是**候选**上下文，实际使用时需记录：

```python
# 记录使用的上下文
session.used(contexts=["viking://resources/my_project/doc"])

# 记录技能使用
session.used(skill={
    "uri": "viking://agent/planner/skills/code-search",
    "input": "搜索 React 组件",
    "output": "找到 3 个文件",
    "success": True
})
```

---

## 上下文读取

### 核心 API

```python
# 读取 L0/L1/L2 内容
abstract = await client.abstract(uri)      # L0 摘要
overview = await client.overview(uri)      # L1 概览
content = await client.read(uri)           # L2 内容

# 获取关联列表
relations = await client.relations(uri)    # [{"uri": "...", "reason": "..."}]

# 列出目录
items = await client.ls(uri)
```

### 完整工作流：检索 → 读取 → 使用记录

```python
# 1. 智能检索
result = await client.search("如何处理PDF文件？", limit=3)

# 2. 处理检索结果
used_uris = []

if result.skills:
    skill = result.skills[0]
    print(f"找到技能: {skill.abstract}")

    # 读取完整内容
    skill_content = await client.read(skill.uri)
    used_uris.append(skill.uri)

if result.resources:
    resource = result.resources[0]

    # L0: 先看摘要（~100 tokens）
    abstract = await client.abstract(resource.uri)
    print(f"摘要: {abstract}")

    # L1: 需要更多信息，读概览（~2k tokens）
    overview = await client.overview(resource.uri)

    # L2: 读取完整内容（可选）
    if "PDF" in abstract:
        content = await client.read(resource.uri).head(100)
        used_uris.append(resource.uri)

# 3. 记录真正使用的上下文
session.used(contexts=used_uris)

# 4. 添加对话
session.add(
    user_msg="如何处理PDF文件？",
    assistant_msg="可以使用 PDF 技能..."
)

# 5. 提交会话
await session.commit()
```

### 读取方法详解

#### 分层读取（L0/L1/L2）

```python
uri = "viking://resources/project/doc"

# L0: 摘要（~100 tokens）- 快速预览
abstract = await client.abstract(uri)

# L1: 概览（~2k tokens）- 详细了解
overview = await client.overview(uri)

# L2: 完整内容 - 深入阅读
content = await client.read(uri)
```

#### 目录操作

```python
uri = "viking://resources/project"

# 列出目录
items = await client.ls(uri)
# 返回: [{"name": "doc1", "is_dir": False, "uri": "..."}, ...]
```

---

## 会话生命周期

### 添加对话

```python
session.add(
    user_msg="请介绍项目架构",
    assistant_msg="根据文档，项目采用微服务架构..."
)
```

### 提交会话

```python
# 提交会话（自动归档 + 提取记忆）
result = await session.commit()

# 返回值
# {
#     "session_id": "...",
#     "status": "committed",
#     "archived": true,  # 是否创建了归档
#     "memories_extracted": 2,
# }

# 获取压缩信息
compression = session.compression
print(f"原始消息数: {compression.original_count}")
print(f"压缩后消息数: {compression.compressed_count}")
```

### 恢复会话

```python
session = await Session.load(client, session_id="abc-123")
```

---

## 配置详解

### 1. 配置加载优先级

OpenViking 在初始化时按以下顺序确定最终配置（高优先级会覆盖低优先级）：

1.  **直接传参（Path）**
    - `client = OpenViking(path="./data")`
    - **最高优先级**。如果指定了 `path` 参数，将强制使用本地嵌入式模式（Local Backend），覆盖所有其他存储配置。
2.  **直接传参（URL）**
    - `client = OpenViking(vectordb_url="...", agfs_url="...")`
    - 如果未指定 `path` 但指定了服务 URL，将强制使用远程服务模式（HTTP Backend）。
3.  **配置对象（Config Object）**
    - `client = OpenViking(config=my_config_obj)`
    - 通过 Python 代码构建的 `OpenVikingConfig` 对象。
4.  **环境变量配置文件（Env Config File）**
    - `export OPENVIKING_CONFIG_FILE=ov.conf`
    - 如果未传递 `config` 对象，系统会尝试加载此环境变量指向的 JSON 配置文件。
5.  **默认值 + 环境变量覆盖**
    - 如果以上都未提供，使用系统默认值。
    - 各个组件（Embedding, VLM 等）会尝试读取特定的环境变量（如 `OPENVIKING_EMBEDDING_DENSE_API_KEY`）来补充缺失的字段。

### 2. 配置文件示例 (ov.conf)

推荐使用 JSON 配置文件管理所有设置。

```json
{
  "storage": {
    "vectordb": {
      "name": "context",
      "backend": "local",
      "path": "./data",
      "volcengine": {
        "region": "cn-beijing",
        "ak": null,
        "sk": null
      }
    },
    "agfs": {
      "port": 8080,
      "log_level": "warn",
      "path": "./data",
      "backend": "local"
    }
  },
  "embedding": {
    "dense": {
        "backend": "volcengine",
        "model": "doubao-embedding-001",
        "api_key": "your-key",
        "api_base": "https://ark.cn-beijing.volces.com/api/v3",
        "dimension": 2048,
        "input": "multimodal"
    },
    "sparse": {
        "backend": "vikingdb",
        "model": "bge-m3",
        "version": "default",
        "ak": "your-ak",
        "sk": "your-sk",
        "region": "cn-beijing",
        "host": "api-vikingdb.vikingdb.cn-beijing.volces.com",
        "input": "text"
    }
  },
  "vlm": {
    "model": "doubao-seed-1-8-251228",
    "api_key": "your-key",
    "api_base": "https://ark.cn-beijing.volces.com/api/v3",
    "temperature": 0.0
  },
  "rerank": {
    "host": "api-vikingdb.vikingdb.cn-beijing.volces.com",
    "model_name": "doubao-seed-rerank",
    "ak": "your-ak",
    "sk": "your-sk"
  },
  "auto_generate_l0": true,
  "default_search_mode": "thinking",
  "enable_memory_decay": true
}
```

### 3. 环境变量列表

除了配置文件，你也可以使用环境变量来覆盖部分设置：

**全局配置**
- `OPENVIKING_CONFIG_FILE`: 配置文件路径

**Embedding 配置**
- `OPENVIKING_EMBEDDING_DENSE_API_KEY`: Dense 模型 API Key
- `OPENVIKING_EMBEDDING_DENSE_MODEL`: Dense 模型名称
- `OPENVIKING_EMBEDDING_DENSE_API_BASE`: Dense API Base URL
- `OPENVIKING_EMBEDDING_SPARSE_AK`: VikingDB Sparse 模型 AK(如有)
- `OPENVIKING_EMBEDDING_SPARSE_SK`: VikingDB Sparse 模型 SK(如有)
- `OPENVIKING_EMBEDDING_SPARSE_MODEL`: VikingDB Sparse 模型名称(如有)
- `OPENVIKING_EMBEDDING_SPARSE_REGION`: VikingDB Sparse 模式 Region(如有)
- `OPENVIKING_EMBEDDING_SPARSE_HOST`: VikingDB Sparse 模式 Host(如有)
- `OPENVIKING_EMBEDDING_HYBRID_AK`: VikingDB Hybrid 模式 AK
- `OPENVIKING_EMBEDDING_HYBRID_SK`: VikingDB Hybrid 模式 SK
- `OPENVIKING_EMBEDDING_HYBRID_MODEL`: VikingDB Hybrid 模型名称
- `OPENVIKING_EMBEDDING_HYBRID_REGION`: VikingDB Hybrid 模式 Region
- `OPENVIKING_EMBEDDING_HYBRID_HOST`: VikingDB Hybrid 模式 Host

**VLM 配置**
- `OPENVIKING_VLM_API_KEY`: VLM API Key
- `OPENVIKING_VLM_MODEL`: VLM 模型名称
- `OPENVIKING_VLM_API_BASE`: VLM API Base URL

**Rerank 配置**
- `OPENVIKING_RERANK_AK`: Rerank AK
- `OPENVIKING_RERANK_SK`: Rerank SK
- `OPENVIKING_RERANK_HOST`: Rerank 服务地址

### 4. 完整使用示例


```python
import asyncio
from openviking import OpenViking

async def main():
    # 1. 初始化（配置已通过 OPENVIKING_CONFIG_FILE 加载）
    client = OpenViking(path="./data")
    await client.initialize()

    # 2. 添加资源
    await client.add_resource("./document.pdf", reason="项目文档")

    # 3. 创建会话
    session = client.session()

    # 4. 检索（通过 client）
    result = await client.search("项目架构", limit=3)

    # 5. 使用检索结果（通过 session 记录）
    if result.resources:
        uri = result.resources[0].uri
        content = await client.read(uri)
        session.used(contexts=[uri])

    # 6. 添加对话
    session.add(
        user_msg="项目架构是怎样的？",
        assistant_msg="根据文档..."
    )

    # 7. 提交会话
    await session.commit()

    # 8. 关闭
    client.close()

if __name__ == "__main__":
    asyncio.run(main())
```

---

## API 速查表

### OpenViking 客户端

| 方法 | 说明 |
|------|------|
| `initialize()` | 初始化存储和索引 |
| `close()` | 关闭并释放资源 |
| `add_resource(data, reason, instruction)` | 添加资源 |
| `add_skill(data)` | 添加技能 |
| `session(session_id=None)` | 创建/加载会话 |
| `search(query, target_uri, session_info, limit, grep, filter)` | 复杂检索 |
| `find(query, target_uri, limit, grep, filter)` | 简单检索 |
| `abstract(uri)` / `overview(uri)` / `read(uri)` | 读取内容 |
| `list(uri)` | 列出目录 |
| `relations(uri)` | 获取关联 |
| `export_ovpack(uri, to)` | 导出为 .ovpack |
| `import_ovpack(file_path, parent, force)` | 导入 .ovpack |

### Session 会话

| 方法 | 说明 |
|------|------|
| `load()` | 从存储加载会话数据 |
| `used(contexts, skill)` | 记录使用 |
| `add(user_msg, assistant_msg)` | 添加对话 |
| `commit()` | 提交会话（自动归档+记忆提取） |

---

> **相关文档**：
> - [部署接入文档](./openviking-deployment.md) - 安装和部署
> - [整体架构](./openviking-architecture.md) - 核心概念和系统架构
> - [上下文使用](./openviking-context.md) - 检索流程详解
> - [数据交换协议](./openviking-context-pack-format.md) - .ovpack 格式规范

---

## 版本历史

| 版本 | 日期 | 更新内容 |
|------|------|----------|
| v1.0 | 2026-01-04 | 创建调用指南文档 |
