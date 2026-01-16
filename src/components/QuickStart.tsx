import { motion } from "framer-motion";
import { Check, Copy, Terminal } from "lucide-react";
import { useState } from "react";
const QuickStart = () => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText("pip install openviking");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  const codeExamples = [{
    code: "ov.add_data()",
    comment: "# Add resources"
  }, {
    code: "client.find()",
    comment: "# Search context"
  }, {
    code: "session.commit()",
    comment: "# Save insights"
  }];
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
          <h2 className="text-4xl font-bold mb-4">Quick Start</h2>
          
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Install Command */}
          <motion.div initial={{
          opacity: 0,
          x: -30
        }} whileInView={{
          opacity: 1,
          x: 0
        }} viewport={{
          once: true
        }} className="glass-card p-6 rounded-2xl glow-border">
            <div className="flex items-center gap-2 mb-4">
              <Terminal className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">Install</h3>
            </div>
            <div className="bg-muted/50 rounded-lg p-4 flex items-center justify-between group">
              <code className="font-mono text-sm text-foreground">
                <span className="text-muted-foreground">$ </span>
                pip install openviking
              </code>
              <button onClick={handleCopy} className="p-2 rounded-lg hover:bg-muted transition-colors">
                {copied ? <Check className="w-4 h-4 text-success" /> : <Copy className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />}
              </button>
            </div>
            <p className="text-xs text-muted-foreground mt-3 text-center">
              One command to launch
            </p>
          </motion.div>

          {/* API Examples */}
          <motion.div initial={{
          opacity: 0,
          x: 30
        }} whileInView={{
          opacity: 1,
          x: 0
        }} viewport={{
          once: true
        }} className="glass-card p-6 rounded-2xl glow-border">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-primary font-mono text-lg">{"</>"}</span>
              <h3 className="text-lg font-semibold">API</h3>
            </div>
            <div className="bg-muted/50 rounded-lg p-4 space-y-2">
              {codeExamples.map((example, i) => <motion.div key={i} initial={{
              opacity: 0,
              x: -10
            }} whileInView={{
              opacity: 1,
              x: 0
            }} viewport={{
              once: true
            }} transition={{
              delay: i * 0.1
            }} className="flex items-center justify-between font-mono text-sm">
                  <code className="text-primary">{example.code}</code>
                  <code className="text-muted-foreground text-xs">{example.comment}</code>
                </motion.div>)}
            </div>
            <p className="text-xs text-muted-foreground mt-3 text-center">
              One set of APIs to use
            </p>
          </motion.div>
        </div>
      </div>
    </section>;
};
export default QuickStart;