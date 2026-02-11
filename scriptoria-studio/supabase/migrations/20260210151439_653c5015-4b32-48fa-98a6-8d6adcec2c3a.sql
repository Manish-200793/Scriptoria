
-- Table for storing script analyses
CREATE TABLE public.script_analyses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL DEFAULT 'Untitled Script',
  script_text TEXT NOT NULL,
  
  -- Breakdown data (JSON)
  characters JSONB DEFAULT '[]',
  props JSONB DEFAULT '[]',
  locations JSONB DEFAULT '[]',
  scenes JSONB DEFAULT '[]',
  
  -- Schedule
  schedule JSONB DEFAULT '[]',
  
  -- Budget
  budget JSONB DEFAULT '{}',
  
  -- Storyboard descriptions
  storyboards JSONB DEFAULT '[]',
  
  -- Status
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'analyzing', 'complete', 'error')),
  error_message TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.script_analyses ENABLE ROW LEVEL SECURITY;

-- Public read/write for now (no auth required for demo)
CREATE POLICY "Allow public read" ON public.script_analyses FOR SELECT USING (true);
CREATE POLICY "Allow public insert" ON public.script_analyses FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update" ON public.script_analyses FOR UPDATE USING (true);
CREATE POLICY "Allow public delete" ON public.script_analyses FOR DELETE USING (true);

-- Timestamp trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_script_analyses_updated_at
BEFORE UPDATE ON public.script_analyses
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
