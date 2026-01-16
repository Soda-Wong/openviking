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
  return <motion.div ref={ref} initial={{
    opacity: 0,
    y: 50
  }} animate={isInView ? {
    opacity: 1,
    y: 0
  } : {}} transition={{
    duration: 0.6
  }} className="glass-card p-6 rounded-2xl glow-border h-full">
      <div className="mb-4">
        <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-primary to-secondary mb-2">All Context in One</h3>
        
      </div>

      <div className="flex items-center gap-4 min-h-[220px]">
        {/* Chaos Zone */}
        <div className="flex-1 relative h-52">
          {chaosIcons.map(({
          Icon,
          label,
          color,
          delay
        }, i) => <motion.div key={`${label}-${phase}`} initial={{
          opacity: 0,
          scale: 0
        }} animate={phase >= 1 && phase < 3 ? {
          opacity: 1,
          scale: 1,
          x: [0, 10, -10, 5],
          y: [0, -5, 10, -5]
        } : phase >= 3 ? {
          opacity: 0,
          x: 100,
          scale: 0.5
        } : {
          opacity: 0,
          scale: 0
        }} transition={{
          duration: phase >= 3 ? 0.5 : 2,
          delay: phase >= 3 ? delay : delay,
          repeat: phase >= 1 && phase < 3 ? Infinity : 0
        }} className={`absolute ${color}`} style={{
          top: `${i % 3 * 25 + 15}%`,
          left: `${Math.floor(i / 3) * 45 + 10}%`
        }}>
              <Icon className="w-8 h-8" />
            </motion.div>)}
        </div>

        {/* OpenViking Logo Funnel */}
        <motion.div animate={phase === 2 ? {
        scale: [1, 1.15, 1]
      } : {}} transition={{
        duration: 0.4,
        repeat: phase === 2 ? 2 : 0
      }} className="flex flex-col items-center flex-shrink-0">
          <motion.div className="relative w-16 h-16 rounded-xl overflow-hidden" animate={phase >= 2 ? {
          boxShadow: ["0 0 0 0 hsl(var(--primary) / 0)", "0 0 20px 8px hsl(var(--primary) / 0.4)", "0 0 0 0 hsl(var(--primary) / 0)"]
        } : {}} transition={{
          duration: 1,
          repeat: phase === 2 ? Infinity : 0
        }}>
            <img src={openVikingLogo} alt="OpenViking" className="w-full h-full object-contain" />
            {/* Glow overlay */}
            <motion.div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-secondary/30 rounded-xl" animate={phase >= 2 ? {
            opacity: [0, 0.6, 0]
          } : {
            opacity: 0
          }} transition={{
            duration: 0.8,
            repeat: phase === 2 ? Infinity : 0
          }} />
          </motion.div>
          <ArrowRight className="text-primary mt-2 w-5 h-5" />
          {phase === 2 && <motion.p initial={{
          opacity: 0
        }} animate={{
          opacity: [0, 1, 0.7, 1]
        }} transition={{
          duration: 0.8,
          repeat: Infinity
        }} className="text-xs text-primary mt-1 font-medium">
              Processing...
            </motion.p>}
        </motion.div>

        {/* Directory Tree with Dynamic Expansion */}
        <div className="flex-1 bg-muted/30 rounded-lg p-3 min-h-[210px] overflow-visible">
          <motion.div key={phase >= 3 ? "expanded" : "collapsed"} initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} transition={{
          duration: 0.3
        }}>
            <DirectoryTree data={getTreeData()} showAnimation={phase >= 3} />
          </motion.div>
        </div>
      </div>
    </motion.div>;
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
  return <motion.div ref={ref} initial={{
    opacity: 0,
    y: 50
  }} animate={isInView ? {
    opacity: 1,
    y: 0
  } : {}} transition={{
    duration: 0.6,
    delay: 0.1
  }} className="glass-card p-6 rounded-2xl glow-border h-full">
      <div className="mb-4">
        <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-primary to-secondary mb-2">
          Recursive Context Search
        </h3>
        
      </div>

      <div className="space-y-4">
        {/* Search Bar */}
        <div className="flex items-center gap-2 bg-muted/50 rounded-lg px-4 py-3 border border-border">
          <Search className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-foreground font-mono">
            {searchText}
            <motion.span animate={{
            opacity: [1, 0]
          }} transition={{
            duration: 0.5,
            repeat: Infinity
          }}>
              |
            </motion.span>
          </span>
        </div>

        {/* Directory with scanning indicator - scrollable */}
        <div className="relative bg-muted/30 rounded-lg p-3 h-[120px] overflow-y-auto">
          {/* Scanning line animation */}
          {phase >= 1 && phase < 4 && <motion.div key={`scan-${phase}`} initial={{
          top: 0,
          opacity: 0
        }} animate={{
          top: ["0%", "100%"],
          opacity: [0, 1, 1, 0]
        }} transition={{
          duration: 1.2,
          repeat: phase < 4 ? Infinity : 0
        }} className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-secondary to-transparent rounded z-10" />}
          <DirectoryTree data={getTreeData()} showAnimation={false} />
        </div>

        {/* Context Window */}
        {phase >= 5 && <motion.div initial={{
        opacity: 0,
        scale: 0.9
      }} animate={{
        opacity: 1,
        scale: 1
      }} className="bg-success/10 border border-success/30 rounded-lg p-2">
            <div className="flex items-center gap-2 text-success text-xs">
              <CheckCircle className="w-3 h-3" />
              <span>3 contexts retrieved</span>
            </div>
          </motion.div>}
      </div>
    </motion.div>;
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
  return <motion.div ref={ref} initial={{
    opacity: 0,
    y: 50
  }} animate={isInView ? {
    opacity: 1,
    y: 0
  } : {}} transition={{
    duration: 0.6,
    delay: 0.2
  }} className="glass-card p-6 rounded-2xl glow-border h-full md:col-span-2 lg:col-span-1">
      <div className="mb-4">
        <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-primary to-secondary mb-2">
          Context Self-Iteration
        </h3>
      </div>

      <div className="flex gap-4 min-h-[180px]">
        {/* Left Column: Session + OpenViking (vertical flow) */}
        <div className="flex flex-col items-center w-36">
          {/* Session Log */}
          <div className="w-full bg-muted/50 rounded-lg p-3 border border-border">
            <p className="text-xs text-muted-foreground mb-2">Session Log</p>
            <p className="text-sm text-success flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              Task Completed
            </p>
          </div>
          
          {/* Flow line down */}
          <div className="relative h-6 w-0.5 my-1">
            <div className="absolute inset-0 bg-border" />
            <motion.div className="absolute inset-0 bg-primary" animate={phase >= 1 ? {
            scaleY: 1,
            opacity: 1
          } : {
            scaleY: 0,
            opacity: 0
          }} style={{
            transformOrigin: 'top'
          }} transition={{
            duration: 0.3
          }} />
          </div>
          
          {/* OpenViking Logo */}
          <motion.div className="relative w-12 h-12 rounded-xl overflow-hidden flex-shrink-0" animate={phase >= 2 && phase < 3 ? {
          boxShadow: ["0 0 0 0 hsl(var(--primary) / 0)", "0 0 20px 8px hsl(var(--primary) / 0.4)", "0 0 0 0 hsl(var(--primary) / 0)"]
        } : {}} transition={{
          duration: 1,
          repeat: phase >= 2 && phase < 3 ? Infinity : 0
        }}>
            <img src={openVikingLogo} alt="OpenViking" className="w-full h-full object-contain" />
            {/* Glow overlay */}
            <motion.div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-secondary/30 rounded-xl" animate={phase >= 2 && phase < 3 ? {
            opacity: [0, 0.6, 0]
          } : {
            opacity: 0
          }} transition={{
            duration: 0.8,
            repeat: phase >= 2 && phase < 3 ? Infinity : 0
          }} />
          </motion.div>
          
          {phase >= 2 && phase < 3 && <motion.p initial={{
          opacity: 0
        }} animate={{
          opacity: [0, 1, 0.7, 1]
        }} transition={{
          duration: 0.8,
          repeat: Infinity
        }} className="text-xs text-primary font-medium mt-1">
              Processing...
            </motion.p>}
        </div>

        {/* Horizontal flow line to Memory */}
        <div className="flex items-center">
          <div className="relative w-8 h-0.5">
            <div className="absolute inset-0 bg-border" />
            <motion.div className="absolute inset-0 bg-primary" animate={phase >= 3 ? {
            scaleX: 1,
            opacity: 1
          } : {
            scaleX: 0,
            opacity: 0
          }} style={{
            transformOrigin: 'left'
          }} transition={{
            duration: 0.3
          }} />
          </div>
        </div>

        {/* Right Column: Memory Updates */}
        <div className="flex-1">
          <div className="bg-muted/30 rounded-lg p-3 relative overflow-hidden h-full flex flex-col">
            <p className="text-xs text-muted-foreground mb-2">Memories/</p>
            
            {/* Initial state items */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
              <motion.span className="w-2 h-2 rounded-full bg-muted-foreground" animate={phase >= 3 ? {
              backgroundColor: ["hsl(var(--warning))", "hsl(var(--warning) / 0.3)", "hsl(var(--warning))"]
            } : {}} transition={{
              duration: 0.8,
              repeat: phase >= 3 ? Infinity : 0
            }} />
              <motion.span animate={phase >= 3 ? {
              color: "hsl(var(--warning))"
            } : {}} transition={{
              duration: 0.3
            }}>
                Experience in Error Handling
              </motion.span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
              <span className="w-2 h-2 rounded-full bg-muted-foreground" />
              Coding Standards
            </div>
            
            {/* New item appears */}
            {phase >= 3 && <motion.div initial={{
            opacity: 0,
            x: -20,
            height: 0
          }} animate={{
            opacity: 1,
            x: 0,
            height: 'auto'
          }} transition={{
            delay: 0.2
          }} className="flex items-center gap-2 text-sm text-success">
                <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                Validator Tool Usage
              </motion.div>}

            {/* Completion notification inside container */}
            {phase >= 3 && <motion.div initial={{
            opacity: 0,
            y: 5
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.5
          }} className="mt-auto pt-2 text-xs text-success flex items-center gap-1">
                <CheckCircle className="w-3 h-3" />
                Memory Iterated
              </motion.div>}
          </div>
        </div>
      </div>
    </motion.div>;
};
const FeatureCards = () => {
  return <section className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div initial={{
        opacity: 0,
        y: 30
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Core Features</h2>
          
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard1 />
          <FeatureCard2 />
          <FeatureCard3 />
        </div>
      </div>
    </section>;
};
export default FeatureCards;