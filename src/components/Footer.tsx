import { motion } from "framer-motion";
import { Github, MessageCircle } from "lucide-react";
import openVikingLogo from "@/assets/openviking-logo.png";
const Footer = () => {
  const links = {
    openSource: [{
      name: "MineContext",
      href: "https://github.com/volcengine/MineContext"
    }, {
      name: "OpenViking",
      href: "https://github.com/volcengine/OpenViking"
    }],
    social: [{
      name: "GitHub",
      href: "https://github.com/volcengine/OpenViking",
      icon: Github
    }, {
      name: "Discord",
      href: "https://discord.gg/eHvx8E9XF3",
      icon: MessageCircle
    }, {
      name: "X",
      href: "https://x.com/openvikingai",
      icon: () => <span className="font-bold">𝕏</span>
    }]
  };
  return <footer className="relative pt-24 pb-8 border-t border-border/30">
      <div className="absolute inset-0 bg-gradient-to-t from-muted/20 to-transparent" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-3 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img src={openVikingLogo} alt="OpenViking Logo" className="w-10 h-10 object-contain" />
              <span className="text-xl font-bold text-gradient">OpenViking</span>
            </div>
            <p className="text-sm text-muted-foreground">A Context Database for AI Agents. Memory. Knowledge. Skills. Unified in one context layer.</p>
          </div>

          {/* Open Source */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Open Source</h4>
            <ul className="space-y-2">
              {links.openSource.map(link => <li key={link.name}>
                  <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.name}
                  </a>
                </li>)}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Social</h4>
            <div className="flex gap-4">
              {links.social.map(link => {
              const Icon = link.icon;
              return <motion.a key={link.name} href={link.href} target="_blank" rel="noopener noreferrer" whileHover={{
                scale: 1.1
              }} whileTap={{
                scale: 0.95
              }} className="w-10 h-10 rounded-lg bg-muted/50 border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors">
                    <Icon className="w-5 h-5" />
                  </motion.a>;
            })}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-border/30 text-center">
          <p className="text-sm text-muted-foreground">
            © 2026 Viking. All rights reserved.
          </p>
        </div>
      </div>
    </footer>;
};
export default Footer;