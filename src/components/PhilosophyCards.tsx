import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Folder, File, Search, ArrowRight } from "lucide-react";
// Tree node component with visual branch lines
const TreeNode = ({ 
  name, 
  depth = 0, 
  isLast = false, 
  flashTarget, 
  icon: IconComponent,
  iconColor = "text-primary"
}: { 
  name: string; 
  depth?: number; 
  isLast?: boolean; 
  flashTarget?: string | null;
  icon?: React.ComponentType<{ className?: string }>;
  iconColor?: string;
}) => {
  const isFlashing = flashTarget === name;
  const Icon = IconComponent || Folder;
  
  return (
    <div className="relative">
      {/* Branch lines for depth > 0 */}
      {depth > 0 && (
        <div 
          className="absolute border-l border-slate-700" 
          style={{ 
            left: `${(depth - 1) * 16 + 6}px`, 
            top: 0, 
            height: isLast ? '12px' : '100%' 
          }} 
        />
      )}
      {depth > 0 && (
        <div 
          className="absolute border-b border-slate-700" 
          style={{ 
            left: `${(depth - 1) * 16 + 6}px`, 
            top: '12px', 
            width: '10px' 
          }} 
        />
      )}
      
      <motion.div 
        animate={isFlashing ? { 
          boxShadow: ["0 0 0px hsl(186 100% 50% / 0)", "0 0 15px hsl(186 100% 50% / 0.8)", "0 0 0px hsl(186 100% 50% / 0)"],
          color: ["inherit", "hsl(186 100% 70%)", "inherit"]
        } : {}}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-1.5 py-0.5"
        style={{ paddingLeft: `${depth * 16}px` }}
      >
        <Icon className={`w-3.5 h-3.5 ${isFlashing ? 'text-primary' : iconColor}`} />
        <span className={`text-xs ${isFlashing ? 'text-primary font-medium' : 'text-slate-300'}`}>
          {name}
        </span>
      </motion.div>
    </div>
  );
};

const Card1 = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-100px"
  });
  const [activeParticle, setActiveParticle] = useState<number | null>(null);
  const [flashTarget, setFlashTarget] = useState<string | null>(null);
  const [cycle, setCycle] = useState(0);

  const particles = [
    { icon: "📄", label: "PDF", target: "Resources/", delay: 0 },
    { icon: "💬", label: "Chat", target: "User Memories/", delay: 0.8 },
    { icon: "⚙️", label: "Tool", target: "Skills/", delay: 1.6 },
    { icon: "🧠", label: "Log", target: "Agent Memories/", delay: 2.4 },
  ];

  // Target positions for each folder (relative to tree container)
  const targetPositions: Record<string, { x: number; y: number }> = {
    "Resources/": { x: 85, y: 52 },
    "User Memories/": { x: 110, y: 32 },
    "Skills/": { x: 85, y: 88 },
    "Agent Memories/": { x: 110, y: 108 },
  };

  useEffect(() => {
    if (!isInView) return;
    
    const runCycle = () => {
      particles.forEach((p, i) => {
        // Start particle animation
        setTimeout(() => {
          setActiveParticle(i);
        }, p.delay * 1000);
        
        // Flash target folder when particle lands
        setTimeout(() => {
          setFlashTarget(p.target);
          setTimeout(() => setFlashTarget(null), 500);
        }, (p.delay + 0.6) * 1000);
      });
      
      // Reset and loop
      setTimeout(() => {
        setActiveParticle(null);
        setCycle(c => c + 1);
      }, 5000);
    };

    runCycle();
    const interval = setInterval(runCycle, 6000);
    return () => clearInterval(interval);
  }, [isInView, cycle]);

  return (
    <motion.div 
      ref={ref} 
      initial={{ opacity: 0, y: 50 }} 
      animate={isInView ? { opacity: 1, y: 0 } : {}} 
      transition={{ duration: 0.6 }} 
      className="glass-card p-6 rounded-2xl glow-border"
    >
      <h3 className="text-lg font-semibold text-gradient mb-2">
        File System Paradigm
      </h3>
      <p className="text-sm text-muted-foreground mb-4">
        Organize memories, resources, and skills via a structured directory tree.
      </p>

      <div className="relative h-56 bg-muted/20 rounded-lg overflow-hidden">
        {/* Funnel / Source area at top */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 flex items-center gap-3 px-3 py-1.5 rounded-full bg-slate-800/50 border border-slate-700/50">
          {particles.map((p, i) => (
            <motion.div
              key={`source-${i}-${cycle}`}
              initial={{ opacity: 1, scale: 1 }}
              animate={activeParticle !== null && activeParticle >= i ? { opacity: 0, scale: 0.5 } : { opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: i === activeParticle ? 0 : 0 }}
              className="text-lg"
            >
              {p.icon}
            </motion.div>
          ))}
        </div>

        {/* Animated particles traveling to destinations */}
        {particles.map((p, i) => {
          const target = targetPositions[p.target];
          return (
            <motion.div
              key={`particle-${i}-${cycle}`}
              initial={{ 
                opacity: 0, 
                x: 100, 
                y: 12,
                scale: 1
              }}
              animate={activeParticle !== null && activeParticle >= i ? {
                opacity: [0, 1, 1, 0],
                x: [100 + (i - 1.5) * 24, target.x],
                y: [12, target.y],
                scale: [1, 1, 0.8, 0.5]
              } : { opacity: 0 }}
              transition={{ 
                duration: 0.6, 
                delay: p.delay,
                ease: "easeInOut"
              }}
              className="absolute text-lg pointer-events-none z-10"
            >
              {p.icon}
            </motion.div>
          );
        })}

        {/* Hierarchical Directory Tree */}
        <div className="absolute left-4 top-14 text-left font-mono">
          {/* Root */}
          <div className="flex items-center gap-1.5 mb-1">
            <Folder className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium">viking://</span>
          </div>
          
          {/* User Branch */}
          <div className="ml-2">
            <TreeNode name="User/" depth={1} flashTarget={flashTarget} />
            <div className="relative">
              <div className="absolute left-[6px] top-0 h-full border-l border-slate-700" />
              <TreeNode name="User Memories/" depth={2} flashTarget={flashTarget} icon={File} iconColor="text-purple-400" />
              <TreeNode name="Resources/" depth={2} isLast flashTarget={flashTarget} icon={File} iconColor="text-cyan-400" />
            </div>
          </div>
          
          {/* Agent Branch */}
          <div className="ml-2 mt-1">
            <TreeNode name="Agent/" depth={1} isLast flashTarget={flashTarget} />
            <div className="relative">
              <TreeNode name="Skills/" depth={2} flashTarget={flashTarget} icon={File} iconColor="text-amber-400" />
              <TreeNode name="Agent Memories/" depth={2} isLast flashTarget={flashTarget} icon={File} iconColor="text-emerald-400" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
const Card2 = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-100px"
  });
  const [scanY, setScanY] = useState(0);
  useEffect(() => {
    if (isInView) {
      const interval = setInterval(() => {
        setScanY(y => (y + 1) % 3);
      }, 1500);
      return () => clearInterval(interval);
    }
  }, [isInView]);
  const layers = [{
    label: "L0 Abstract",
    tokens: "tokens < 100",
    width: "40%",
    color: "from-emerald-500 to-emerald-500/50",
    glowColor: "0 0 20px hsl(142 76% 45% / 0.6)",
    scanColor: "bg-emerald-500",
    message: "Agent perceive rapidly",
    messageColor: "text-emerald-400"
  }, {
    label: "L1 Overview",
    tokens: "tokens < 2k",
    width: "70%",
    color: "from-purple-500 to-purple-500/50",
    glowColor: "0 0 20px hsl(270 80% 60% / 0.6)",
    scanColor: "bg-purple-500",
    message: "Agent initiate operation",
    messageColor: "text-purple-400"
  }, {
    label: "L2 Detail",
    tokens: "Uncertain Token",
    width: "100%",
    color: "from-orange-500 to-orange-500/50",
    glowColor: "0 0 20px hsl(38 92% 50% / 0.6)",
    scanColor: "bg-orange-500",
    message: "Agent work deeply",
    messageColor: "text-orange-400"
  }];
  return <motion.div ref={ref} initial={{
    opacity: 0,
    y: 50
  }} animate={isInView ? {
    opacity: 1,
    y: 0
  } : {}} transition={{
    duration: 0.6,
    delay: 0.1
  }} className="glass-card p-6 rounded-2xl glow-border">
      <h3 className="text-lg font-semibold text-gradient mb-2">
        Hierarchical (LOD) Context
      </h3>
      <p className="text-sm text-muted-foreground mb-6">
        L0/L1/L2 layers for on-demand loading, reducing token costs by 95%.
      </p>

      <div className="relative h-48 flex flex-col justify-center items-center gap-3 overflow-hidden">
        {/* Status message display area */}
        <motion.div 
          key={scanY}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className={`absolute top-2 right-3 text-xs px-2 py-1 rounded bg-background/60 border border-border/50 ${layers[scanY]?.messageColor || 'text-primary'} font-medium`}
        >
          {layers[scanY]?.message}
        </motion.div>

        {layers.map((layer, i) => <motion.div key={layer.label} animate={{
        scale: scanY === i ? 1.05 : 1,
        boxShadow: scanY === i ? layer.glowColor : "none"
      }} className={`relative bg-gradient-to-r ${layer.color} rounded-lg px-4 py-2 text-center`} style={{
        width: layer.width
      }}>
            <p className="text-xs font-medium text-white">{layer.label}</p>
            <p className="text-[10px] text-white/70">{layer.tokens}</p>
          </motion.div>)}

        {/* Scanner beam */}
        <motion.div animate={{
        top: `${scanY * 33 + 20}%`
      }} transition={{
        duration: 0.3
      }} className={`absolute left-4 right-4 h-0.5 bg-gradient-to-r from-transparent ${layers[scanY]?.scanColor || 'via-primary'} to-transparent`} style={{
        boxShadow: scanY === 0 ? '0 0 10px hsl(142 76% 45% / 0.8)' : scanY === 1 ? '0 0 10px hsl(270 80% 60% / 0.8)' : '0 0 10px hsl(38 92% 50% / 0.8)'
      }} />
      </div>
    </motion.div>;
};
// LOD Badge component with data injection animation
const LODBadge = ({ label, color, isActive }: { label: string; color: string; isActive: boolean }) => (
  <div className="flex flex-col items-center gap-1">
    <motion.div
      animate={{
        y: isActive ? [0, 3, 0] : 0,
        opacity: isActive ? 1 : 0.5,
      }}
      transition={{ duration: 0.4, repeat: isActive ? Infinity : 0, repeatDelay: 0.8 }}
      className={`text-[9px] px-1.5 py-0.5 rounded-full ${color} font-medium`}
    >
      {label}
    </motion.div>
    <div className={`w-px h-2 ${isActive ? 'bg-current opacity-60' : 'bg-slate-600'}`} />
  </div>
);

// Pipeline Node component
const PipelineNode = ({ 
  label, 
  isActive, 
  lodBadge,
  isDiamond = false,
  className = ""
}: { 
  label: string; 
  isActive: boolean; 
  lodBadge?: { label: string; color: string };
  isDiamond?: boolean;
  className?: string;
}) => (
  <div className="flex flex-col items-center gap-0">
    {lodBadge && <LODBadge {...lodBadge} isActive={isActive} />}
    <motion.div
      animate={{
        scale: isActive ? 1.08 : 1,
        boxShadow: isActive ? "0 0 12px hsl(186 100% 50% / 0.5)" : "none"
      }}
      className={`
        ${isDiamond ? 'rotate-45 w-7 h-7' : 'rounded px-2 py-1'}
        bg-slate-800/80 border border-slate-600 flex items-center justify-center
        ${isActive ? 'border-cyan-500/60' : ''}
        ${className}
      `}
    >
      <span className={`text-[9px] text-slate-300 font-medium ${isDiamond ? '-rotate-45' : ''}`}>
        {label}
      </span>
    </motion.div>
  </div>
);

const Card3 = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-100px"
  });
  
  // Animation: 0-1 Query, 2 Global, 3 Intent, 4-7 Hierarchical loop (4 DirPos, 5 LocalSem, 6 Rerank, 7 TopK), 
  // 8-11 second loop, 12 exit to Relevant Context
  const [step, setStep] = useState(0);
  const totalSteps = 13;
  
  useEffect(() => {
    if (isInView) {
      const interval = setInterval(() => {
        setStep(s => (s + 1) % totalSteps);
      }, 400);
      return () => clearInterval(interval);
    }
  }, [isInView]);

  // Determine which node is active based on step
  const isQueryActive = step <= 1;
  const isGlobalActive = step === 2;
  const isIntentActive = step === 3;
  const isDirPosActive = step === 4 || step === 8;
  const isLocalSemActive = step === 5 || step === 9;
  const isRerankActive = step === 6 || step === 10;
  const isTopKActive = step === 7 || step === 11;
  const isRelevantActive = step === 12;
  const isInHierarchical = step >= 4 && step <= 11;

  // Signal dot position calculation
  const getDotPosition = () => {
    if (step <= 1) return { x: 0, y: 0 }; // Query
    if (step === 2) return { x: 52, y: 0 }; // Global Semantic
    if (step === 3) return { x: 104, y: 0 }; // Intent
    if (step === 4 || step === 8) return { x: 166, y: 0 }; // Dir Position
    if (step === 5 || step === 9) return { x: 218, y: 0 }; // Local Semantic
    if (step === 6 || step === 10) return { x: 270, y: 0 }; // Rerank
    if (step === 7 || step === 11) return { x: 322, y: 0 }; // Top K
    if (step === 12) return { x: 394, y: 0 }; // Relevant Context
    return { x: 0, y: 0 };
  };

  const dotPos = getDotPosition();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="glass-card p-6 rounded-2xl glow-border"
    >
      <h3 className="text-lg font-semibold text-gradient mb-2">
        Recursive Retrieval & Rerank
      </h3>
      <p className="text-sm text-muted-foreground mb-4">
        Directory positioning + semantic search for precise top-k results.
      </p>

      <div className="relative h-52 overflow-hidden">
        {/* Main horizontal pipeline */}
        <div className="absolute inset-0 flex items-center">
          <div className="relative flex items-center gap-2 w-full pl-2">
            
            {/* Query Node */}
            <div className="flex flex-col items-center gap-0 flex-shrink-0">
              <div className="h-5" /> {/* Spacer for alignment */}
              <motion.div
                animate={{
                  scale: isQueryActive ? 1.1 : 1,
                  boxShadow: isQueryActive ? "0 0 12px hsl(186 100% 50% / 0.6)" : "none"
                }}
                className="w-8 h-8 rounded-full bg-cyan-500/20 border border-cyan-500/60 flex items-center justify-center"
              >
                <Search className="w-4 h-4 text-cyan-400" />
              </motion.div>
              <span className="text-[8px] text-slate-400 mt-1">Query</span>
            </div>

            <ArrowRight className="text-slate-600 w-3 h-3 flex-shrink-0" />

            {/* Global Semantic Search */}
            <PipelineNode 
              label="Global Sem" 
              isActive={isGlobalActive}
              lodBadge={{ label: "L0", color: "bg-emerald-500/30 text-emerald-300" }}
            />

            <ArrowRight className="text-slate-600 w-3 h-3 flex-shrink-0" />

            {/* Intent Analyzer */}
            <div className="flex flex-col items-center gap-0 flex-shrink-0">
              <div className="h-5" />
              <motion.div
                animate={{
                  scale: isIntentActive ? 1.08 : 1,
                  boxShadow: isIntentActive ? "0 0 12px hsl(270 80% 60% / 0.5)" : "none"
                }}
                className="rounded px-2 py-1 bg-purple-500/20 border border-purple-500/50 flex items-center justify-center"
              >
                <span className="text-[9px] text-purple-300 font-medium">Intent</span>
              </motion.div>
              <span className="text-[8px] text-slate-400 mt-1">Analyze</span>
            </div>

            <ArrowRight className="text-slate-600 w-3 h-3 flex-shrink-0" />

            {/* Hierarchical Retriever Scope - Dashed Container */}
            <motion.div 
              animate={{
                borderColor: isInHierarchical ? "hsl(186 100% 50% / 0.4)" : "hsl(215 20% 35% / 0.6)"
              }}
              className="relative border-2 border-dashed rounded-lg px-3 py-3 flex items-center gap-2 flex-shrink-0"
            >
              {/* Label for the scope */}
              <span className="absolute -top-2 left-3 text-[7px] text-slate-500 bg-background px-1">
                Hierarchical Retriever
              </span>

              {/* Directory Position */}
              <PipelineNode 
                label="Dir Pos" 
                isActive={isDirPosActive}
                lodBadge={{ label: "L1", color: "bg-purple-500/30 text-purple-300" }}
              />

              <ArrowRight className="text-slate-600 w-3 h-3 flex-shrink-0" />

              {/* Local Semantic Search */}
              <PipelineNode 
                label="Local Sem" 
                isActive={isLocalSemActive}
                lodBadge={{ label: "L2", color: "bg-orange-500/30 text-orange-300" }}
              />

              <ArrowRight className="text-slate-600 w-3 h-3 flex-shrink-0" />

              {/* Rerank */}
              <PipelineNode 
                label="Rerank" 
                isActive={isRerankActive}
                lodBadge={{ label: "L1", color: "bg-purple-500/30 text-purple-300" }}
              />

              <ArrowRight className="text-slate-600 w-3 h-3 flex-shrink-0" />

              {/* Top K - Diamond */}
              <div className="flex flex-col items-center gap-0 flex-shrink-0">
                <div className="h-5" />
                <motion.div
                  animate={{
                    scale: isTopKActive ? 1.15 : 1,
                    boxShadow: isTopKActive ? "0 0 15px hsl(38 92% 50% / 0.6)" : "none"
                  }}
                  className="rotate-45 w-7 h-7 bg-amber-500/20 border border-amber-500/60 flex items-center justify-center"
                >
                  <span className="text-[8px] text-amber-300 font-bold -rotate-45">K</span>
                </motion.div>
                <span className="text-[8px] text-slate-400 mt-1">Top K</span>
              </div>

              {/* Recursion Loop - SVG curved line underneath */}
              <svg 
                className="absolute -bottom-4 left-6 right-6 h-6 pointer-events-none"
                viewBox="0 0 160 24"
                preserveAspectRatio="none"
              >
                <path
                  d="M 145 0 Q 145 20, 80 20 Q 15 20, 15 0"
                  fill="none"
                  stroke="hsl(215 20% 40% / 0.5)"
                  strokeWidth="1.5"
                  strokeDasharray="4 2"
                />
                {/* Animated dot on the recursion path */}
                {(step === 7 || step === 11) && (
                  <motion.circle
                    initial={{ offsetDistance: "0%" }}
                    animate={{ offsetDistance: "100%" }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    r="3"
                    fill="hsl(186 100% 50%)"
                    style={{
                      offsetPath: "path('M 145 0 Q 145 20, 80 20 Q 15 20, 15 0')"
                    }}
                  />
                )}
              </svg>
            </motion.div>

            <ArrowRight className="text-slate-600 w-3 h-3 flex-shrink-0" />

            {/* Relevant Context - Final Output */}
            <div className="flex flex-col items-center gap-0 flex-shrink-0">
              <div className="h-5" />
              <motion.div
                animate={{
                  scale: isRelevantActive ? 1.1 : 1,
                  boxShadow: isRelevantActive ? "0 0 15px hsl(142 76% 45% / 0.6)" : "none"
                }}
                className="rounded px-2 py-1 bg-emerald-500/20 border border-emerald-500/60 flex items-center justify-center"
              >
                <span className="text-[9px] text-emerald-300 font-medium">Context</span>
              </motion.div>
              <span className="text-[8px] text-slate-400 mt-1">Relevant</span>
            </div>

          </div>
        </div>

        {/* Traveling Signal Dot */}
        <motion.div
          animate={{
            x: dotPos.x,
            opacity: step <= 12 ? 1 : 0
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-cyan-400 z-10"
          style={{
            boxShadow: "0 0 8px hsl(186 100% 50% / 0.8), 0 0 16px hsl(186 100% 50% / 0.4)"
          }}
        />
      </div>
    </motion.div>
  );
};
const Card4 = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-100px"
  });
  const [logs, setLogs] = useState<string[]>([]);
  useEffect(() => {
    if (isInView) {
      const logMessages = ["Updated: User Preference", "Learned: Python Error Handling", "Refined: Project Scope", "Stored: API Best Practices"];
      let i = 0;
      const interval = setInterval(() => {
        setLogs(prev => {
          const newLogs = [...prev, logMessages[i % logMessages.length]];
          return newLogs.slice(-3);
        });
        i++;
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isInView]);
  return <motion.div ref={ref} initial={{
    opacity: 0,
    y: 50
  }} animate={isInView ? {
    opacity: 1,
    y: 0
  } : {}} transition={{
    duration: 0.6,
    delay: 0.3
  }} className="glass-card p-6 rounded-2xl glow-border">
      <h3 className="text-lg font-semibold text-gradient mb-2">
        Observable & Self-Iterative
      </h3>
      <p className="text-sm text-muted-foreground mb-6">
        Traceable retrieval paths; session insights auto-optimize memories.
      </p>

      <div className="relative h-48 flex items-center justify-center overflow-hidden">
        {/* Infinity Loop Visualization */}
        <div className="relative flex items-center gap-6">
          {/* Agent Node */}
          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-cyan-500/20 to-cyan-500/5 border border-cyan-500/30 flex flex-col items-center justify-center z-10">
            <span className="text-xl">🤖</span>
            <span className="text-[10px] text-cyan-400 mt-0.5">Agent</span>
          </div>

          {/* Infinity Loop Connection */}
          <div className="relative w-28 h-20">
            {/* Infinity symbol path (visual guide) */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 112 80">
              <path 
                d="M 28 40 C 28 20, 56 20, 56 40 C 56 60, 84 60, 84 40 C 84 20, 56 20, 56 40 C 56 60, 28 60, 28 40" 
                fill="none" 
                stroke="hsl(var(--border))" 
                strokeWidth="1.5"
                strokeDasharray="4 4"
                opacity="0.4"
              />
            </svg>
            
            {/* Blue particles: Viking → Agent (Context Supply) - Top path */}
            {[0, 1, 2].map((i) => (
              <motion.div
                key={`supply-${i}`}
                animate={{
                  x: [84, 56, 28],
                  y: [0, -12, 0],
                  opacity: [0, 1, 1, 0]
                }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  delay: i * 0.6,
                  ease: "easeInOut"
                }}
                className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_hsl(186_100%_50%/0.8)]"
              />
            ))}
            
            {/* Purple particles: Agent → Viking (Feedback) - Bottom path */}
            {[0, 1, 2].map((i) => (
              <motion.div
                key={`feedback-${i}`}
                animate={{
                  x: [28, 56, 84],
                  y: [0, 12, 0],
                  opacity: [0, 1, 1, 0]
                }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  delay: i * 0.6,
                  ease: "easeInOut"
                }}
                className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_8px_hsl(270_80%_60%/0.8)]"
              />
            ))}

            {/* Center infinity icon */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-muted-foreground/50 text-lg font-light">
              ∞
            </div>
          </div>

          {/* Viking Node */}
          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-500/5 border border-purple-500/30 flex flex-col items-center justify-center z-10">
            <span className="text-lg font-bold text-gradient">V</span>
            <span className="text-[10px] text-purple-400 mt-0.5">Viking</span>
          </div>
        </div>

        {/* Toast Notifications / Terminal Logs - Inside container */}
        <div className="absolute right-3 top-2 bottom-2 w-32 flex flex-col justify-center gap-1 overflow-hidden">
          {logs.map((log, i) => (
            <motion.div 
              key={`${log}-${i}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-slate-800/80 border border-purple-500/30 rounded px-2 py-1 text-[9px] text-purple-300/90 font-mono truncate"
            >
              <span className="text-purple-400">›</span> {log}
            </motion.div>
          ))}
        </div>

        {/* Flow labels */}
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-4 text-[8px]">
          <span className="text-cyan-400/70">← Context Supply</span>
          <span className="text-purple-400/70">Feedback →</span>
        </div>
      </div>
    </motion.div>;
};
const PhilosophyCards = () => {
  return <section className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      <div className="container mx-auto px-6 relative z-10">
        <motion.div initial={{
        opacity: 0,
        y: 30
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Design Philosophy</h2>
          
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card1 />
          <Card2 />
          <Card3 />
          <Card4 />
        </div>
      </div>
    </section>;
};
export default PhilosophyCards;