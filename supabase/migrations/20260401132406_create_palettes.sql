-- Saved palettes
CREATE TABLE palettes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  source_image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Colors within a palette
CREATE TABLE palette_colors (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  palette_id UUID REFERENCES palettes(id) ON DELETE CASCADE NOT NULL,
  position INT NOT NULL,
  hex TEXT NOT NULL,
  rgb_r INT,
  rgb_g INT,
  rgb_b INT,
  lab_l FLOAT,
  lab_a FLOAT,
  lab_b FLOAT,
  pantone_code TEXT,
  pantone_name TEXT,
  sherwin_williams_code TEXT,
  sherwin_williams_name TEXT,
  benjamin_moore_code TEXT,
  benjamin_moore_name TEXT,
  behr_code TEXT,
  behr_name TEXT,
  ppg_code TEXT,
  ppg_name TEXT,
  valspar_code TEXT,
  valspar_name TEXT
);

-- RLS policies
ALTER TABLE palettes ENABLE ROW LEVEL SECURITY;
ALTER TABLE palette_colors ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own palettes" ON palettes
  FOR ALL USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can manage own palette colors" ON palette_colors
  FOR ALL USING (palette_id IN (SELECT id FROM palettes WHERE user_id = auth.uid()))
  WITH CHECK (palette_id IN (SELECT id FROM palettes WHERE user_id = auth.uid()));
