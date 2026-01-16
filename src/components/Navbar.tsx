import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import openVikingLogo from "@/assets/openviking-logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Doc", path: "/docs" },
    { name: "Blog", path: "/blog" },
  ];

  const rightLinks = [
    { name: "Github", path: "https://github.com/volcengine/OpenViking", external: true },
    { name: "Contact", path: "https://discord.gg/eHvx8E9XF3", external: true },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border/30"
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left Links */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <Link key={link.name} to={link.path}>
                <Button
                  variant="ghost"
                  className={`text-sm font-medium transition-all duration-300 hover:text-primary ${
                    location.pathname.startsWith(link.path) ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {link.name}
                </Button>
              </Link>
            ))}
          </div>

          {/* Center Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="relative">
              <img src={openVikingLogo} alt="OpenViking Logo" className="w-10 h-10 object-contain" />
              <div className="absolute inset-0 rounded-lg bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
            <span className="text-xl font-bold text-gradient">OpenViking</span>
          </Link>

          {/* Right Links */}
          <div className="hidden md:flex items-center gap-2">
            {rightLinks.map((link) => (
              <a key={link.name} href={link.path} target="_blank" rel="noopener noreferrer">
                <Button
                  variant={link.name === "Github" ? "outline" : "ghost"}
                  className={`text-sm font-medium transition-all duration-300 ${
                    link.name === "Github"
                      ? "border-primary/50 text-primary hover:border-white/40 hover:bg-white/10 hover:text-white"
                      : "text-muted-foreground hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {link.name}
                </Button>
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-foreground" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-4 pb-4 flex flex-col gap-2"
          >
            {navLinks.map((link) => (
              <Link key={link.name} to={link.path} onClick={() => setIsOpen(false)}>
                <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-primary">
                  {link.name}
                </Button>
              </Link>
            ))}
            {rightLinks.map((link) => (
              <a key={link.name} href={link.path} target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-primary">
                  {link.name}
                </Button>
              </a>
            ))}
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
