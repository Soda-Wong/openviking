import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import { Calendar, Clock, ArrowLeft, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  image: string;
  category: string;
  content: string;
}

const blogPosts: Record<string, BlogPost> = {
  "introducing-openviking": {
    id: "introducing-openviking",
    title: "Introducing OpenViking: The Context File System for AI Agents",
    excerpt: "Today we're excited to announce OpenViking, a revolutionary approach to managing AI agent context.",
    date: "2026-01-10",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&auto=format",
    category: "Announcement",
    content: `
Today marks a significant milestone in the evolution of AI agent development. We're thrilled to announce **OpenViking**, the first open-source context file system designed specifically for AI agents.

## The Problem We're Solving

Building AI agents today is incredibly complex. Developers juggle multiple concerns:

- **Memory Management**: How does your agent remember past interactions?
- **Resource Access**: How does it retrieve relevant documents and data?
- **Skill Organization**: How do you manage tools, functions, and capabilities?

Most solutions treat these as separate problems, leading to fragmented architectures and complex codebases.

## Our Solution: A File System Paradigm

What if we could organize all agent context the way we organize files on our computers? That's exactly what OpenViking does.

\`\`\`
/openviking/
├── Resource/    # Documents, images, data
├── Memory/      # Sessions, conversations, preferences
└── Skill/       # Tools, functions, workflows
\`\`\`

This familiar structure makes it intuitive for developers to:
- Navigate and understand their agent's knowledge
- Debug context retrieval issues
- Share and version control agent configurations

## Key Features

### 1. Hierarchical LOD Supply
Our Level of Detail system loads context on-demand, reducing token costs by up to 95%.

### 2. Recursive Retrieval
Smart traversal algorithms find the exact context your agent needs, combining directory positioning with semantic search.

### 3. Self-Iteration
Sessions automatically distill insights back into long-term memory, making your agent smarter over time.

## Getting Started

Installation is simple:

\`\`\`bash
pip install openviking
\`\`\`

Then initialize and start using:

\`\`\`python
from openviking import OpenViking

ov = OpenViking()
ov.add_data("./my_documents/")
results = ov.find("What's the return policy?")
\`\`\`

## What's Next

We're just getting started. Upcoming features include:
- Multi-agent context sharing
- Advanced analytics dashboard
- Enterprise cloud deployment options

Join us on [GitHub](https://github.com/volcengine/OpenViking) and help shape the future of AI agent development!
    `,
  },
  "lod-deep-dive": {
    id: "lod-deep-dive",
    title: "Deep Dive: How LOD Supply Reduces Token Costs by 95%",
    excerpt: "Learn how our hierarchical Level of Detail system works.",
    date: "2026-01-08",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format",
    category: "Technical",
    content: `
Token costs are the hidden tax of AI applications. Every context window has limits, and every token counts toward your bill. OpenViking's LOD (Level of Detail) system was designed from the ground up to minimize token usage while maximizing context quality.

## The Three-Layer Architecture

### L2: The Abstract Layer

The highest level provides a bird's-eye view of your context. Think of it as the table of contents.

- **Token cost**: <100 tokens per item
- **Content**: Summaries, categories, metadata
- **Use case**: Quick routing and perception

### L1: The Overview Layer

When the agent needs more detail, it drops down to L1.

- **Token cost**: <2,000 tokens per item
- **Content**: Outlines, key points, structure
- **Use case**: Understanding scope before diving deep

### L0: The Detail Layer

Full access to complete content when needed.

- **Token cost**: Variable (the full document)
- **Content**: Complete text, code, data
- **Use case**: Deep work and precise answers

## Smart Loading in Action

When your agent receives a query like "What's the authentication flow?", here's what happens:

1. **L2 Scan**: OpenViking quickly scans all L2 summaries (~50 tokens each)
2. **Relevant Detection**: Identifies "security.md" and "auth_handler.py" as relevant
3. **L1 Load**: Loads overviews of those specific files (~500 tokens each)
4. **Precision Check**: Determines exact sections needed
5. **L0 Extract**: Pulls only the relevant code blocks (~200 tokens)

**Total cost**: ~1,300 tokens instead of loading everything (~25,000 tokens)

That's a **95% reduction** in token usage.

## Implementation Details

The LOD system is automatic by default, but you can control it:

\`\`\`python
# Automatic LOD selection
results = ov.find(query, lod="auto")

# Force specific level
results = ov.find(query, lod="L1")

# Get all levels
results = ov.find(query, lod="all")
\`\`\`

Try it yourself and watch your token bills drop!
    `,
  },
};

const BlogDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const post = id ? blogPosts[id] : null;

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-28 pb-24">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-2xl font-bold mb-4">Post not found</h1>
            <Link to="/blog">
              <Button variant="outline">
                <ArrowLeft className="mr-2 w-4 h-4" />
                Back to Blog
              </Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const categoryColors: Record<string, string> = {
    Announcement: "bg-primary/20 text-primary border-primary/30",
    Technical: "bg-secondary/20 text-secondary border-secondary/30",
    Tutorial: "bg-success/20 text-success border-success/30",
    Philosophy: "bg-warning/20 text-warning border-warning/30",
    Industry: "bg-muted text-muted-foreground border-muted-foreground/30",
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-28 pb-24">
        <article className="container mx-auto px-6 max-w-3xl">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8"
          >
            <Link to="/blog">
              <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                <ArrowLeft className="mr-2 w-4 h-4" />
                Back to Blog
              </Button>
            </Link>
          </motion.div>

          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <span
              className={`inline-block text-xs px-3 py-1 rounded-full border mb-4 ${
                categoryColors[post.category]
              }`}
            >
              {post.category}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {post.readTime}
              </span>
            </div>
          </motion.header>

          {/* Featured Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="mb-12"
          >
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-64 md:h-80 object-cover rounded-2xl"
            />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="prose prose-invert max-w-none"
          >
            {post.content.split("\n").map((line, i) => {
              const trimmed = line.trim();
              if (trimmed.startsWith("## ")) {
                return (
                  <h2 key={i} className="text-2xl font-bold mt-10 mb-4 text-foreground">
                    {trimmed.slice(3)}
                  </h2>
                );
              }
              if (trimmed.startsWith("### ")) {
                return (
                  <h3 key={i} className="text-xl font-semibold mt-8 mb-3 text-foreground">
                    {trimmed.slice(4)}
                  </h3>
                );
              }
              if (trimmed.startsWith("```")) {
                return null;
              }
              if (trimmed.startsWith("-")) {
                return (
                  <li key={i} className="text-muted-foreground ml-4">
                    {trimmed.slice(1).trim().replace(/\*\*/g, "")}
                  </li>
                );
              }
              if (trimmed.match(/^\d+\./)) {
                return (
                  <li key={i} className="text-muted-foreground ml-4 list-decimal">
                    {trimmed.replace(/^\d+\.\s*/, "").replace(/\*\*/g, "")}
                  </li>
                );
              }
              if (trimmed.includes("`") && !trimmed.startsWith("```")) {
                const parts = trimmed.split(/(`[^`]+`)/g);
                return (
                  <p key={i} className="text-muted-foreground mb-4 leading-relaxed">
                    {parts.map((part, j) =>
                      part.startsWith("`") ? (
                        <code key={j} className="bg-muted/50 px-1.5 py-0.5 rounded text-primary font-mono text-sm">
                          {part.slice(1, -1)}
                        </code>
                      ) : (
                        <span key={j} dangerouslySetInnerHTML={{ __html: part.replace(/\*\*([^*]+)\*\*/g, '<strong class="text-foreground">$1</strong>') }} />
                      )
                    )}
                  </p>
                );
              }
              if (trimmed === "") return null;
              return (
                <p
                  key={i}
                  className="text-muted-foreground mb-4 leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: trimmed.replace(/\*\*([^*]+)\*\*/g, '<strong class="text-foreground">$1</strong>'),
                  }}
                />
              );
            })}
          </motion.div>

          {/* Share */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-12 pt-8 border-t border-border/30 flex items-center justify-between"
          >
            <p className="text-muted-foreground text-sm">Share this article</p>
            <Button variant="outline" size="sm" className="gap-2">
              <Share2 className="w-4 h-4" />
              Share
            </Button>
          </motion.div>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default BlogDetailPage;
