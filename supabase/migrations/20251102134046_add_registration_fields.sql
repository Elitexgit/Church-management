/*
  # Add new registration fields

  1. New Columns
    - `event` (text) - Deeperlife event being registered for
    - `category` (text) - Registration category (Youth, Adult, Children, Campus)
    - `role` (text) - Role in church (Pastor, Choir, Member)
    - `region` (text) - Region/State
    - `church_district` (text) - Church district

  2. Changes
    - Add 5 new columns to registrations table
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'registrations' AND column_name = 'event'
  ) THEN
    ALTER TABLE registrations ADD COLUMN event text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'registrations' AND column_name = 'category'
  ) THEN
    ALTER TABLE registrations ADD COLUMN category text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'registrations' AND column_name = 'role'
  ) THEN
    ALTER TABLE registrations ADD COLUMN role text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'registrations' AND column_name = 'region'
  ) THEN
    ALTER TABLE registrations ADD COLUMN region text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'registrations' AND column_name = 'church_district'
  ) THEN
    ALTER TABLE registrations ADD COLUMN church_district text;
  END IF;
END $$;
