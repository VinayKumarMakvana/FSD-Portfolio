"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Server, Database, Cloud, Zap, Globe, Shield } from "lucide-react";

const nodes = [
  { id: "client", label: "Client", icon: <Globe className="w-8 h-8" />, desc: "React / Next.js SPA. Handles dynamic UI and state.", x: 10, y: 50 },
  { id: "rate-limiter", label: "Rate Limiter", icon: <Shield className="w-8 h-8" />, desc: "Nginx / Express Rate Limiter. Prevents DDoS and spam.", x: 30, y: 50 },
  { id: "server", label: "Next.js Server", icon: <Server className="w-8 h-8" />, desc: "Node.js environment. SSR, API Routes, Middleware.", x: 50, y: 50 },
  { id: "redis", label: "Redis Cache", icon: <Zap className="w-8 h-8" />, desc: "In-memory store for session data and caching heavy queries.", x: 75, y: 30 },
  { id: "mongodb", label: "MongoDB", icon: <Database className="w-8 h-8" />, desc: "Primary NoSQL database for persistent storage.", x: 75, y: 70 },
];

export function Architecture() {
  const [activeNode, setActiveNode] = useState<string | null>(null);

  const activeData = nodes.find((n) => n.id === activeNode);

  return (
    <section id="architecture" className="py-24 relative z-10 bg-black/20 hidden md:block">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 md:text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            System <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">Architecture</span>
          </h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">Interactive visualization of my standard production-ready stack. Click any node to understand its role in the system.</p>
        </motion.div>

        <div className="relative w-full max-w-5xl mx-auto h-[400px] glass rounded-2xl border border-white/10 p-8 flex items-center justify-center">
          
          {/* Animated SVG Lines connecting nodes */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
            {/* Client to Rate Limiter */}
            <path d="M 10% 50% L 30% 50%" stroke="rgba(255,255,255,0.2)" strokeWidth="2" fill="none" strokeDasharray="5,5" />
            <circle cx="20%" cy="50%" r="3" fill="#10B981">
              <animate attributeName="cx" values="10%;30%" dur="2s" repeatCount="indefinite" />
            </circle>

            {/* Rate Limiter to Server */}
            <path d="M 30% 50% L 50% 50%" stroke="rgba(255,255,255,0.2)" strokeWidth="2" fill="none" />
            <circle cx="40%" cy="50%" r="3" fill="#10B981">
              <animate attributeName="cx" values="30%;50%" dur="2s" repeatCount="indefinite" />
            </circle>

            {/* Server to Redis */}
            <path d="M 50% 50% L 75% 30%" stroke="rgba(255,255,255,0.2)" strokeWidth="2" fill="none" />
            <circle cx="62.5%" cy="40%" r="3" fill="#3B82F6">
              <animate attributeName="cx" values="50%;75%" dur="2s" repeatCount="indefinite" />
              <animate attributeName="cy" values="50%;30%" dur="2s" repeatCount="indefinite" />
            </circle>

            {/* Server to MongoDB */}
            <path d="M 50% 50% L 75% 70%" stroke="rgba(255,255,255,0.2)" strokeWidth="2" fill="none" />
            <circle cx="62.5%" cy="60%" r="3" fill="#10B981">
              <animate attributeName="cx" values="50%;75%" dur="2s" repeatCount="indefinite" />
              <animate attributeName="cy" values="50%;70%" dur="2s" repeatCount="indefinite" />
            </circle>
          </svg>

          {/* Interactive Nodes */}
          {nodes.map((node) => (
            <motion.div
              key={node.id}
              className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10 transition-all ${activeNode === node.id ? 'scale-110 z-20' : 'hover:scale-105'}`}
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
              onClick={() => setActiveNode(node.id === activeNode ? null : node.id)}
            >
              <div className={`w-20 h-20 rounded-2xl glass flex flex-col items-center justify-center border ${activeNode === node.id ? 'border-accent-primary bg-accent-primary/20 shadow-[0_0_20px_rgba(16,185,129,0.3)]' : 'border-white/20'}`}>
                <div className={activeNode === node.id ? 'text-accent-primary' : 'text-foreground/80'}>
                  {node.icon}
                </div>
              </div>
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 font-bold text-sm whitespace-nowrap bg-black/50 px-2 py-1 rounded">
                {node.label}
              </div>
            </motion.div>
          ))}

          {/* Explanation Drawer */}
          <AnimatePresence>
            {activeData && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 glass p-6 rounded-xl border border-accent-primary/40 shadow-2xl w-[80%] max-w-lg z-30 bg-black/80 backdrop-blur-xl"
              >
                <h3 className="text-xl font-bold mb-2 flex items-center gap-2 text-accent-primary">
                  {activeData.icon} {activeData.label}
                </h3>
                <p className="text-foreground/80">{activeData.desc}</p>
                <button 
                  onClick={() => setActiveNode(null)}
                  className="absolute top-4 right-4 text-foreground/50 hover:text-white"
                >
                  ✕
                </button>
              </motion.div>
            )}
          </AnimatePresence>
          
        </div>
      </div>
    </section>
  );
}
