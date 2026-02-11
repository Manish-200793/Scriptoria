import { motion } from "framer-motion";
import type { ScheduleDay } from "@/types/script";
import { Calendar, Clock } from "lucide-react";

interface ScheduleTabProps {
  schedule: ScheduleDay[];
}

const ScheduleTab = ({ schedule }: ScheduleTabProps) => {
  const totalHours = schedule.reduce((sum, d) => sum + d.estimatedHours, 0);
  const totalDays = schedule.length;

  return (
    <div>
      <div className="flex items-center gap-6 mb-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground font-body">
          <Calendar className="w-4 h-4 text-primary" />
          {totalDays} Shooting Days
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground font-body">
          <Clock className="w-4 h-4 text-primary" />
          {totalHours} Total Hours
        </div>
      </div>

      <div className="space-y-4">
        {schedule.map((day, i) => (
          <motion.div
            key={day.day}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="p-5 bg-card border border-border rounded-xl flex flex-col sm:flex-row sm:items-center gap-4"
          >
            <div className="flex-shrink-0 w-16 h-16 rounded-lg bg-primary/10 flex flex-col items-center justify-center">
              <span className="text-xs text-primary font-body uppercase">Day</span>
              <span className="text-2xl font-display font-bold text-primary">{day.day}</span>
            </div>

            <div className="flex-1">
              <h4 className="font-body font-semibold text-sm mb-1">{day.location}</h4>
              <p className="text-xs text-muted-foreground font-body">
                Scenes: {day.scenes.join(", ")} — {day.estimatedHours}h estimated
              </p>
              {day.notes && (
                <p className="text-xs text-muted-foreground font-body mt-1 italic">
                  {day.notes}
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ScheduleTab;
