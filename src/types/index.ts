export interface ExtractedColor {
  hex: string;
  rgb: { r: number; g: number; b: number };
  lab: { l: number; a: number; b: number };
  population: number;
}

export interface BrandMatch {
  brand: string;
  code: string;
  name: string;
  hex: string;
  deltaE: number;
  shopUrl?: string;
}

export interface MatchedColor extends ExtractedColor {
  matches: BrandMatch[];
}

export interface PaintColor {
  code: string;
  name: string;
  hex: string;
  rgb: { r: number; g: number; b: number };
  lab?: { l: number; a: number; b: number };
}

export interface SavedPalette {
  id: string;
  name: string;
  created_at: string;
  colors: SavedColor[];
}

export interface SavedColor {
  id: string;
  position: number;
  hex: string;
  rgb_r: number;
  rgb_g: number;
  rgb_b: number;
  pantone_code: string | null;
  pantone_name: string | null;
  sherwin_williams_code: string | null;
  sherwin_williams_name: string | null;
  benjamin_moore_code: string | null;
  benjamin_moore_name: string | null;
  behr_code: string | null;
  behr_name: string | null;
  ppg_code: string | null;
  ppg_name: string | null;
  valspar_code: string | null;
  valspar_name: string | null;
}
