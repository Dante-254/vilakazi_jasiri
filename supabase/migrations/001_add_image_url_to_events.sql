-- Add image_url to events table
ALTER TABLE IF EXISTS events ADD COLUMN IF NOT EXISTS image_url TEXT;

-- Add show_main_section and show_card if not exists (defensive)
ALTER TABLE IF EXISTS events ADD COLUMN IF NOT EXISTS show_main_section BOOLEAN DEFAULT FALSE;
ALTER TABLE IF EXISTS events ADD COLUMN IF NOT EXISTS show_card BOOLEAN DEFAULT TRUE;
