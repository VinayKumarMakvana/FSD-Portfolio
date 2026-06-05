"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Download, Code2, Mail, Briefcase } from "lucide-react";
import { useRecruiterMode } from "./RecruiterModeContext";

const titles = [
  "Full Stack Developer",
  "AI Engineer",
  "React Developer",
  "Backend Engineer",
  "Problem Solver",
];

export function Hero() {
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const { isRecruiterMode } = useRecruiterMode();

  useEffect(() => {
    const currentTitle = titles[titleIndex];
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentTitle.length) {
          setDisplayText(currentTitle.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 1500);
        }
      } else {
        if (displayText.length === 0) {
          setIsDeleting(false);
          setTitleIndex((prev) => (prev + 1) % titles.length);
        } else {
          setDisplayText(currentTitle.slice(0, displayText.length - 1));
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, titleIndex]);

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20" id="home">
      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Column */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col gap-6 z-10"
        >
          <div className="inline-block">
            <span className="glass px-4 py-2 rounded-full text-sm font-medium text-accent-primary border border-accent-primary/20 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
              Welcome to my universe
            </span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-tight">
            Hi, I'm <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent-primary to-accent-secondary">
              Vinay Kumar Makvana
            </span>
          </h1>
          
          <div className="h-12 flex items-center">
            <span className="text-xl sm:text-2xl md:text-3xl text-foreground/80 font-medium border-r-2 border-accent-primary pr-2 animate-pulse">
              {displayText}
            </span>
          </div>
          
          <p className="text-base sm:text-lg text-foreground/60 max-w-xl">
            I build modern, scalable and user-centric applications with performance-focused architecture. Passionate about transforming complex problems into elegant, efficient solutions.
          </p>
          
          <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-4 mt-4">
            <a href="#projects" className="group relative px-6 py-3 rounded-xl overflow-hidden bg-accent-primary text-background font-medium hover:scale-105 transition-transform">
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-accent-primary to-emerald-400 group-hover:scale-110 transition-transform"></span>
              <span className="relative flex items-center gap-2">
                View Projects <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </a>
            
            <a href="https://docs.google.com/document/d/1cW0W3FaR0ImNqtcg4APJV6QT8t3alWRQ/edit?usp=sharing&ouid=106298634269193911215&rtpof=true&sd=true" target="_blank" className="group px-6 py-3 rounded-xl glass font-medium hover:bg-foreground/10 transition-colors flex items-center gap-2 border border-foreground/10">
              <Download className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
              Resume
            </a>

            <div className="flex items-center gap-3 mt-2 sm:mt-0 sm:ml-2">
              <a href="https://github.com/VinayKumarMakvana" target="_blank" rel="noreferrer" className="p-3 rounded-full glass hover:bg-foreground/10 transition-colors hover:text-accent-primary hover:-translate-y-1">
                <Code2 className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/in/vinay-kumar-makvana-2371ba391/" target="_blank" rel="noreferrer" className="p-3 rounded-full glass hover:bg-foreground/10 transition-colors hover:text-accent-primary hover:-translate-y-1">
                <Briefcase className="w-5 h-5" />
              </a>
              <a href="mailto:vkmakvana.dev@gmail.com" className="p-3 rounded-full glass hover:bg-foreground/10 transition-colors hover:text-accent-primary hover:-translate-y-1">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Right Column - Profile & Orbiting Tech */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative h-[400px] md:h-[500px] flex items-center justify-center hidden lg:flex"
        >
          {/* Main Profile Card */}
          <div className="relative w-64 h-80 rounded-2xl glass p-2 z-20 group">
            <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/20 to-accent-secondary/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-50" />
            <div className="w-full h-full rounded-xl overflow-hidden relative border border-foreground/10 glass flex items-center justify-center">
              {/* Animated glowing placeholder until user adds their image */}
              <div className="absolute inset-0 bg-gradient-to-t from-accent-primary/20 to-transparent opacity-50" />
              <img
                src="./img/vinay.png"
                alt="Vinay Kumar Makvana"
                />
              
              <div className="absolute bottom-4 left-0 w-full text-center text-xs text-foreground/40 font-mono tracking-widest uppercase">
                &lt; Developer /&gt;
              </div>
            </div>
            
            {/* Quick Stats (Recruiter Mode) */}
            <AnimatePresence>
              {isRecruiterMode && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="absolute -bottom-6 -right-6 glass p-4 rounded-xl shadow-xl z-30 border border-accent-secondary/30"
                >
                  <div className="text-sm font-bold text-accent-secondary">Top Skills</div>
                  <div className="text-xs text-foreground/80 mt-1">Java • React • Node.js • Python • AI</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Orbiting Badges */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
             {[
               { icon: "⚛️", label: "React", delay: 0 },
               { icon: "🚀", label: "Next.js", delay: 1.5 },
               { icon: "🍃", label: "MongoDB", delay: 3 },
               { icon: "🌊", label: "Tailwind", delay: 4.5 },
             ].map((tech, i) => (
               <motion.div
                 key={i}
                 className="absolute w-full h-full flex items-center justify-center pointer-events-auto"
                 initial={{ rotate: i * 90 }}
                 animate={{ rotate: 360 + (i * 90) }}
                 transition={{
                   duration: 20,
                   repeat: Infinity,
                   ease: "linear",
                 }}
               >
                 <motion.div
                   className="absolute -top-6 w-12 h-12 rounded-full glass flex items-center justify-center shadow-lg cursor-pointer hover:scale-125 transition-transform"
                   initial={{ rotate: -(i * 90) }}
                   animate={{ rotate: -(360 + (i * 90)) }}
                   transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                   title={tech.label}
                 >
                   <span className="text-xl">{tech.icon}</span>
                 </motion.div>
               </motion.div>
             ))}
          </div>

          {/* Background Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] rounded-full border border-foreground/5 border-dashed opacity-50 animate-[spin_40s_linear_infinite]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] rounded-full border border-foreground/5 border-dashed opacity-50 animate-[spin_30s_linear_infinite_reverse]" />
        </motion.div>
        
      </div>
    </section>
  );
}
