import { useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { ScriptAnalysis } from "@/types/script";
import { toast } from "sonner";

export function useScriptAnalysis() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<ScriptAnalysis | null>(null);

  const analyzeScript = useCallback(async (scriptText: string) => {
    setIsAnalyzing(true);
    setAnalysis(null);
    try {
      const { data, error } = await supabase.functions.invoke("analyze-script", {
        body: { scriptText },
      });

      if (error) {
        toast.error(error.message || "Analysis failed");
        return null;
      }

      if (data?.error) {
        toast.error(data.error);
        return null;
      }

      setAnalysis(data as ScriptAnalysis);
      toast.success(`"${data.title}" analyzed successfully!`);
      return data as ScriptAnalysis;
    } catch (e) {
      toast.error("Failed to connect to analysis service");
      return null;
    } finally {
      setIsAnalyzing(false);
    }
  }, []);

  return { isAnalyzing, analysis, analyzeScript, setAnalysis };
}
