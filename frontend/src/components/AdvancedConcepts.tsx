"use client";

import { motion } from "framer-motion";
import { Server, Shield, Zap, Lock, Database, Globe, Cpu, Cloud, Settings, Layers, Code, HardDrive, AlertTriangle, Clock } from "lucide-react";

const concepts = [
  { title: "JWT & Authentication", icon: <Lock className="w-6 h-6" />, desc: "Secure stateless auth flows." },
  { title: "Role Based Access (RBAC)", icon: <Shield className="w-6 h-6" />, desc: "Granular user permissions." },
  { title: "REST API Design", icon: <Globe className="w-6 h-6" />, desc: "Scalable endpoint architecture." },
  { title: "WebSockets", icon: <Zap className="w-6 h-6" />, desc: "Real-time bi-directional comms." },
  { title: "Caching (Redis)", icon: <Database className="w-6 h-6" />, desc: "Sub-millisecond data retrieval." },
  { title: "Docker", icon: <Cloud className="w-6 h-6" />, desc: "Containerized environments." },
  { title: "Lazy Loading", icon: <Layers className="w-6 h-6" />, desc: "Optimized component delivery." },
  { title: "Code Splitting", icon: <Code className="w-6 h-6" />, desc: "Reduced initial bundle size." },
  { title: "Performance Opt.", icon: <Cpu className="w-6 h-6" />, desc: "Lighthouse 90+ strategies." },
  { title: "API Rate Limiting", icon: <Settings className="w-6 h-6" />, desc: "DDoS and spam prevention." },
  { title: "Middleware Architecture", icon: <Server className="w-6 h-6" />, desc: "Request lifecycle control." },
  { title: "File Upload Systems", icon: <HardDrive className="w-6 h-6" />, desc: "S3/Cloudinary integrations." },
  { title: "Error Handling", icon: <AlertTriangle className="w-6 h-6" />, desc: "Global boundaries & logging." },
  { title: "Background Jobs", icon: <Clock className="w-6 h-6" />, desc: "Queue-based task execution." },
];

export function AdvancedConcepts() {
  return (
    <section className="py-24 relative z-10">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 md:text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Advanced <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-secondary to-purple-400">Engineering</span>
          </h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">Beyond just writing code, I design robust systems focusing on security, performance, and scalability.</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {concepts.map((concept, i) => (
            <motion.div
              key={concept.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              whileHover={{ scale: 1.05, rotateY: 5, rotateX: -5 }}
              className="glass p-5 rounded-xl border border-white/5 hover:border-accent-secondary/40 transition-all cursor-pointer group shadow-lg"
              style={{ perspective: 1000 }}
            >
              <div className="mb-3 text-foreground/50 group-hover:text-accent-secondary transition-colors">
                {concept.icon}
              </div>
              <h3 className="font-bold text-sm mb-1">{concept.title}</h3>
              <p className="text-xs text-foreground/50">{concept.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
