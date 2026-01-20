import { motion } from "framer-motion";
import { Link2, FileText, MessageSquare, Brain } from "lucide-react";
const BestPractice = () => {
  const practices = [{
    logo: "🦜",
    name: "LangChain",
    description: "Change the Agent context with One Line",
    icon: Link2,
    gradient: "from-green-500/20 to-emerald-500/20",
    borderColor: "border-green-500/30"
  }, {
    logo: "🦌",
    name: "DeerFlow",
    description: "Support for long document, session management, and long-term memory",
    icon: FileText,
    gradient: "from-amber-500/20 to-orange-500/20",
    borderColor: "border-amber-500/30"
  }];
  return <section className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/5 to-transparent" />
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
          <h2 className="text-4xl font-bold mb-4">Best Practices</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Seamless integration with popular agent frameworks</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {practices.map((practice, i) => <motion.div key={practice.name} initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          delay: i * 0.1
        }} whileHover={{
          scale: 1.02
        }} className={`glass-card p-8 rounded-2xl glow-border bg-gradient-to-br ${practice.gradient} ${practice.borderColor}`}>
              <div className="flex items-start gap-4">
                <div className="text-5xl">{practice.logo}</div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{practice.name}</h3>
                  <p className="text-muted-foreground">{practice.description}</p>
                </div>
              </div>

            </motion.div>)}
        </div>
      </div>
    </section>;
};
export default BestPractice;