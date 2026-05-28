"use client";

import { motion } from "framer-motion";

export default function Background3D() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Deep space background */}
      <div className="absolute inset-0 bg-[#030014]" />
      
      {/* Animated Gradient Orbs */}
      <motion.div 
        animate={{ 
          y: [0, -50, 0],
          x: [0, 30, 0],
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[20%] left-[10%] w-[400px] h-[400px] rounded-full bg-gradient-to-r from-[#4facfe] to-[#00f2fe] blur-[120px] opacity-40 mix-blend-screen"
      />
      
      <motion.div 
        animate={{ 
          y: [0, 60, 0],
          x: [0, -40, 0],
          scale: [1, 1.5, 1],
          opacity: [0.2, 0.5, 0.2]
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-[10%] right-[10%] w-[500px] h-[500px] rounded-full bg-gradient-to-r from-[#7F00FF] to-[#E100FF] blur-[150px] opacity-30 mix-blend-screen"
      />

      <motion.div 
        animate={{ 
          y: [0, -30, 0],
          x: [0, 50, 0],
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-[40%] left-[60%] w-[300px] h-[300px] rounded-full bg-gradient-to-r from-[#FF416C] to-[#FF4B2B] blur-[100px] opacity-20 mix-blend-screen"
      />
      
      {/* CSS Stars pattern overlay */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle at center, white 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />
    </div>
  );
}
