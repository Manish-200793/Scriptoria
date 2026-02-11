import { motion } from "framer-motion";
import type { Character, Prop, Location, Scene } from "@/types/script";
import { Users, Package, MapPin, Film } from "lucide-react";

interface BreakdownTabProps {
  characters: Character[];
  props: Prop[];
  locations: Location[];
  scenes: Scene[];
}

const SectionTitle = ({ icon: Icon, title, count }: { icon: any; title: string; count: number }) => (
  <div className="flex items-center gap-2 mb-4">
    <Icon className="w-5 h-5 text-primary" />
    <h3 className="text-lg font-display font-semibold">{title}</h3>
    <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-body">
      {count}
    </span>
  </div>
);

const BreakdownTab = ({ characters, props, locations, scenes }: BreakdownTabProps) => {
  return (
    <div className="space-y-8">
      {/* Characters */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <SectionTitle icon={Users} title="Characters" count={characters.length} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {characters.map((char) => (
            <div key={char.name} className="p-4 bg-card border border-border rounded-xl">
              <div className="flex items-center justify-between mb-1">
                <span className="font-body font-semibold text-sm">{char.name}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-body ${
                  char.role === "Lead" ? "bg-primary/20 text-primary" :
                  char.role === "Supporting" ? "bg-secondary text-secondary-foreground" :
                  "bg-muted text-muted-foreground"
                }`}>{char.role}</span>
              </div>
              <p className="text-xs text-muted-foreground font-body">{char.description}</p>
              <p className="text-xs text-muted-foreground font-body mt-1">Scenes: {char.scenes.join(", ")}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Locations */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
        <SectionTitle icon={MapPin} title="Locations" count={locations.length} />
        <div className="grid sm:grid-cols-2 gap-3">
          {locations.map((loc) => (
            <div key={loc.name + loc.type} className="p-4 bg-card border border-border rounded-xl flex items-start gap-3">
              <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <span className="font-body font-semibold text-sm">{loc.name}</span>
                <p className="text-xs text-muted-foreground font-body">{loc.type} — {loc.timeOfDay}</p>
                <p className="text-xs text-muted-foreground font-body">Scenes: {loc.scenes.join(", ")}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Props */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        <SectionTitle icon={Package} title="Props & Items" count={props.length} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {props.map((prop) => (
            <div key={prop.name} className="p-3 bg-card border border-border rounded-xl">
              <span className="font-body font-medium text-sm">{prop.name}</span>
              <p className="text-xs text-muted-foreground font-body">{prop.category} — Scenes: {prop.scenes.join(", ")}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Scenes */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
        <SectionTitle icon={Film} title="Scene Breakdown" count={scenes.length} />
        <div className="space-y-3">
          {scenes.map((scene) => (
            <div key={scene.number} className="p-4 bg-card border border-border rounded-xl">
              <div className="flex items-center justify-between mb-1">
                <span className="font-body font-semibold text-sm">Scene {scene.number}: {scene.heading}</span>
                <span className="text-xs text-muted-foreground font-body">{scene.estimatedDuration}</span>
              </div>
              <p className="text-sm text-muted-foreground font-body">{scene.summary}</p>
              <p className="text-xs text-muted-foreground font-body mt-1">Cast: {scene.characters.join(", ")}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default BreakdownTab;
