import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Folder, File, Search, ArrowRight } from "lucide-react";
import vikingLogo from "@/assets/viking-logo.png";
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
  icon?: React.ComponentType<{
    className?: string;
  }>;
  iconColor?: string;
}) => {
  const isFlashing = flashTarget === name;
  const Icon = IconComponent || Folder;
  return <div className="relative">
      {/* Branch lines for depth > 0 */}
      {depth > 0 && <div className="absolute border-l border-slate-700" style={{
      left: `${(depth - 1) * 16 + 6}px`,
      top: 0,
      height: isLast ? '12px' : '100%'
    }} />}
      {depth > 0 && <div className="absolute border-b border-slate-700" style={{
      left: `${(depth - 1) * 16 + 6}px`,
      top: '12px',
      width: '10px'
    }} />}
      
      <motion.div animate={isFlashing ? {
      boxShadow: ["0 0 0px hsl(186 100% 50% / 0)", "0 0 15px hsl(186 100% 50% / 0.8)", "0 0 0px hsl(186 100% 50% / 0)"],
      color: ["inherit", "hsl(186 100% 70%)", "inherit"]
    } : {}} transition={{
      duration: 0.5
    }} className="flex items-center gap-1.5 py-0.5" style={{
      paddingLeft: `${depth * 16}px`
    }}>
        <Icon className={`w-3.5 h-3.5 ${isFlashing ? 'text-primary' : iconColor}`} />
        <span className={`text-xs ${isFlashing ? 'text-primary font-medium' : 'text-slate-300'}`}>
          {name}
        </span>
      </motion.div>
    </div>;
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
  const particles = [{
    icon: "📄",
    label: "PDF",
    target: "Resources/",
    delay: 0
  }, {
    icon: "💬",
    label: "Chat",
    target: "User Memories/",
    delay: 0.8
  }, {
    icon: "⚙️",
    label: "Tool",
    target: "Skills/",
    delay: 1.6
  }, {
    icon: "🧠",
    label: "Log",
    target: "Agent Memories/",
    delay: 2.4
  }];

  // Target positions for each folder (relative to tree container)
  const targetPositions: Record<string, {
    x: number;
    y: number;
  }> = {
    "Resources/": {
      x: 85,
      y: 52
    },
    "User Memories/": {
      x: 110,
      y: 32
    },
    "Skills/": {
      x: 85,
      y: 88
    },
    "Agent Memories/": {
      x: 110,
      y: 108
    }
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
  return <motion.div ref={ref} initial={{
    opacity: 0,
    y: 50
  }} animate={isInView ? {
    opacity: 1,
    y: 0
  } : {}} transition={{
    duration: 0.6
  }} className="glass-card p-6 rounded-2xl glow-border">
      <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-sky-200 via-cyan-400 to-teal-300 mb-2">
        Context Organization as a File System
      </h3>
      <p className="text-sm text-muted-foreground mb-4">Instead of flat context pools, all memories, resources, and skills are organized within a file system–like hierarchy, giving agents a stable and navigable context structure.</p>

      <div className="relative h-56 bg-muted/20 rounded-lg overflow-hidden">
        {/* Funnel / Source area at top */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 flex items-center gap-3 px-3 py-1.5 rounded-full bg-slate-800/50 border border-slate-700/50">
          {particles.map((p, i) => <motion.div key={`source-${i}-${cycle}`} initial={{
          opacity: 1,
          scale: 1
        }} animate={activeParticle !== null && activeParticle >= i ? {
          opacity: 0,
          scale: 0.5
        } : {
          opacity: 1,
          scale: 1
        }} transition={{
          duration: 0.3,
          delay: i === activeParticle ? 0 : 0
        }} className="text-lg">
              {p.icon}
            </motion.div>)}
        </div>

        {/* Animated particles traveling to destinations */}
        {particles.map((p, i) => {
        const target = targetPositions[p.target];
        return <motion.div key={`particle-${i}-${cycle}`} initial={{
          opacity: 0,
          x: 100,
          y: 12,
          scale: 1
        }} animate={activeParticle !== null && activeParticle >= i ? {
          opacity: [0, 1, 1, 0],
          x: [100 + (i - 1.5) * 24, target.x],
          y: [12, target.y],
          scale: [1, 1, 0.8, 0.5]
        } : {
          opacity: 0
        }} transition={{
          duration: 0.6,
          delay: p.delay,
          ease: "easeInOut"
        }} className="absolute text-lg pointer-events-none z-10">
              {p.icon}
            </motion.div>;
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
    </motion.div>;
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
    width: "92%",
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
      <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-sky-200 via-cyan-400 to-teal-300 mb-2">Layered Context Loading</h3>
      <p className="text-sm text-muted-foreground mb-6">Context is decomposed into L0, L1, and L2 layers. Agents load and offload context on demand, reducing token usage by up to 95%.</p>

      <div className="relative h-48 flex flex-col justify-center items-center gap-3 overflow-hidden">
        {/* Status message display area */}
        <motion.div key={scanY} initial={{
        opacity: 0,
        y: 5
      }} animate={{
        opacity: 1,
        y: 0
      }} className={`absolute top-2 right-3 text-xs px-2 py-1 rounded bg-background/60 border border-border/50 ${layers[scanY]?.messageColor || 'text-primary'} font-medium`}>
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
const LODBadge = ({
  label,
  color,
  isActive
}: {
  label: string;
  color: string;
  isActive: boolean;
}) => <div className="flex flex-col items-center gap-1">
    <motion.div animate={{
    y: isActive ? [0, 3, 0] : 0,
    opacity: isActive ? 1 : 0.5
  }} transition={{
    duration: 0.4,
    repeat: isActive ? Infinity : 0,
    repeatDelay: 0.8
  }} className={`text-[9px] px-1.5 py-0.5 rounded-full ${color} font-medium`}>
      {label}
    </motion.div>
    <div className={`w-px h-2 ${isActive ? 'bg-current opacity-60' : 'bg-slate-600'}`} />
  </div>;

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
  lodBadge?: {
    label: string;
    color: string;
  };
  isDiamond?: boolean;
  className?: string;
}) => <div className="flex flex-col items-center gap-0">
    {lodBadge && <LODBadge {...lodBadge} isActive={isActive} />}
    <motion.div animate={{
    scale: isActive ? 1.08 : 1,
    boxShadow: isActive ? "0 0 12px hsl(186 100% 50% / 0.5)" : "none"
  }} className={`
        ${isDiamond ? 'rotate-45 w-7 h-7' : 'rounded px-2 py-1'}
        bg-slate-800/80 border border-slate-600 flex items-center justify-center
        ${isActive ? 'border-cyan-500/60' : ''}
        ${className}
      `}>
      <span className={`text-[9px] text-slate-300 font-medium ${isDiamond ? '-rotate-45' : ''}`}>
        {label}
      </span>
    </motion.div>
  </div>;
const Card3 = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-100px"
  });

  // Simplified steps: 0 Session, 1 Intent, 2 Position, 3 Local, 4 Rerank, 5 Loop back, 6 Position (2nd), 7 Local (2nd), 8 Rerank (2nd), 9 Context
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = 10;
  useEffect(() => {
    if (isInView) {
      const interval = setInterval(() => {
        setCurrentStep(s => (s + 1) % totalSteps);
      }, 500);
      return () => clearInterval(interval);
    }
  }, [isInView]);

  // Define node data with LOD badges
  const nodes = [{
    id: 'session',
    label: 'Session',
    lod: null,
    inContainer: false,
    isInput: true
  }, {
    id: 'intent',
    label: 'Intent',
    lod: null,
    inContainer: false
  }, {
    id: 'position',
    label: 'Position',
    lod: {
      label: 'L0',
      color: 'bg-emerald-500/30 text-emerald-300 border-emerald-500/40'
    },
    inContainer: true
  }, {
    id: 'local',
    label: 'Local\nSearch',
    lod: {
      label: 'L0',
      color: 'bg-emerald-500/30 text-emerald-300 border-emerald-500/40'
    },
    inContainer: true
  }, {
    id: 'rerank',
    label: 'Rerank',
    lod: {
      label: 'L0',
      color: 'bg-emerald-500/30 text-emerald-300 border-emerald-500/40'
    },
    inContainer: true
  }, {
    id: 'context',
    label: 'Context',
    lod: {
      label: 'L1',
      color: 'bg-purple-500/30 text-purple-300 border-purple-500/40'
    },
    inContainer: false,
    isFinal: true
  }];

  // Map step to active node index
  const getActiveNodeIndex = (step: number) => {
    if (step === 0) return 0; // Session
    if (step === 1) return 1; // Intent
    if (step === 2 || step === 6) return 2; // Position
    if (step === 3 || step === 7) return 3; // Local
    if (step === 4 || step === 8) return 4; // Rerank
    if (step === 5) return -1; // Looping back (no node active)
    if (step === 9) return 5; // Context
    return -1;
  };
  const activeNodeIndex = getActiveNodeIndex(currentStep);
  const isLooping = currentStep === 5;
  const isInHierarchical = currentStep >= 2 && currentStep <= 8;

  // Node component with glow sync
  const PipeNode = ({
    node,
    index
  }: {
    node: typeof nodes[0];
    index: number;
  }) => {
    const isActive = activeNodeIndex === index;
    const baseClasses = node.isFinal ? 'bg-emerald-500/20 border-emerald-500/60' : node.id === 'intent' ? 'bg-purple-500/20 border-purple-500/50' : node.isInput ? 'bg-sky-500/20 border-sky-500/50' : 'bg-slate-800/80 border-slate-600';
    return <div className="flex flex-col items-center gap-1 flex-shrink-0">
        {/* LOD Badge - synced with node active state (no independent animation) */}
        {node.lod && <div className="flex flex-col items-center">
            <div className={`text-[8px] font-bold px-1.5 py-0.5 rounded border transition-all duration-200 ${node.lod.color} ${isActive ? 'opacity-100 scale-105' : 'opacity-50 scale-100'}`}>
              {node.lod.label}
            </div>
            <div className={`w-px h-2 transition-colors duration-200 ${isActive ? 'bg-cyan-400' : 'bg-slate-600'}`} />
          </div>}
        {!node.lod && <div className="h-5" />}
        
        {/* Node box */}
        <motion.div animate={{
        scale: isActive ? 1.08 : 1,
        boxShadow: isActive ? "0 0 16px hsl(186 100% 50% / 0.7)" : "none",
        borderColor: isActive ? "hsl(186 100% 50% / 0.8)" : undefined
      }} transition={{
        duration: 0.2
      }} className={`rounded px-2.5 py-2 border flex items-center justify-center min-w-[48px] ${baseClasses}`}>
          <span className={`text-[11px] font-medium text-center whitespace-pre-line leading-tight ${node.isFinal ? 'text-emerald-300' : node.id === 'intent' ? 'text-purple-300' : node.isInput ? 'text-sky-300' : 'text-slate-200'}`}>
            {node.label}
          </span>
        </motion.div>
      </div>;
  };
  return <motion.div ref={ref} initial={{
    opacity: 0,
    y: 50
  }} animate={isInView ? {
    opacity: 1,
    y: 0
  } : {}} transition={{
    duration: 0.6,
    delay: 0.2
  }} className="glass-card p-6 rounded-2xl glow-border">
      <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-sky-200 via-cyan-400 to-teal-300 mb-2">Recursive Context Retrieval</h3>
      <p className="text-sm text-muted-foreground mb-4">By combining directory-aware positioning with semantic search, agents retrieve context recursively—leveraging both global structure and local relevance.</p>

      <div className="relative h-44 overflow-hidden">
        {/* Main horizontal pipeline */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative flex items-center gap-3">
            
            {/* Session (Input) */}
            <PipeNode node={nodes[0]} index={0} />
            <ArrowRight className="text-slate-600 w-3 h-3 flex-shrink-0" />

            {/* Intent */}
            <PipeNode node={nodes[1]} index={1} />
            <ArrowRight className="text-slate-600 w-3 h-3 flex-shrink-0" />

            {/* Hierarchical Retriever Scope - Dashed Container */}
            <motion.div animate={{
            borderColor: isInHierarchical ? "hsl(186 100% 50% / 0.5)" : "hsl(215 20% 35% / 0.6)"
          }} className="relative border-2 border-dashed rounded-lg px-4 py-4 flex items-center gap-3 flex-shrink-0">
              {/* Label for the scope */}
              <span className="absolute -top-2 left-3 text-[8px] text-slate-500 bg-background px-1">
                Hierarchical Retriever
              </span>

              {/* Position */}
              <PipeNode node={nodes[2]} index={2} />
              <ArrowRight className="text-slate-600 w-3 h-3 flex-shrink-0" />

              {/* Local Search */}
              <PipeNode node={nodes[3]} index={3} />
              <ArrowRight className="text-slate-600 w-3 h-3 flex-shrink-0" />

              {/* Rerank */}
              <PipeNode node={nodes[4]} index={4} />

              {/* Recursion Loop - Deep elliptical arc from Rerank bottom-center to Position bottom-center */}
              <svg className="absolute -bottom-6 left-0 right-0 h-10 pointer-events-none overflow-visible" viewBox="0 0 200 40" preserveAspectRatio="xMidYMid meet">
                {/* Deep semi-elliptical arc path: starts at Rerank bottom, curves down deeply, ends at Position bottom */}
                <path d="M 168 8 C 168 38, 100 42, 32 38 C 20 36, 20 20, 32 8" fill="none" stroke="hsl(215 20% 50% / 0.7)" strokeWidth="2" strokeDasharray="8 4" strokeLinecap="round" />
                {/* Animated dot on recursion path when looping */}
                {isLooping && <motion.circle initial={{
                offsetDistance: "0%"
              }} animate={{
                offsetDistance: "100%"
              }} transition={{
                duration: 0.5,
                ease: "easeInOut"
              }} r="5" fill="hsl(186 100% 50%)" style={{
                offsetPath: "path('M 168 8 C 168 38, 100 42, 32 38 C 20 36, 20 20, 32 8')",
                filter: "drop-shadow(0 0 8px hsl(186 100% 50% / 0.9))"
              }} />}
              </svg>
            </motion.div>

            <ArrowRight className="text-slate-600 w-3 h-3 flex-shrink-0" />

            {/* Context - Final Output */}
            <PipeNode node={nodes[5]} index={5} />
          </div>
        </div>

        {/* Traveling Signal Dot (only visible when not in loop-back phase) */}
        {!isLooping && <motion.div key={currentStep} initial={{
        opacity: 0,
        scale: 0.5
      }} animate={{
        opacity: 1,
        scale: 1
      }} exit={{
        opacity: 0
      }} transition={{
        duration: 0.15
      }} className="absolute w-2.5 h-2.5 rounded-full bg-cyan-400 z-20 pointer-events-none" style={{
        boxShadow: "0 0 10px hsl(186 100% 50% / 0.9), 0 0 20px hsl(186 100% 50% / 0.5)",
        // Position dot at active node (simplified positioning)
        left: activeNodeIndex === 0 ? '8%' : activeNodeIndex === 1 ? '18%' : activeNodeIndex === 2 ? '33%' : activeNodeIndex === 3 ? '48%' : activeNodeIndex === 4 ? '63%' : activeNodeIndex === 5 ? '88%' : '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)'
      }} />}
      </div>
    </motion.div>;
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
      <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-sky-200 via-cyan-400 to-teal-300 mb-2">
        Observable and Self-Evolving Context
      </h3>
      <p className="text-sm text-muted-foreground mb-6">Every retrieval path is traceable, making an agent's context reasoning observable. Experiences are distilled from execution and conversations to continuously refine memory.</p>

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
              <path d="M 28 40 C 28 20, 56 20, 56 40 C 56 60, 84 60, 84 40 C 84 20, 56 20, 56 40 C 56 60, 28 60, 28 40" fill="none" stroke="hsl(var(--border))" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.4" />
            </svg>
            
            {/* Blue particles: Viking → Agent (Context Supply) - Top path */}
            {[0, 1, 2].map(i => <motion.div key={`supply-${i}`} animate={{
            x: [84, 56, 28],
            y: [0, -12, 0],
            opacity: [0, 1, 1, 0]
          }} transition={{
            duration: 1.8,
            repeat: Infinity,
            delay: i * 0.6,
            ease: "easeInOut"
          }} className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_hsl(186_100%_50%/0.8)]" />)}
            
            {/* Purple particles: Agent → Viking (Feedback) - Bottom path */}
            {[0, 1, 2].map(i => <motion.div key={`feedback-${i}`} animate={{
            x: [28, 56, 84],
            y: [0, 12, 0],
            opacity: [0, 1, 1, 0]
          }} transition={{
            duration: 1.8,
            repeat: Infinity,
            delay: i * 0.6,
            ease: "easeInOut"
          }} className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_8px_hsl(270_80%_60%/0.8)]" />)}

            {/* Center infinity icon */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-muted-foreground/50 text-lg font-light">
              ∞
            </div>
          </div>

          {/* Viking Node */}
          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-500/5 border border-purple-500/30 flex flex-col items-center justify-center z-10">
            <img src={vikingLogo} alt="Viking" className="w-10 h-10 object-contain" />
          </div>
        </div>

        {/* Toast Notifications / Terminal Logs - Inside container */}
        <div className="absolute right-3 top-2 bottom-2 w-32 flex flex-col justify-center gap-1 overflow-hidden">
          {logs.map((log, i) => <motion.div key={`${log}-${i}`} initial={{
          opacity: 0,
          x: 20
        }} animate={{
          opacity: 1,
          x: 0
        }} className="bg-slate-800/80 border border-purple-500/30 rounded px-2 py-1 text-[9px] text-purple-300/90 font-mono truncate">
              <span className="text-purple-400">›</span> {log}
            </motion.div>)}
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
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Principles for building scalable, long-running AI agents
          </p>
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