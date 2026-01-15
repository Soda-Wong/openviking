import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronRight, Book, Database, Search, Settings, Zap, Code2, FileText } from "lucide-react";

interface DocSection {
  id: string;
  title: string;
  icon: React.ElementType;
  children: { id: string; title: string; content: string }[];
}

const docs: DocSection[] = [
  {
    id: "getting-started",
    title: "Getting Started",
    icon: Zap,
    children: [
      {
        id: "installation",
        title: "Installation",
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
        id: "quickstart",
        title: "Quick Start Guide",
        content: `# Quick Start Guide

Get up and running with OpenViking in 5 minutes.

## Step 1: Initialize

\`\`\`python
from openviking import OpenViking

ov = OpenViking(
    workspace="./my_agent_context",
    config={
        "lod_levels": 3,
        "auto_iterate": True
    }
)
\`\`\`

## Step 2: Add Data

\`\`\`python
# Add resources
ov.add_data("./documents/", type="resource")

# Add skills
ov.add_data("./tools/", type="skill")

# Add session memories
ov.add_data(session_log, type="memory")
\`\`\`

## Step 3: Search Context

\`\`\`python
results = ov.find(
    query="How does authentication work?",
    top_k=5
)
\`\`\``,
      },
    ],
  },
  {
    id: "core-concepts",
    title: "Core Concepts",
    icon: Book,
    children: [
      {
        id: "file-system-paradigm",
        title: "File System Paradigm",
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
        id: "lod-supply",
        title: "LOD Context Supply",
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
    id: "api-reference",
    title: "API Reference",
    icon: Code2,
    children: [
      {
        id: "openviking-class",
        title: "OpenViking Class",
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
        id: "session-class",
        title: "Session Class",
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
    id: "integrations",
    title: "Integrations",
    icon: Settings,
    children: [
      {
        id: "langchain",
        title: "LangChain Integration",
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
        id: "deerflow",
        title: "DeerFlow Integration",
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
];

const DocsPage = () => {
  const [selectedSection, setSelectedSection] = useState(docs[0].children[0]);
  const [expandedSections, setExpandedSections] = useState<string[]>(["getting-started"]);

  const toggleSection = (id: string) => {
    setExpandedSections((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

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
            <h2 className="text-lg font-semibold mb-6 text-gradient">Documentation</h2>
            <nav className="space-y-2">
              {docs.map((section) => {
                const Icon = section.icon;
                const isExpanded = expandedSections.includes(section.id);
                return (
                  <div key={section.id}>
                    <button
                      onClick={() => toggleSection(section.id)}
                      className="flex items-center gap-2 w-full p-2 rounded-lg hover:bg-muted/50 transition-colors text-left"
                    >
                      <ChevronRight
                        className={`w-4 h-4 text-muted-foreground transition-transform ${
                          isExpanded ? "rotate-90" : ""
                        }`}
                      />
                      <Icon className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium">{section.title}</span>
                    </button>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        className="ml-6 mt-1 space-y-1"
                      >
                        {section.children.map((child) => (
                          <button
                            key={child.id}
                            onClick={() => setSelectedSection(child)}
                            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                              selectedSection.id === child.id
                                ? "bg-primary/10 text-primary border-l-2 border-primary"
                                : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
                            }`}
                          >
                            {child.title}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </div>
                );
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
                  {selectedSection.content.split("\n").map((line, i) => {
                    if (line.startsWith("# ")) {
                      return (
                        <h1 key={i} className="text-3xl font-bold text-gradient mb-6">
                          {line.slice(2)}
                        </h1>
                      );
                    }
                    if (line.startsWith("## ")) {
                      return (
                        <h2 key={i} className="text-xl font-semibold mt-8 mb-4 text-foreground">
                          {line.slice(3)}
                        </h2>
                      );
                    }
                    if (line.startsWith("### ")) {
                      return (
                        <h3 key={i} className="text-lg font-medium mt-6 mb-3 text-foreground">
                          {line.slice(4)}
                        </h3>
                      );
                    }
                    if (line.startsWith("```")) {
                      return null;
                    }
                    if (line.startsWith("|")) {
                      return (
                        <code key={i} className="block text-sm font-mono text-muted-foreground bg-muted/30 px-2 rounded">
                          {line}
                        </code>
                      );
                    }
                    if (line.trim().startsWith("-") || line.trim().match(/^\d+\./)) {
                      return (
                        <li key={i} className="text-muted-foreground ml-4">
                          {line.replace(/^[-\d.]+\s*\*\*/, "").replace(/\*\*/g, "")}
                        </li>
                      );
                    }
                    if (line.includes("`") && !line.startsWith("```")) {
                      const parts = line.split(/(`[^`]+`)/g);
                      return (
                        <p key={i} className="text-muted-foreground mb-2">
                          {parts.map((part, j) =>
                            part.startsWith("`") ? (
                              <code key={j} className="bg-muted/50 px-1.5 py-0.5 rounded text-primary font-mono text-sm">
                                {part.slice(1, -1)}
                              </code>
                            ) : (
                              part
                            )
                          )}
                        </p>
                      );
                    }
                    if (line.trim() === "") return <br key={i} />;
                    return (
                      <p key={i} className="text-muted-foreground mb-2">
                        {line}
                      </p>
                    );
                  })}
                </pre>
              </div>
            </motion.article>
          </main>
        </div>
      </div>
    </div>
  );
};

export default DocsPage;
