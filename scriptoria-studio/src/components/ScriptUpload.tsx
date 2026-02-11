import { useState, useRef } from "react";
import { Upload, FileText, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

interface ScriptUploadProps {
  onSubmit: (text: string) => void;
  isAnalyzing: boolean;
}

const ScriptUpload = ({ onSubmit, isAnalyzing }: ScriptUploadProps) => {
  const [scriptText, setScriptText] = useState("");
  const [fileName, setFileName] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result as string;
      setScriptText(text);
    };
    reader.readAsText(file);
  };

  const handleSubmit = () => {
    if (scriptText.trim().length < 50) return;
    onSubmit(scriptText);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl sm:text-4xl font-display font-bold mb-3">
          Upload Your <span className="text-gradient-gold">Screenplay</span>
        </h2>
        <p className="text-muted-foreground font-body font-light">
          Paste your script or upload a .txt file to begin AI analysis
        </p>
      </div>

      <div className="space-y-4">
        {/* File upload area */}
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-border rounded-xl p-8 text-center cursor-pointer hover:border-primary/40 transition-colors"
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".txt,.fountain,.fdx"
            onChange={handleFileUpload}
            className="hidden"
          />
          <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
          <p className="text-sm text-muted-foreground font-body">
            {fileName ? (
              <span className="text-primary flex items-center justify-center gap-2">
                <FileText className="w-4 h-4" />
                {fileName}
              </span>
            ) : (
              "Click to upload .txt or .fountain file"
            )}
          </p>
        </div>

        {/* Text area */}
        <textarea
          value={scriptText}
          onChange={(e) => setScriptText(e.target.value)}
          placeholder="Or paste your screenplay here...

INT. COFFEE SHOP - DAY

SARAH (30s, determined) sits at a corner table, typing furiously on a laptop. The cafe is nearly empty except for..."
          className="w-full h-64 bg-card border border-border rounded-xl p-4 text-foreground placeholder:text-muted-foreground font-body text-sm resize-none focus:outline-none focus:border-primary/40 transition-colors"
        />

        {/* Submit button */}
        <button
          onClick={handleSubmit}
          disabled={isAnalyzing || scriptText.trim().length < 50}
          className="w-full py-4 bg-primary text-primary-foreground font-body font-semibold rounded-xl glow-gold transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Analyzing Script...
            </>
          ) : (
            <>
              <FileText className="w-5 h-5" />
              Analyze Script
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
};

export default ScriptUpload;
