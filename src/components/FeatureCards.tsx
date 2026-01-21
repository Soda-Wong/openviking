import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { FileText, Video, Image, MessageSquare, Code, Settings, Search, GitBranch, CheckCircle, ArrowRight } from "lucide-react";
import DirectoryTree from "./DirectoryTree";
import openVikingLogo from "@/assets/openviking-logo.png";
const FeatureCard1 = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-100px"
  });
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

      // Phase 2: Processing animation starts (3000ms - icons still visible)
      const timer2 = setTimeout(() => {
        if (!isCancelled) setPhase(2);
      }, 3000);

      // Phase 3: Directory tree expands, icons disappear (4500ms)
      const timer3 = setTimeout(() => {
        if (!isCancelled) setPhase(3);
      }, 4500);

      // Hold final state for 3 seconds, then loop (7500ms total = 4500 + 3000)
      const loopTimer = setTimeout(() => {
        if (!isCancelled) runAnimation();
      }, 7500);
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
  const chaosIcons = [{
    Icon: FileText,
    label: "PDF",
    color: "text-red-400",
    delay: 0
  }, {
    Icon: Video,
    label: "Video",
    color: "text-blue-400",
    delay: 0.1
  }, {
    Icon: Image,
    label: "Image",
    color: "text-green-400",
    delay: 0.2
  }, {
    Icon: MessageSquare,
    label: "Chat",
    color: "text-yellow-400",
    delay: 0.3
  }, {
    Icon: Code,
    label: "Code",
    color: "text-purple-400",
    delay: 0.4
  }, {
    Icon: Settings,
    label: "Config",
    color: "text-orange-400",
    delay: 0.5
  }];

  // Dynamic tree data that expands when phase >= 3
  const getTreeData = () => {
    if (phase < 3) {
      return [{
        name: "Resources/",
        type: "folder" as const,
        children: []
      }, {
        name: "Memories/",
        type: "folder" as const,
        children: []
      }, {
        name: "Skills/",
        type: "folder" as const,
        children: []
      }];
    }
    return [{
      name: "Resources/",
      type: "folder" as const,
      highlight: true,
      children: [{
        name: "processed_doc.md",
        type: "file" as const,
        highlight: true
      }, {
        name: "video_transcript.txt",
        type: "file" as const,
        highlight: true
      }]
    }, {
      name: "Memories/",
      type: "folder" as const,
      highlight: true,
      children: [{
        name: "session_log.json",
        type: "file" as const,
        highlight: true
      }]
    }, {
      name: "Skills/",
      type: "folder" as const,
      highlight: true,
      children: [{
        name: "tool_def.yaml",
        type: "file" as const,
        highlight: true
      }]
    }];
  };
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 50 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="glass-card p-6 rounded-2xl glow-border">
      <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-sky-200 via-cyan-400 to-teal-300 mb-2">Unified Context Layer</h3>
      <p className="text-sm text-muted-foreground mb-4">All memories, resources, and skills are organized into a unified file system-like structure.</p>
      
      <div className="relative h-48 bg-muted/20 rounded-lg overflow-hidden flex">
        {/* Left side: Chaos icons */}
        <div className="w-1/2 relative flex items-center justify-center">
          {phase < 3 && chaosIcons.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, scale: 0 }}
              animate={phase >= 1 ? { 
                opacity: 1, 
                scale: 1,
                x: [0, (i % 2 === 0 ? 10 : -10), 0],
                y: [0, (i % 3 === 0 ? -10 : 10), 0]
              } : {}}
              transition={{ 
                delay: item.delay,
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              className={`absolute ${item.color}`}
              style={{ 
                left: `${20 + (i % 3) * 25}%`, 
                top: `${20 + Math.floor(i / 3) * 40}%` 
              }}
            >
              <item.Icon className="w-6 h-6" />
            </motion.div>
          ))}
          
          {/* Processing indicator */}
          {phase === 2 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full"
              />
            </motion.div>
          )}
        </div>

        {/* Center: Arrow */}
        <div className="flex items-center justify-center px-2">
          <motion.div animate={{ x: phase >= 2 ? [0, 5, 0] : 0 }} transition={{ duration: 0.5, repeat: phase >= 2 ? Infinity : 0 }}>
            <ArrowRight className="w-6 h-6 text-primary" />
          </motion.div>
        </div>

        {/* Right side: Directory tree */}
        <div className="w-1/2 p-3 flex items-center">
          <DirectoryTree data={getTreeData()} />
        </div>
      </div>
    </motion.div>
  );
};
const FeatureCard2 = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-100px"
  });
  const [phase, setPhase] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [highlightPath, setHighlightPath] = useState<string[]>([]);
  useEffect(() => {
    if (!isInView) return;
    let isCancelled = false;
    const runAnimation = () => {
      if (isCancelled) return;

      // Reset state
      setPhase(0);
      setSearchText("");
      setHighlightPath([]);
      const fullText = "How does auth handle errors?";
      let i = 0;
      const typeTimer = setInterval(() => {
        if (isCancelled) {
          clearInterval(typeTimer);
          return;
        }
        if (i <= fullText.length) {
          setSearchText(fullText.slice(0, i));
          i++;
        } else {
          clearInterval(typeTimer);
          // Phase 1: Cursor scanning around
          if (!isCancelled) setPhase(1);

          // Phase 2: Locate Resources/ and drill to error_handler.pdf
          setTimeout(() => {
            if (!isCancelled) {
              setPhase(2);
              setHighlightPath(["Resources/", "references/", "error_handler.pdf"]);
            }
          }, 800);

          // Phase 3: Locate Skills/ and select validator.py
          setTimeout(() => {
            if (!isCancelled) {
              setPhase(3);
              setHighlightPath(["Resources/", "references/", "error_handler.pdf", "Skills/", "validator.py"]);
            }
          }, 1600);

          // Phase 4: Locate Memories/ and select Experience in Error Handling
          setTimeout(() => {
            if (!isCancelled) {
              setPhase(4);
              setHighlightPath(["Resources/", "references/", "error_handler.pdf", "Skills/", "validator.py", "Memories/", "Experience in Error Handling"]);
            }
          }, 2400);

          // Phase 5: Context retrieved
          setTimeout(() => {
            if (!isCancelled) setPhase(5);
          }, 3200);

          // Hold for 3 seconds, then loop
          setTimeout(() => {
            if (!isCancelled) runAnimation();
          }, 6200);
        }
      }, 50);
      return () => clearInterval(typeTimer);
    };
    const cleanup = runAnimation();
    return () => {
      isCancelled = true;
      if (cleanup) cleanup();
    };
  }, [isInView]);

  // Directory structure per user spec
  const getTreeData = () => {
    const isPathHighlighted = (path: string) => highlightPath.includes(path);
    return [{
      name: "Resources/",
      type: "folder" as const,
      highlight: isPathHighlighted("Resources/"),
      children: [{
        name: "references/",
        type: "folder" as const,
        highlight: isPathHighlighted("references/"),
        children: [{
          name: "error_handler.pdf",
          type: "file" as const,
          highlight: isPathHighlighted("error_handler.pdf")
        }, {
          name: "best_practice.pdf",
          type: "file" as const
        }]
      }]
    }, {
      name: "Skills/",
      type: "folder" as const,
      highlight: isPathHighlighted("Skills/"),
      children: [{
        name: "validator.py",
        type: "file" as const,
        highlight: isPathHighlighted("validator.py")
      }, {
        name: "test.py",
        type: "file" as const
      }]
    }, {
      name: "Memories/",
      type: "folder" as const,
      highlight: isPathHighlighted("Memories/"),
      children: [{
        name: "Experience in Error Handling",
        type: "file" as const,
        highlight: isPathHighlighted("Experience in Error Handling")
      }, {
        name: "Coding Standards",
        type: "file" as const
      }]
    }];
  };
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 50 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 }} className="glass-card p-6 rounded-2xl glow-border">
      <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-sky-200 via-cyan-400 to-teal-300 mb-2">Hierarchical Context Search</h3>
      <p className="text-sm text-muted-foreground mb-4">Agents search and retrieve context across multiple levels of detail.</p>
      
      <div className="relative h-48 bg-muted/20 rounded-lg overflow-hidden p-3">
        {/* Search bar */}
        <div className="flex items-center gap-2 mb-3 bg-background/50 rounded-lg px-3 py-2 border border-border/50">
          <Search className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-foreground font-mono">{searchText}<motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.5, repeat: Infinity }}>|</motion.span></span>
        </div>
        
        {/* Directory tree with highlighting */}
        <div className="overflow-hidden">
          <DirectoryTree data={getTreeData()} />
        </div>
        
        {/* Context retrieved indicator */}
        {phase >= 5 && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-3 right-3 flex items-center gap-2 text-xs text-success bg-success/10 px-2 py-1 rounded border border-success/30"
          >
            <CheckCircle className="w-3 h-3" />
            Context Retrieved
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};
const FeatureCard3 = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-100px"
  });
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    if (!isInView) return;
    let isCancelled = false;
    const runAnimation = () => {
      if (isCancelled) return;

      // Reset state
      setPhase(0);

      // Phase 1: Session submitting (arrow animates down)
      setTimeout(() => {
        if (!isCancelled) setPhase(1);
      }, 500);

      // Phase 2: OpenViking processing
      setTimeout(() => {
        if (!isCancelled) setPhase(2);
      }, 1500);

      // Phase 3: Memory updates appear
      setTimeout(() => {
        if (!isCancelled) setPhase(3);
      }, 3000);

      // Hold for 3 seconds, then loop
      setTimeout(() => {
        if (!isCancelled) runAnimation();
      }, 6000);
    };
    runAnimation();
    return () => {
      isCancelled = true;
    };
  }, [isInView]);
  return null;
};
const FeatureCards = () => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <FeatureCard1 />
      <FeatureCard2 />
      <FeatureCard3 />
    </div>
  );
};
export default FeatureCards;