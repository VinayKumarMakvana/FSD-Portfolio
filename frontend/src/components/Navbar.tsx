"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Terminal, Briefcase } from "lucide-react";
import { ThemeToggle } from "./ui/ThemeToggle";
import { useRecruiterMode } from "./RecruiterModeContext";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isRecruiterMode, toggleRecruiterMode } = useRecruiterMode();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-40 transition-all duration-300 ${
        isScrolled ? "py-4 glass shadow-lg" : "py-6 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <a href="#" className="text-2xl font-bold tracking-tighter flex items-center gap-2 group">
          <Terminal className="text-accent-primary group-hover:text-accent-secondary transition-colors" />
          <span>V.K.M</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-6 text-sm font-medium">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="hover:text-accent-primary transition-colors relative group py-2"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-accent-primary transition-all group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4 border-l border-foreground/20 pl-4">
            <button
              onClick={toggleRecruiterMode}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                isRecruiterMode
                  ? "bg-accent-secondary text-background shadow-[0_0_15px_rgba(236,72,153,0.5)]"
                  : "glass hover:bg-foreground/10"
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span className="hidden lg:inline">Quick-Pass Mode</span>
            </button>
            <ThemeToggle />
          </div>
        </nav>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center gap-4">
          <ThemeToggle />
          <button
            className="text-foreground focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full glass flex flex-col py-4 px-6 gap-4 md:hidden"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-lg font-medium hover:text-accent-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <button
              onClick={() => {
                toggleRecruiterMode();
                setMobileMenuOpen(false);
              }}
              className={`flex items-center justify-center gap-2 w-full py-3 rounded-lg font-medium transition-all ${
                isRecruiterMode
                  ? "bg-accent-secondary text-background"
                  : "glass"
              }`}
            >
              <Briefcase className="w-5 h-5" />
              Recruiter Quick-Pass Mode
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
