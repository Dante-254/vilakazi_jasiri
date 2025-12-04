-- Add age to patrol_members table
ALTER TABLE IF EXISTS patrol_members ADD COLUMN IF NOT EXISTS age INTEGER;
