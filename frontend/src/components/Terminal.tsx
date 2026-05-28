"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Terminal as TerminalIcon } from "lucide-react";

export function Terminal() {
  const [history, setHistory] = useState<{ cmd: string; out: React.ReactNode }[]>([
    { cmd: "", out: "Welcome to VKM OS v2.0.0. Type 'help' for a list of available commands." }
  ]);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bottomRef.current && bottomRef.current.parentElement) {
      const parent = bottomRef.current.parentElement;
      parent.scrollTop = parent.scrollHeight;
    }
  }, [history]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    let output: React.ReactNode = "";

    switch (trimmed) {
      case "help":
        output = (
          <div className="flex flex-col gap-1 mt-1 text-emerald-400">
            <span>help     - Show this help message</span>
            <span>skills   - List technical skills</span>
            <span>projects - Show top projects</span>
            <span>contact  - Show contact information</span>
            <span>clear    - Clear terminal history</span>
            <span>sudo     - ???</span>
          </div>
        );
        break;
      case "skills":
        output = (
          <div className="mt-1">
            <span className="text-blue-400">Frontend:</span> React, Next.js, TypeScript, Tailwind<br />
            <span className="text-green-400">Backend:</span> Node.js, Express, Python<br />
            <span className="text-yellow-400">DB/Tools:</span> MongoDB, Docker, Git
          </div>
        );
        break;
      case "projects":
        output = "Opening projects section... (Scroll down to view full details)";
        window.location.hash = "#projects";
        break;
      case "contact":
        output = "Email: vinay@example.com | GitHub: github.com/vinaymakvana";
        break;
      case "clear":
        setHistory([]);
        return;
      case "sudo":
        output = <span className="text-red-500">Access denied. This incident will be reported.</span>;
        break;
      case "":
        output = "";
        break;
      default:
        output = <span className="text-red-400">Command not found: {trimmed}. Type 'help' for available commands.</span>;
    }

    setHistory((prev) => [...prev, { cmd, out: output }]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(input);
      setInput("");
    }
  };

  return (
    <section className="py-12 relative z-10 hidden md:block">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-[#0B0B0F]/90 backdrop-blur-md"
        >
          {/* Terminal Header */}
          <div className="bg-white/5 px-4 py-2 flex items-center border-b border-white/10">
            <div className="flex gap-2 mr-4">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="flex items-center gap-2 text-xs text-foreground/50 font-mono mx-auto">
              <TerminalIcon className="w-3 h-3" /> visitor@vinay-os:~
            </div>
          </div>

          {/* Terminal Body */}
          <div className="p-4 font-mono text-sm h-64 overflow-y-auto" onClick={() => inputRef.current?.focus()}>
            {history.map((line, i) => (
              <div key={i} className="mb-2">
                {line.cmd && (
                  <div className="text-foreground/80">
                    <span className="text-emerald-400 font-bold">visitor@vkm:~$</span> {line.cmd}
                  </div>
                )}
                <div className="text-foreground/70">{line.out}</div>
              </div>
            ))}
            
            <div className="flex items-center mt-2">
              <span className="text-emerald-400 font-bold mr-2">visitor@vkm:~$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent border-none outline-none text-foreground/90 caret-emerald-400"
                autoComplete="off"
                spellCheck="false"
              />
            </div>
            <div ref={bottomRef} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
