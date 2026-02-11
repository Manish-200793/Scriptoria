import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import heroBg from "@/assets/hero-bg.jpg";
import { Film, Sparkles } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="Cinematic film production"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-center gap-2 mb-6"
        >
          <Film className="w-5 h-5 text-primary" />
          <span className="text-sm font-body tracking-[0.3em] uppercase text-primary">
            AI-Powered Pre-Production
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-5xl sm:text-7xl lg:text-8xl font-display font-bold tracking-tight mb-6"
        >
          <span className="text-gradient-gold">Scriptoria</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 font-body font-light leading-relaxed"
        >
          Your Digital First Assistant Director. Transform raw screenplays into
          complete production packets — breakdowns, schedules, budgets, and
          storyboards — in hours, not weeks.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            to="/analyze"
            className="group flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-body font-semibold rounded-lg glow-gold transition-all duration-300 hover:scale-105"
          >
            <Sparkles className="w-4 h-4" />
            Upload Your Script
          </Link>
         
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
