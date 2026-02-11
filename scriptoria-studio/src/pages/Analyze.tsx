import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, FileText, Calendar, DollarSign, Camera } from "lucide-react";
import { Link } from "react-router-dom";
import ScriptUpload from "@/components/ScriptUpload";
import BreakdownTab from "@/components/dashboard/BreakdownTab";
import ScheduleTab from "@/components/dashboard/ScheduleTab";
import BudgetTab from "@/components/dashboard/BudgetTab";
import StoryboardTab from "@/components/dashboard/StoryboardTab";
import { useScriptAnalysis } from "@/hooks/useScriptAnalysis";

const tabs = [
  { id: "breakdown", label: "Breakdown", icon: FileText },
  { id: "schedule", label: "Schedule", icon: Calendar },
  { id: "budget", label: "Budget", icon: DollarSign },
  { id: "storyboard", label: "Storyboard", icon: Camera },
] as const;

type TabId = (typeof tabs)[number]["id"];

const AnalyzePage = () => {
  const { isAnalyzing, analysis, analyzeScript } = useScriptAnalysis();
  const [activeTab, setActiveTab] = useState<TabId>("breakdown");

  return (
    <main className="bg-background min-h-screen">
      {/* Header */}
      <header className="border-b border-border px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors font-body text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
          <h1 className="text-lg font-display font-bold text-gradient-gold">Scriptoria</h1>
          <div className="w-16" />
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-10">
        <AnimatePresence mode="wait">
          {!analysis ? (
            <motion.div key="upload" exit={{ opacity: 0, y: -20 }}>
              <ScriptUpload onSubmit={analyzeScript} isAnalyzing={isAnalyzing} />
            </motion.div>
          ) : (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {/* Title */}
              <div className="text-center mb-8">
                <h2 className="text-3xl sm:text-4xl font-display font-bold mb-2">
                  <span className="text-gradient-gold">{analysis.title}</span>
                </h2>
                <p className="text-sm text-muted-foreground font-body">
                  {analysis.scenes.length} scenes · {analysis.characters.length} characters · {analysis.locations.length} locations
                </p>
              </div>

              {/* Tab navigation */}
              <div className="flex items-center justify-center gap-1 mb-8 bg-card border border-border rounded-xl p-1.5">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-body font-medium transition-all duration-200 ${
                      activeTab === tab.id
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                ))}
              </div>

              {/* Tab content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {activeTab === "breakdown" && (
                    <BreakdownTab
                      characters={analysis.characters}
                      props={analysis.props}
                      locations={analysis.locations}
                      scenes={analysis.scenes}
                    />
                  )}
                  {activeTab === "schedule" && <ScheduleTab schedule={analysis.schedule} />}
                  {activeTab === "budget" && <BudgetTab budget={analysis.budget} />}
                  {activeTab === "storyboard" && <StoryboardTab storyboards={analysis.storyboards} />}
                </motion.div>
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
};

export default AnalyzePage;
