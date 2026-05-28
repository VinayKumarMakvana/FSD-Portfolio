"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export function Cursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let points: { x: number; y: number; age: number }[] = [];
    const maxAge = 10; // Reduced from 50: How long the trail persists

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    let isVisible = false;

    const updatePosition = (e: MouseEvent) => {
      isVisible = true;
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Interpolate points if moving very fast for a smoother drawing line
      if (points.length > 0) {
        const last = points[points.length - 1];
        const dx = e.clientX - last.x;
        const dy = e.clientY - last.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        // Add intermediate points if distance is large
        if (dist > 10) {
          const steps = Math.floor(dist / 10);
          for (let i = 1; i <= steps; i++) {
            points.push({
              x: last.x + (dx * i) / steps,
              y: last.y + (dy * i) / steps,
              age: 0,
            });
          }
        }
      }
      points.push({ x: e.clientX, y: e.clientY, age: 0 });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === "button" ||
        target.tagName.toLowerCase() === "a" ||
        target.closest("button") ||
        target.closest("a")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseLeave = () => { isVisible = false; };
    const handleMouseEnter = () => { isVisible = true; };

    window.addEventListener("mousemove", updatePosition);
    window.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update point ages and remove old ones
      points.forEach(p => { p.age += 1; });
      points = points.filter(p => p.age < maxAge);

      if (points.length > 1 && isVisible) {
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        
        for (let i = 0; i < points.length - 1; i++) {
          const p1 = points[i];
          const p2 = points[i + 1];
          
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          
          const life = 1 - (p1.age / maxAge);
          ctx.strokeStyle = `rgba(0, 242, 254, ${life})`; // Shining Cyan/Neon
          ctx.lineWidth = 8 * life;
          
          ctx.shadowBlur = 20 * life;
          ctx.shadowColor = `rgba(0, 242, 254, ${life})`;
          
          ctx.stroke();
        }
      }
      
      animationFrameId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", updatePosition);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-50 hidden md:block"
      />
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 rounded-full bg-[#00F2FE] pointer-events-none z-50 hidden md:flex items-center justify-center shadow-[0_0_20px_#00F2FE]"
        animate={{
          x: position.x - 6,
          y: position.y - 6,
          scale: isHovering ? 2.5 : 1,
          backgroundColor: isHovering ? "#fff" : "#00F2FE",
        }}
        transition={{ 
          type: "spring", 
          stiffness: 400, 
          damping: 25,
          mass: 0.1
        }}
      >
        {isHovering && (
          <div className="w-1 h-1 rounded-full bg-black" />
        )}
      </motion.div>
    </>
  );
}
