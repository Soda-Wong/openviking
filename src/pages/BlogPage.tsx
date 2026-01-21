import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Calendar, Clock, ArrowRight } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  image: string;
  category: string;
}

const blogPosts: BlogPost[] = [
  {
    id: "introducing-openviking",
    title: "Introducing OpenViking: The Context File System for AI Agents",
    excerpt: "Today we're excited to announce OpenViking, a revolutionary approach to managing AI agent context using a familiar file system paradigm.",
    date: "2026-01-10",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format",
    category: "Announcement",
  },
  {
    id: "lod-deep-dive",
    title: "Deep Dive: How LOD Supply Reduces Token Costs by 95%",
    excerpt: "Learn how our hierarchical Level of Detail system intelligently loads context, dramatically reducing token consumption while maintaining quality.",
    date: "2026-01-08",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format",
    category: "Technical",
  },
  {
    id: "self-iteration-explained",
    title: "Self-Iteration: How Your Agent Gets Smarter Over Time",
    excerpt: "Discover the magic behind OpenViking's self-iterative memory system that learns from every session and continuously optimizes your agent's context.",
    date: "2026-01-05",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&auto=format",
    category: "Technical",
  },
  {
    id: "langchain-integration",
    title: "One Line to Transform Your LangChain Agent",
    excerpt: "A step-by-step guide to integrating OpenViking with LangChain, enabling persistent memory and intelligent context management with minimal code changes.",
    date: "2026-01-03",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&auto=format",
    category: "Tutorial",
  },
  {
    id: "file-system-paradigm",
    title: "Why We Chose the File System Paradigm",
    excerpt: "The story behind our decision to model AI context as a file system, and why it's the most intuitive approach for developers.",
    date: "2025-12-28",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format",
    category: "Philosophy",
  },
  {
    id: "building-agents-2026",
    title: "Building AI Agents in 2026: The Context Challenge",
    excerpt: "An exploration of the biggest challenges facing AI agent developers today, and how unified context management is the key to solving them.",
    date: "2025-12-20",
    readTime: "10 min read",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&auto=format",
    category: "Industry",
  },
];

const BlogPage = () => {
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
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-gradient">OpenViking</span> Blog
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Insights, tutorials, and updates from the OpenViking team
            </p>
          </motion.div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post, i) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="h-full"
              >
                <Link to={`/blog/${post.id}`} className="h-full">
                  <div className="glass-card rounded-2xl overflow-hidden glow-border group h-full flex flex-col">
                    <div className="relative overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                      <span
                        className={`absolute top-4 left-4 text-xs px-3 py-1 rounded-full border ${
                          categoryColors[post.category]
                        }`}
                      >
                        {post.category}
                      </span>
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <h2 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h2>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-3 flex-1">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground mt-auto">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(post.date).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {post.readTime}
                          </span>
                        </div>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 group-hover:text-primary transition-all" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPage;
