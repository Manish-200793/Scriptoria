import { motion } from "framer-motion";
import { Shield, Eye, Cpu, Palette } from "lucide-react";

const engines = [
  {
    name: "IBM AI — Precision Engine",
    icon: Cpu,
    description:
      "Enterprise-grade NLP for deterministic entity extraction. Treats your script as a structured database — zero hallucinations on props, cast, and schedules.",
    features: ["Named Entity Recognition", "Structured Data Extraction", "100% Accuracy Guarantee"],
    accent: "border-blue-500/30",
    glow: "shadow-[0_0_40px_-10px_hsl(210_80%_50%/0.2)]",
    iconColor: "text-blue-400",
  },
  {
    name: "Gemini — Creative Engine",
    icon: Palette,
    description:
      "Multimodal long-context reasoning for visually consistent storyboards and narrative insights. Remembers the entire script's visual identity.",
    features: ["Visual Storyboarding", "Narrative Continuity", "Style Consistency"],
    accent: "border-primary/30",
    glow: "glow-gold",
    iconColor: "text-primary",
  },
];

const DualEngineSection = () => {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-sm tracking-[0.2em] uppercase text-primary font-body">
              Dual-Engine Architecture
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold mb-4">
            Two Engines. <span className="text-gradient-gold">One Vision.</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto font-body font-light">
            Precision meets creativity — the first system to combine enterprise
            accuracy with cinematic imagination.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {engines.map((engine, i) => (
            <motion.div
              key={engine.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className={`relative p-8 rounded-2xl bg-card border ${engine.accent} ${engine.glow} transition-all duration-500 hover:scale-[1.02]`}
            >
              <engine.icon className={`w-10 h-10 ${engine.iconColor} mb-6`} />
              <h3 className="text-xl font-display font-semibold mb-3">
                {engine.name}
              </h3>
              <p className="text-muted-foreground font-body font-light mb-6 leading-relaxed">
                {engine.description}
              </p>
              <ul className="space-y-2">
                {engine.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-2 text-sm text-secondary-foreground font-body"
                  >
                    <Eye className="w-3 h-3 text-primary flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DualEngineSection;
