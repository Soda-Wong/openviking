import { motion } from "framer-motion";
import { Github, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import ForceFieldBackground from "./ForceFieldBackground";
const Hero = () => {
  return <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Interactive Force Field Background */}
      <ForceFieldBackground hue={185} saturation={80} spacing={8} density={1.5} minStroke={1} maxStroke={4} forceStrength={12} magnifierRadius={180} friction={0.92} restoreSpeed={0.03} className="opacity-60" />

      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/40 to-background/80 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Headline */}
          <motion.h1 initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6,
          delay: 0.1
        }} className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            A <span className="text-gradient">Context DataBase</span>
            <br />
            for AI Agents
          </motion.h1>

          {/* Slogan */}
          <motion.p initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6,
          delay: 0.2
        }} className="text-xl md:text-2xl text-primary font-medium mb-4">Memory. Resource. Skills. Unified in one context layer.</motion.p>

          {/* CTA Buttons */}
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6,
          delay: 0.4
        }} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#quick-start">
              <Button size="lg" className="group relative overflow-hidden bg-gradient-to-r from-primary to-secondary text-primary-foreground font-semibold px-8 py-6 text-lg rounded-xl shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/40 hover:scale-[1.02] transition-all duration-300">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>
            <a href="https://github.com/volcengine/OpenViking" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="group relative overflow-hidden bg-white/[0.02] backdrop-blur-sm border-white/20 text-white font-semibold px-8 py-6 text-lg rounded-xl hover:bg-white/15 hover:border-white/50 hover:text-white hover:shadow-lg hover:shadow-white/10 hover:scale-[1.02] transition-all duration-300">
                <Github className="mr-2 h-5 w-5" />
                View on GitHub
                <ArrowRight className="ml-2 h-5 w-5 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </Button>
            </a>
          </motion.div>

          {/* Decorative Elements */}
          <motion.div initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} transition={{
          duration: 1,
          delay: 0.6
        }} className="mt-20 relative">
            <div className="flex justify-center items-center gap-8 text-slate-300">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-success shadow-sm shadow-success/50" />
                <span className="text-sm font-medium">Hierarchical Contexts</span>
              </div>
              <div className="w-px h-4 bg-slate-600" />
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-primary shadow-sm shadow-primary/50" />
                <span className="text-sm font-medium">Self-Evolving</span>
              </div>
              <div className="w-px h-4 bg-slate-600" />
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-secondary shadow-sm shadow-secondary/50" />
                <span className="text-sm font-medium">Observable by Design</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div initial={{
      opacity: 0
    }} animate={{
      opacity: 1,
      y: [0, 10, 0]
    }} transition={{
      duration: 2,
      repeat: Infinity,
      delay: 1
    }} className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
          <div className="w-1 h-3 rounded-full bg-primary" />
        </div>
      </motion.div>
    </section>;
};
export default Hero;