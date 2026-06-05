"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate, AnimatePresence } from "framer-motion";
import { ExternalLink, Code2, Layers, Server, Cpu, Database, ChevronLeft, ChevronRight } from "lucide-react";

const projects = [
  {
    title: "Interview AI",
    desc: "An AI-powered career coach and resume builder platform that helps users prepare for interviews, tailor resumes, and identify skill gaps.",
    tech: ["React", "Node.js", "Gemini AI", "MERN Stack"],
    features: ["Career Coach", "Resume Builder"],
    icon: <Cpu className="w-5 h-5 sm:w-6 sm:h-6" />,
    github: "https://github.com/VinayKumarMakvana/Interview-Plan",
    live: "https://interview-plan-blue.vercel.app/",
    color: "rgba(16, 185, 129, 0.5)", // emerald-500
    images: ["/interview-preview1.png", "/interview-preview3.png","/interview-preview2.png"],
  },
  {
    title: "VINAY'S-Portfolio",
    desc: "A full-stack developer portfolio built with modern web technologies and concepts.",
    tech: ["React", "Node.js", "Tailwind CSS", "Framer Motion"],
    features: ["Smooth Animations", "Responsive Design"],
    icon: <Layers className="w-5 h-5 sm:w-6 sm:h-6" />,
    github: "https://github.com/VinayKumarMakvana/VINAY-S-Portfolio",
    live: "#",
    color: "rgba(59, 130, 246, 0.5)", // blue-500
    images: [ "/VINAY'S-Portfolio.png","/VINAY'S-Portfolio1.png", "/VINAY'S-Portfolio2.png"],
  }
];

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  
  // Mouse position values for the spotlight
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Values for 3D rotation
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const background = useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, ${project.color}, transparent 40%)`;

  const [isHovered, setIsHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (project.images && project.images.length > 0) {
      const timer = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
      }, 3000);
      return () => clearInterval(timer);
    }
  }, [project.images]);

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (project.images) {
      setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (project.images) {
      setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    
    // Spotlight calculations
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);

    // 3D rotation calculations
    const width = rect.width;
    const height = rect.height;
    const mouseXPos = e.clientX - rect.left;
    const mouseYPos = e.clientY - rect.top;
    const xPct = mouseXPos / width - 0.5;
    const yPct = mouseYPos / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1, type: "spring", bounce: 0.4 }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="relative flex flex-col h-full rounded-2xl glass border border-foreground/10 overflow-hidden cursor-crosshair group perspective-1000"
    >
      {/* Interactive Spotlight Effect */}
      <motion.div
        className="absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 pointer-events-none group-hover:opacity-100 z-10"
        style={{ background }}
      />

      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-foreground/5 to-transparent z-0" 
        style={{ transform: "translateZ(-5px)" }}
      />

      <div className="relative z-20 p-5 flex flex-col h-full">
        
        {/* Project Image Slider */}
        <div 
          className="w-full h-40 sm:h-48 rounded-xl overflow-hidden mb-4 relative group/slider border border-foreground/10"
          style={{ transform: "translateZ(20px)" }}
        >
          {project.images && project.images.length > 0 ? (
            <>
              <AnimatePresence mode="wait">
                <motion.img 
                  key={currentImageIndex}
                  src={project.images[currentImageIndex]} 
                  alt={`${project.title} - preview ${currentImageIndex + 1}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover/slider:scale-105"
                />
              </AnimatePresence>

              {/* Slider Controls */}
              {project.images.length > 1 && (
                <>
                  <button 
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background/60 backdrop-blur-md border border-foreground/20 flex items-center justify-center text-foreground/90 opacity-0 group-hover/slider:opacity-100 transition-opacity duration-300 hover:bg-foreground/20 z-30 shadow-lg"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  
                  <button 
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background/60 backdrop-blur-md border border-foreground/20 flex items-center justify-center text-foreground/90 opacity-0 group-hover/slider:opacity-100 transition-opacity duration-300 hover:bg-foreground/20 z-30 shadow-lg"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>

                  {/* Dots Indicator */}
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-30 bg-background/40 backdrop-blur-md px-2 py-1 rounded-full">
                    {project.images.map((_, i) => (
                      <div 
                        key={i} 
                        className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === currentImageIndex ? 'bg-white w-3' : 'bg-white/50'}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </>
          ) : (
            <div className="w-full h-full bg-foreground/5 flex items-center justify-center">
              <span className="text-foreground/50 text-sm">No Image</span>
            </div>
          )}

          {/* Subtle overlay that disappears on hover */}
          <div className="absolute inset-0 bg-background/40 group-hover/slider:bg-transparent transition-colors duration-500 z-10 pointer-events-none" />
          
          {/* Floating Icon over the image */}
          <div className="absolute top-3 left-3 w-10 h-10 rounded-xl glass border border-foreground/20 flex items-center justify-center text-foreground/90 z-20 pointer-events-none">
            {project.icon}
          </div>
        </div>

        {/* Header / Links Area */}
        <div className="flex items-center justify-between mb-3" style={{ transform: "translateZ(30px)" }}>
          <h3 className="text-lg sm:text-xl font-bold text-foreground group-hover:text-accent-primary transition-colors duration-300 line-clamp-1">
            {project.title}
          </h3>
          <div className="flex gap-2 shrink-0 ml-2">
            <a href={project.github} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-foreground/5 flex items-center justify-center hover:bg-foreground/10 transition-colors text-foreground/70 hover:text-foreground">
              <Code2 className="w-3.5 h-3.5" />
            </a>
            <a href={project.live} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-accent-primary/20 flex items-center justify-center hover:bg-accent-primary transition-colors text-accent-primary hover:text-background">
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1" style={{ transform: "translateZ(20px)" }}>
          <p className="text-foreground/70 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-3">
            {project.desc}
          </p>
        </div>

        {/* Tech Stack */}
        <div className="mt-auto" style={{ transform: "translateZ(10px)" }}>
          <div className="flex flex-wrap gap-1.5 mb-2.5">
            {project.features.map(f => (
              <span key={f} className="text-[9px] font-bold uppercase tracking-widest text-foreground/50 border border-foreground/10 px-2 py-0.5 rounded-full">
                {f}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {project.tech.map(t => (
              <span key={t} className="text-[10px] sm:text-xs font-medium text-foreground/80 bg-foreground/5 hover:bg-foreground/10 transition-colors px-2 py-1 rounded-md border border-foreground/5">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function Projects() {
  return (
    <section id="projects" className="py-24 relative z-10 bg-background overflow-hidden">
      
      {/* Background abstract elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-accent-primary/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 flex flex-col items-center text-center"
        >
          <div className="inline-block mb-3">
            <span className="glass px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-accent-primary border border-accent-primary/20">
              Work & Portfolio
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-foreground">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-emerald-400 to-purple-500">Engineering</span>
          </h2>
          <p className="text-foreground/60 max-w-2xl text-base">
            Applications architected for scale, performance, and user experience.
          </p>
        </motion.div>

        {/* 3D Perspective Grid */}
        <div 
          className="grid lg:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto"
          style={{ perspective: "1000px" }}
        >
          {projects.map((project, idx) => (
            <ProjectCard key={project.title} project={project} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
