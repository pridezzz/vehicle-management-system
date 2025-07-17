import { createClient } from '@supabase/supabase-js';

// Demo Supabase configuration - replace with your actual project details
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://demo-project.supabase.co';
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'demo-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database Tables
export const TABLES = {
  VEHICLE_MAKES: 'vehicle_makes',
  VEHICLE_MODELS: 'vehicle_models'
} as const;

// Database schemas for reference
/*
CREATE TABLE vehicle_makes (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  abrv VARCHAR(10) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE vehicle_models (
  id SERIAL PRIMARY KEY,
  make_id INTEGER REFERENCES vehicle_makes(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  abrv VARCHAR(10) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Sample data
INSERT INTO vehicle_makes (name, abrv) VALUES 
  ('BMW', 'BMW'),
  ('Mercedes-Benz', 'MB'),
  ('Audi', 'AUD'),
  ('Toyota', 'TOY'),
  ('Honda', 'HON');

INSERT INTO vehicle_models (make_id, name, abrv) VALUES 
  (1, '325i', '325i'),
  (1, 'X5', 'X5'),
  (1, 'M3', 'M3'),
  (2, 'C-Class', 'C'),
  (2, 'E-Class', 'E'),
  (2, 'S-Class', 'S'),
  (3, 'A4', 'A4'),
  (3, 'Q7', 'Q7'),
  (4, 'Camry', 'CAM'),
  (4, 'Prius', 'PRI'),
  (5, 'Civic', 'CIV'),
  (5, 'Accord', 'ACC');
*/