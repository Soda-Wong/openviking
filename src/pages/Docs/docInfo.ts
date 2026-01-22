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
import { docList } from '@/pages/Docs/docParser'

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
        ${docList.find((item) => item.name === 'openviking-usage-guide')?.rawContent || ''}
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
