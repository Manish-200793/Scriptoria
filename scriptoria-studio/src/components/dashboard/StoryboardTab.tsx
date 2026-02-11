import { motion } from "framer-motion";
import type { Storyboard } from "@/types/script";
import { Camera } from "lucide-react";

interface StoryboardTabProps {
  storyboards: Storyboard[];
}

const StoryboardTab = ({ storyboards }: StoryboardTabProps) => {
  return (
    <div className="grid sm:grid-cols-2 gap-6">
      {storyboards.map((board, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08 }}
          className="bg-card border border-border rounded-xl overflow-hidden"
        >
          {/* Visual placeholder styled like a storyboard frame */}
          <div className="aspect-video bg-muted flex items-center justify-center relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/80" />
            <Camera className="w-10 h-10 text-muted-foreground/50" />
            <div className="absolute bottom-3 left-3 right-3">
              <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded font-body">
                Scene {board.sceneNumber} — {board.cameraAngle}
              </span>
            </div>
          </div>

          <div className="p-4">
            <p className="text-sm font-body text-secondary-foreground leading-relaxed mb-2">
              {board.shotDescription}
            </p>
            <p className="text-xs text-muted-foreground font-body italic">
              Mood: {board.mood}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default StoryboardTab;
