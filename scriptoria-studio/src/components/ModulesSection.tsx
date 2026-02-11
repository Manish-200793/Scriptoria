import { motion } from "framer-motion";
import { FileText, Paintbrush, Calendar, LayoutDashboard } from "lucide-react";

const modules = [
  {
    icon: FileText,
    title: "Ingestion & Parsing",
    desc: "IBM AI–powered Named Entity Recognition converts raw scripts into structured databases of characters, props, and locations.",
  },
  {
    icon: Paintbrush,
    title: "Creative Synthesis",
    desc: "Gemini's long-context window generates scene summaries and visually consistent storyboards from your screenplay.",
  },
  {
    icon: Calendar,
    title: "Logistical Intelligence",
    desc: "Automated production scheduling and line-item budgeting with algorithmic resource allocation optimization.",
  },
  {
    icon: LayoutDashboard,
    title: "Interactive Dashboard",
    desc: "Real-time interface to review, edit, and export AI-generated assets into industry-standard formats.",
  },
];

const ModulesSection = () => {
  return (
    <section className="py-24 px-6 bg-card/50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm tracking-[0.2em] uppercase text-primary font-body mb-4 block">
            Core Modules
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-bold mb-4">
            Script to Screen, <span className="text-gradient-gold">Automated</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {modules.map((mod, i) => (
            <motion.div
              key={mod.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group p-6 rounded-xl bg-background border border-border hover:border-primary/30 transition-all duration-500"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                <mod.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-display font-semibold mb-2">
                {mod.title}
              </h3>
              <p className="text-sm text-muted-foreground font-body font-light leading-relaxed">
                {mod.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ModulesSection;
