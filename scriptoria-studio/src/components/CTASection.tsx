import { motion } from "framer-motion";
import { Clapperboard } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-24 px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto text-center"
      >
        <Clapperboard className="w-10 h-10 text-primary mx-auto mb-6" />
        <h2 className="text-3xl sm:text-5xl font-display font-bold mb-6">
          Ready to Revolutionize{" "}
          <span className="text-gradient-gold">Your Production?</span>
        </h2>
        <p className="text-muted-foreground font-body font-light mb-10 max-w-xl mx-auto leading-relaxed">
          Join the next generation of filmmakers using AI to bridge the gap
          between creative storytelling and production logistics.
        </p>
        <button className="px-10 py-4 bg-primary text-primary-foreground font-body font-semibold rounded-lg glow-gold transition-all duration-300 hover:scale-105">
          Get Early Access
        </button>
      </motion.div>

      {/* Footer */}
      <div className="mt-24 pt-8 border-t border-border max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground font-body">
        <span>© 2026 Scriptoria — Team Penguins</span>
        <span className="flex items-center gap-1">
          Powered by IBM AI <span className="text-primary">&</span> Gemini
        </span>
      </div>
    </section>
  );
};

export default CTASection;
