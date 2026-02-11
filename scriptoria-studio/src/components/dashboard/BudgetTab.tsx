import { motion } from "framer-motion";
import type { Budget } from "@/types/script";
import { DollarSign } from "lucide-react";

interface BudgetTabProps {
  budget: Budget;
}

const BudgetTab = ({ budget }: BudgetTabProps) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: budget.currency || "USD",
    maximumFractionDigits: 0,
  });

  // Group by category
  const grouped = budget.lineItems.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, typeof budget.lineItems>);

  return (
    <div>
      {/* Total */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="p-6 bg-card border border-primary/30 rounded-xl glow-gold text-center mb-8"
      >
        <p className="text-sm text-muted-foreground font-body mb-1">Estimated Total Budget</p>
        <p className="text-4xl font-display font-bold text-gradient-gold">
          {formatter.format(budget.totalEstimate)}
        </p>
      </motion.div>

      {/* Line items by category */}
      <div className="space-y-6">
        {Object.entries(grouped).map(([category, items], i) => {
          const categoryTotal = items.reduce((sum, it) => sum + it.amount, 0);
          return (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-body font-semibold text-sm flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-primary" />
                  {category}
                </h4>
                <span className="text-sm font-body text-primary">{formatter.format(categoryTotal)}</span>
              </div>
              <div className="space-y-1">
                {items.map((item, j) => (
                  <div
                    key={j}
                    className="flex items-center justify-between py-2 px-4 bg-card border border-border rounded-lg"
                  >
                    <span className="text-sm text-secondary-foreground font-body">{item.description}</span>
                    <span className="text-sm text-muted-foreground font-body">{formatter.format(item.amount)}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default BudgetTab;
