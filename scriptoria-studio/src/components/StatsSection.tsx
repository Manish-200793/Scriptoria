import { motion } from "framer-motion";

const stats = [
  { value: "80%", label: "Faster Pre-Production" },
  { value: "70%", label: "Cost Reduction" },
  { value: "100%", label: "Entity Accuracy" },
  { value: "3 mo", label: "MVP Timeline" },
];

const StatsSection = () => {
  return (
    <section className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl sm:text-5xl font-display font-bold text-gradient-gold mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground font-body tracking-wide">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
