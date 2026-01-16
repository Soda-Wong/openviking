import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Folder, File, Search, ArrowRight, RefreshCw } from "lucide-react";
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
    label: "L2 Abstract",
    tokens: "<100 tok",
    width: "40%",
    color: "from-primary to-primary/50"
  }, {
    label: "L1 Overview",
    tokens: "<2k tok",
    width: "70%",
    color: "from-secondary to-secondary/50"
  }, {
    label: "L0 Detail",
    tokens: "Deep Work",
    width: "100%",
    color: "from-warning to-warning/50"
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

      <div className="relative h-48 flex flex-col justify-center items-center gap-3">
        {layers.map((layer, i) => <motion.div key={layer.label} animate={{
        scale: scanY === i ? 1.05 : 1,
        boxShadow: scanY === i ? i === 0 ? "0 0 20px hsl(142 76% 45% / 0.5)" : i === 2 ? "0 0 20px hsl(38 92% 50% / 0.5)" : "0 0 15px hsl(270 80% 60% / 0.5)" : "none"
      }} className={`relative bg-gradient-to-r ${layer.color} rounded-lg px-4 py-2 text-center`} style={{
        width: layer.width
      }}>
            <p className="text-xs font-medium text-primary-foreground">{layer.label}</p>
            <p className="text-[10px] text-primary-foreground/70">{layer.tokens}</p>
            {scanY === i && <motion.div initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} className="absolute -right-16 top-1/2 -translate-y-1/2 text-xs px-2 py-1 rounded bg-background border border-border">
                {i === 0 ? "✅ Fast" : i === 2 ? "⚠️ Heavy" : "📊 Normal"}
              </motion.div>}
          </motion.div>)}

        {/* Scanner beam */}
        <motion.div animate={{
        top: `${scanY * 33 + 16}%`
      }} transition={{
        duration: 0.3
      }} className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent" />
      </div>
    </motion.div>;
};
const Card3 = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-100px"
  });
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (isInView) {
      const interval = setInterval(() => {
        setStep(s => (s + 1) % 5);
      }, 1200);
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
    delay: 0.2
  }} className="glass-card p-6 rounded-2xl glow-border">
      <h3 className="text-lg font-semibold text-gradient mb-2">
        Recursive Retrieval & Rerank
      </h3>
      <p className="text-sm text-muted-foreground mb-6">
        Directory positioning + semantic search for precise top-k results.
      </p>

      <div className="relative h-48 flex items-center justify-center">
        <div className="flex items-center gap-4 w-full">
          {/* Query */}
          <motion.div animate={{
          opacity: step >= 0 ? 1 : 0.3,
          scale: step === 0 ? 1.1 : 1
        }} className="flex-shrink-0">
            <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary flex items-center justify-center">
              <Search className="w-5 h-5 text-primary" />
            </div>
          </motion.div>

          <ArrowRight className="text-muted-foreground w-4 h-4 flex-shrink-0" />

          {/* Intent Analysis */}
          <motion.div animate={{
          opacity: step >= 1 ? 1 : 0.3,
          scale: step === 1 ? 1.1 : 1
        }} className="flex-shrink-0 text-center">
            <div className="w-16 h-8 rounded bg-secondary/20 border border-secondary flex items-center justify-center">
              <span className="text-xs text-secondary">Intent</span>
            </div>
          </motion.div>

          <ArrowRight className="text-muted-foreground w-4 h-4 flex-shrink-0" />

          {/* Folders */}
          <div className="flex flex-col gap-1">
            {["A", "B", "C"].map((f, i) => <motion.div key={f} animate={{
            opacity: step >= 2 ? 1 : 0.3,
            boxShadow: step === 2 ? "0 0 10px hsl(186 100% 50% / 0.5)" : "none"
          }} transition={{
            delay: i * 0.1
          }} className="flex items-center gap-1 bg-muted/50 rounded px-2 py-0.5">
                <Folder className="w-3 h-3 text-primary" />
                <span className="text-xs">{f}/</span>
              </motion.div>)}
          </div>

          <ArrowRight className="text-muted-foreground w-4 h-4 flex-shrink-0" />

          {/* Rerank */}
          <motion.div animate={{
          opacity: step >= 3 ? 1 : 0.3,
          scale: step === 3 ? 1.1 : 1
        }} className="flex-shrink-0">
            <div className="w-14 h-8 rounded bg-warning/20 border border-warning flex items-center justify-center">
              <span className="text-xs text-warning">Rerank</span>
            </div>
          </motion.div>

          <ArrowRight className="text-muted-foreground w-4 h-4 flex-shrink-0" />

          {/* Output */}
          <motion.div animate={{
          opacity: step >= 4 ? 1 : 0.3,
          scale: step === 4 ? 1.1 : 1
        }} className="flex-shrink-0">
            <div className="bg-success/20 border border-success rounded px-2 py-1">
              <p className="text-xs text-success font-medium">Top K</p>
            </div>
          </motion.div>
        </div>
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
      <h3 className="text-lg font-semibold text-gradient mb-2">
        Observable & Self-Iterative
      </h3>
      <p className="text-sm text-muted-foreground mb-6">
        Traceable retrieval paths; session insights auto-optimize memories.
      </p>

      <div className="relative h-48 flex items-center justify-center">
        {/* Infinity Loop */}
        <div className="relative flex items-center gap-8">
          {/* Agent Node */}
          <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 flex flex-col items-center justify-center">
            <span className="text-2xl">🤖</span>
            <span className="text-xs text-primary mt-1">Agent</span>
          </div>

          {/* Connection Lines */}
          <div className="relative w-24 h-16">
            {/* Supply line */}
            <motion.div animate={{
            x: [-40, 40],
            opacity: [0, 1, 1, 0]
          }} transition={{
            duration: 2,
            repeat: Infinity
          }} className="absolute top-2 left-0 w-3 h-3 rounded-full bg-primary" />
            {/* Feedback line */}
            <motion.div animate={{
            x: [40, -40],
            opacity: [0, 1, 1, 0]
          }} transition={{
            duration: 2,
            repeat: Infinity,
            delay: 1
          }} className="absolute bottom-2 left-0 w-3 h-3 rounded-full bg-secondary" />
            <RefreshCw className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-muted-foreground animate-spin" style={{
            animationDuration: "3s"
          }} />
          </div>

          {/* Viking Node */}
          <div className="relative">
            <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-secondary/20 to-secondary/5 border border-secondary/30 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold text-gradient">V</span>
              <span className="text-xs text-secondary mt-1">Viking</span>
            </div>

            {/* Toast notifications */}
            <div className="absolute -right-32 top-0 w-28 space-y-1">
              {logs.map((log, i) => <motion.div key={i} initial={{
              opacity: 0,
              x: -10
            }} animate={{
              opacity: 1,
              x: 0
            }} exit={{
              opacity: 0
            }} className="bg-muted/80 border border-border/50 rounded px-2 py-1 text-[10px] text-muted-foreground truncate">
                  {log}
                </motion.div>)}
            </div>
          </div>
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