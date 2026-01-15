import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  FileText,
  Video,
  Image,
  MessageSquare,
  Code,
  Settings,
  Search,
  GitBranch,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import DirectoryTree from "./DirectoryTree";
import openVikingLogo from "@/assets/openviking-logo.png";

const FeatureCard1 = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let isCancelled = false;
    
    const runAnimation = () => {
      if (isCancelled) return;
      
      // Reset to phase 0
      setPhase(0);
      
      // Phase 1: Chaos icons appear and float (500ms delay)
      const timer1 = setTimeout(() => {
        if (!isCancelled) setPhase(1);
      }, 500);
      
      // Phase 2: Icons flow into funnel (2000ms)
      const timer2 = setTimeout(() => {
        if (!isCancelled) setPhase(2);
      }, 2000);
      
      // Phase 3: Directory tree expands (3500ms)
      const timer3 = setTimeout(() => {
        if (!isCancelled) setPhase(3);
      }, 3500);
      
      // Hold final state for 3 seconds, then loop (6500ms total = 3500 + 3000)
      const loopTimer = setTimeout(() => {
        if (!isCancelled) runAnimation();
      }, 6500);
      
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
        clearTimeout(loopTimer);
      };
    };
    
    const cleanup = runAnimation();
    
    return () => {
      isCancelled = true;
      if (cleanup) cleanup();
    };
  }, [isInView]);

  const chaosIcons = [
    { Icon: FileText, label: "PDF", color: "text-red-400", delay: 0 },
    { Icon: Video, label: "Video", color: "text-blue-400", delay: 0.1 },
    { Icon: Image, label: "Image", color: "text-green-400", delay: 0.2 },
    { Icon: MessageSquare, label: "Chat", color: "text-yellow-400", delay: 0.3 },
    { Icon: Code, label: "Code", color: "text-purple-400", delay: 0.4 },
    { Icon: Settings, label: "Config", color: "text-orange-400", delay: 0.5 },
  ];

  // Dynamic tree data that expands when phase >= 3
  const getTreeData = () => {
    if (phase < 3) {
      return [
        { name: "Resource/", type: "folder" as const, children: [] },
        { name: "Memory/", type: "folder" as const, children: [] },
        { name: "Skill/", type: "folder" as const, children: [] },
      ];
    }
    
    return [
      {
        name: "Resource/",
        type: "folder" as const,
        highlight: true,
        children: [
          { name: "processed_doc.md", type: "file" as const, highlight: true },
          { name: "video_transcript.txt", type: "file" as const, highlight: true },
        ],
      },
      {
        name: "Memory/",
        type: "folder" as const,
        highlight: true,
        children: [
          { name: "session_log.json", type: "file" as const, highlight: true },
        ],
      },
      {
        name: "Skill/",
        type: "folder" as const,
        highlight: true,
        children: [
          { name: "tool_def.yaml", type: "file" as const, highlight: true },
        ],
      },
    ];
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="glass-card p-6 rounded-2xl glow-border h-full"
    >
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-gradient mb-2">All Context in One</h3>
        <p className="text-sm text-muted-foreground">The Ingestion Engine</p>
      </div>

      <div className="flex items-center gap-4 min-h-[200px]">
        {/* Chaos Zone */}
        <div className="flex-1 relative h-48">
          {chaosIcons.map(({ Icon, label, color, delay }, i) => (
            <motion.div
              key={`${label}-${phase}`}
              initial={{ opacity: 0, scale: 0 }}
              animate={
                phase >= 1 && phase < 2
                  ? {
                      opacity: 1,
                      scale: 1,
                      x: [0, 10, -10, 5],
                      y: [0, -5, 10, -5],
                    }
                  : phase >= 2
                  ? { opacity: 0, x: 100, scale: 0.5 }
                  : { opacity: 0, scale: 0 }
              }
              transition={{
                duration: phase >= 2 ? 0.5 : 2,
                delay: phase >= 2 ? delay : delay,
                repeat: phase >= 1 && phase < 2 ? Infinity : 0,
              }}
              className={`absolute ${color}`}
              style={{
                top: `${(i % 3) * 30 + 20}%`,
                left: `${Math.floor(i / 3) * 50 + 10}%`,
              }}
            >
              <Icon className="w-8 h-8" />
            </motion.div>
          ))}
        </div>

        {/* OpenViking Logo Funnel */}
        <motion.div
          animate={phase === 2 ? { scale: [1, 1.15, 1] } : {}}
          transition={{ duration: 0.4, repeat: phase === 2 ? 2 : 0 }}
          className="flex flex-col items-center"
        >
          <motion.div 
            className="relative w-16 h-16 rounded-xl overflow-hidden"
            animate={phase >= 2 ? { 
              boxShadow: [
                "0 0 0 0 hsl(var(--primary) / 0)",
                "0 0 20px 8px hsl(var(--primary) / 0.4)",
                "0 0 0 0 hsl(var(--primary) / 0)"
              ]
            } : {}}
            transition={{ duration: 1, repeat: phase === 2 ? Infinity : 0 }}
          >
            <img 
              src={openVikingLogo} 
              alt="OpenViking" 
              className="w-full h-full object-contain"
            />
            {/* Glow overlay */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-br from-primary/30 to-secondary/30 rounded-xl"
              animate={phase >= 2 ? { opacity: [0, 0.6, 0] } : { opacity: 0 }}
              transition={{ duration: 0.8, repeat: phase === 2 ? Infinity : 0 }}
            />
          </motion.div>
          <ArrowRight className="text-primary mt-2 w-5 h-5" />
          {phase === 2 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0.7, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="text-xs text-primary mt-1 font-medium"
            >
              Processing...
            </motion.p>
          )}
        </motion.div>

        {/* Directory Tree with Dynamic Expansion */}
        <div className="flex-1 bg-muted/30 rounded-lg p-3 h-48 overflow-hidden">
          <motion.div
            key={phase >= 3 ? "expanded" : "collapsed"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <DirectoryTree data={getTreeData()} showAnimation={phase >= 3} />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const FeatureCard2 = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [phase, setPhase] = useState(0);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    if (isInView) {
      const fullText = "How does auth handle errors?";
      let i = 0;
      const typeTimer = setInterval(() => {
        if (i <= fullText.length) {
          setSearchText(fullText.slice(0, i));
          i++;
        } else {
          clearInterval(typeTimer);
          setPhase(1);
          setTimeout(() => setPhase(2), 1000);
          setTimeout(() => setPhase(3), 2500);
        }
      }, 50);
      return () => clearInterval(typeTimer);
    }
  }, [isInView]);

  const treeData = [
    {
      name: "Resources/",
      type: "folder" as const,
      children: [
        {
          name: "security_protocol.pdf",
          type: "file" as const,
          highlight: phase >= 2,
        },
        { name: "readme.md", type: "file" as const },
      ],
    },
    {
      name: "Skills/",
      type: "folder" as const,
      children: [
        { name: "auth_handler.py", type: "file" as const, highlight: phase >= 2 },
        { name: "utils.js", type: "file" as const },
      ],
    },
    {
      name: "Sessions/",
      type: "folder" as const,
      children: [{ name: "conversation_01.json", type: "file" as const }],
    },
  ];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="glass-card p-6 rounded-2xl glow-border h-full"
    >
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-gradient mb-2">
          Recursive Context Search
        </h3>
        <p className="text-sm text-muted-foreground">The Retrieval Logic</p>
      </div>

      <div className="space-y-4">
        {/* Search Bar */}
        <div className="flex items-center gap-2 bg-muted/50 rounded-lg px-4 py-3 border border-border">
          <Search className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-foreground font-mono">
            {searchText}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
            >
              |
            </motion.span>
          </span>
        </div>

        {/* Directory with pulse */}
        <div className="relative bg-muted/30 rounded-lg p-3 min-h-[160px]">
          {phase >= 1 && (
            <motion.div
              initial={{ top: 0, opacity: 0 }}
              animate={{ top: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
              transition={{ duration: 1.5 }}
              className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-secondary to-transparent rounded"
            />
          )}
          <DirectoryTree data={treeData} showAnimation={false} />
        </div>

        {/* Context Window */}
        {phase >= 3 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-success/10 border border-success/30 rounded-lg p-3"
          >
            <div className="flex items-center gap-2 text-success text-sm mb-2">
              <CheckCircle className="w-4 h-4" />
              <span>Context Retrieved</span>
            </div>
            <code className="text-xs text-muted-foreground font-mono">
              def handle_auth_error(e): ...
            </code>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

const FeatureCard3 = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (isInView) {
      setTimeout(() => setPhase(1), 500);
      setTimeout(() => setPhase(2), 1500);
      setTimeout(() => setPhase(3), 3000);
    }
  }, [isInView]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="glass-card p-6 rounded-2xl glow-border h-full md:col-span-2 lg:col-span-1"
    >
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-gradient mb-2">
          Context Self-Iteration
        </h3>
        <p className="text-sm text-muted-foreground">The Evolution</p>
      </div>

      <div className="flex items-center justify-between gap-6 min-h-[200px]">
        {/* Session Window */}
        <div className="flex-1 space-y-3">
          <div className="bg-muted/50 rounded-lg p-3 border border-border">
            <p className="text-xs text-muted-foreground mb-2">Session Log</p>
            <p className="text-sm text-success flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              Task Completed
            </p>
          </div>
          <motion.button
            animate={
              phase >= 1 && phase < 2
                ? {
                    scale: [1, 1.05, 1],
                    boxShadow: [
                      "0 0 0 0 hsl(186 100% 50% / 0)",
                      "0 0 20px 5px hsl(186 100% 50% / 0.3)",
                      "0 0 0 0 hsl(186 100% 50% / 0)",
                    ],
                  }
                : {}
            }
            transition={{ duration: 1, repeat: phase >= 1 && phase < 2 ? Infinity : 0 }}
            className="w-full bg-primary/20 border border-primary/50 text-primary text-sm py-2 px-4 rounded-lg flex items-center justify-center gap-2"
          >
            <GitBranch className="w-4 h-4" />
            Commit to OpenViking
          </motion.button>
        </div>

        {/* Data Orb */}
        <motion.div
          animate={
            phase >= 2
              ? {
                  scale: [0, 1.2, 0.8],
                  opacity: [0, 1, 0],
                }
              : {}
          }
          transition={{ duration: 1 }}
          className="w-16 h-16 rounded-full bg-gradient-to-br from-warning to-secondary flex items-center justify-center"
          style={{ display: phase >= 2 && phase < 3 ? "flex" : "none" }}
        >
          <span className="text-2xl">💡</span>
        </motion.div>

        {/* Directory Update */}
        <div className="flex-1">
          <div className="bg-muted/30 rounded-lg p-3 relative overflow-hidden">
            <p className="text-xs text-muted-foreground mb-2">Memory Updates</p>
            {phase >= 3 && (
              <>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-2 text-sm text-warning mb-1"
                >
                  <span className="w-2 h-2 rounded-full bg-warning animate-pulse" />
                  user_profile.json
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center gap-2 text-sm text-warning"
                >
                  <span className="w-2 h-2 rounded-full bg-warning animate-pulse" />
                  task_strategies.md
                </motion.div>
              </>
            )}
          </div>

          {/* Toast Notification */}
          {phase >= 3 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-3 bg-success/10 border border-success/30 rounded-lg p-2 text-xs text-success flex items-center gap-2"
            >
              <CheckCircle className="w-3 h-3" />
              Context Memory Iterated
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const FeatureCards = () => {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Core Features</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A unified file system paradigm for all your AI agent context needs
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard1 />
          <FeatureCard2 />
          <FeatureCard3 />
        </div>
      </div>
    </section>
  );
};

export default FeatureCards;
