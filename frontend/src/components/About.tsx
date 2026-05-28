"use client";

import { motion } from "framer-motion";
import { BookOpen, Target, Code2, Rocket } from "lucide-react";
import { useRecruiterMode } from "./RecruiterModeContext";

export function About() {
  const { isRecruiterMode } = useRecruiterMode();

  return (
    <section id="about" className="py-24 relative z-10">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 md:text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-primary to-emerald-400">Me</span>
          </h2>
          <div className="w-20 h-1 bg-accent-primary mx-auto md:ml-auto md:mr-auto rounded-full mb-8"></div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6 text-foreground/80 leading-relaxed text-lg"
          >
            <p>
              I’m currently learning <strong className="text-accent-primary font-semibold">Full Stack Development with AI</strong> and building my skills in modern web technologies like <strong className="text-accent-primary font-semibold">MERN Stack, Java, and Python</strong>. <br />I enjoy creating responsive and user-friendly web applications while exploring how AI can be integrated into modern development.
            </p>
            <p>
              I am passionate about learning new technologies, solving problems through code, and working on projects that help me grow as a developer. My goal is to become a skilled Full Stack Developer by continuously learning and building real-world applications.
            </p>
            <div className="glass p-6 rounded-xl border border-accent-primary/20 bg-accent-primary/5">
              <h3 className="text-xl font-bold text-foreground mb-2 flex items-center gap-2">
                <Target className="w-5 h-5 text-accent-primary" /> Career Goal
              </h3>
              <p className="text-base text-foreground/70">
                To join a forward-thinking engineering team where I can contribute to high-impact products while continually expanding my expertise in system design and cloud architectures.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid sm:grid-cols-2 gap-4"
          >
            {[
              {
                icon: <Code2 className="w-8 h-8 text-emerald-400" />,
                title: "Frontend Engineering",
                desc: "React, Next.js, Tailwind, Framer Motion",
              },
              {
                icon: <BookOpen className="w-8 h-8 text-blue-400" />,
                title: "Backend Architecture",
                desc: "Node.js, Express, REST APIs, Microservices",
              },
              {
                icon: <Rocket className="w-8 h-8 text-accent-secondary" />,
                title: "Database Management",
                desc: "MongoDB, MySQL, Aggregations, Optimization",
              },
              {
                icon: <Target className="w-8 h-8 text-amber-400" />,
                title: "Problem Solving",
                desc: "500+ LeetCode problems solved, algorithms",
              },
            ].map((feature, i) => (
              <div key={i} className="glass p-6 rounded-xl hover:-translate-y-2 transition-transform duration-300 border border-foreground/5 hover:border-accent-primary/30 group">
                <div className="mb-4 p-3 bg-foreground/5 rounded-lg inline-block group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h4 className="text-lg font-bold mb-2">{feature.title}</h4>
                <p className="text-sm text-foreground/60">{feature.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Recruiter Quick-Pass Stats */}
        {isRecruiterMode && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {[
              { label: "Projects Built", value: "10+" },
              { label: "Contributions", value: "400+" },
              { label: "DSA Problems", value: "400+" },
              { label: "Hours Coded", value: "1200+" },
            ].map((stat, i) => (
              <div key={i} className="glass p-6 text-center rounded-xl border border-accent-secondary/30 bg-accent-secondary/5">
                <div className="text-3xl font-bold text-accent-secondary mb-1">{stat.value}</div>
                <div className="text-sm font-medium text-foreground/70">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
