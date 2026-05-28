import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { AdvancedConcepts } from "@/components/AdvancedConcepts";
import { Projects } from "@/components/Projects";
import { Architecture } from "@/components/Architecture";
import { Terminal } from "@/components/Terminal";
import { Contact } from "@/components/Contact";

export default function Home() {
  return (
    <div className="flex flex-col w-full overflow-x-hidden">
      <Hero />
      <About />
      <Skills />
      <AdvancedConcepts />
      <Projects />
      <Architecture />
      <Terminal />
      <Contact />
    </div>
  );
}
