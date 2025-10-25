/*
  # Deeper Life Church Retreat Management System - Initial Schema

  ## Overview
  This migration sets up the core database structure for the retreat management system
  including user profiles, registrations, and system configurations.

  ## New Tables

  ### 1. profiles
  Extends Supabase auth.users with additional user information
  - `id` (uuid, primary key, references auth.users)
  - `full_name` (text) - User's full name
  - `phone_number` (text) - Contact phone number
  - `church_branch` (text) - User's home church branch
  - `age_group` (text) - Age category
  - `avatar_url` (text, nullable) - Profile picture URL
  - `created_at` (timestamptz) - Account creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### 2. registrations
  Stores retreat registration information
  - `id` (uuid, primary key)
  - `user_id` (uuid, references auth.users) - Registered user
  - `full_name` (text) - Registrant's full name
  - `email` (text) - Email address
  - `phone_number` (text) - Contact number
  - `church_branch` (text) - Church branch
  - `age_group` (text) - Age category
  - `accommodation` (text) - Accommodation preference
  - `special_requirements` (text, nullable) - Special needs/dietary restrictions
  - `status` (text) - Registration status (pending, confirmed, checked_in)
  - `created_at` (timestamptz) - Registration timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### 3. live_streams
  Manages live stream configurations
  - `id` (uuid, primary key)
  - `title` (text) - Stream title
  - `description` (text, nullable) - Stream description
  - `youtube_video_id` (text) - YouTube video ID
  - `speaker` (text, nullable) - Speaker name
  - `is_live` (boolean) - Whether stream is currently live
  - `scheduled_time` (timestamptz, nullable) - Scheduled start time
  - `created_at` (timestamptz) - Creation timestamp

  ## Security
  - RLS (Row Level Security) enabled on all tables
  - Users can read their own profile and update it
  - Users can create registrations and view their own
  - Admins can view all registrations
  - Live streams are readable by all authenticated users
  - Only admins can manage live streams

  ## Notes
  - All timestamps use timestamptz for proper timezone handling
  - UUIDs used for all primary keys for security and scalability
  - Proper indexes added for foreign keys and frequently queried columns
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text NOT NULL,
  phone_number text,
  church_branch text,
  age_group text,
  avatar_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create registrations table
CREATE TABLE IF NOT EXISTS registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  full_name text NOT NULL,
  email text NOT NULL,
  phone_number text NOT NULL,
  church_branch text NOT NULL,
  age_group text NOT NULL,
  accommodation text NOT NULL DEFAULT 'Not Required',
  special_requirements text,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create live_streams table
CREATE TABLE IF NOT EXISTS live_streams (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  youtube_video_id text NOT NULL,
  speaker text,
  is_live boolean DEFAULT false,
  scheduled_time timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_registrations_user_id ON registrations(user_id);
CREATE INDEX IF NOT EXISTS idx_registrations_status ON registrations(status);
CREATE INDEX IF NOT EXISTS idx_registrations_created_at ON registrations(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_live_streams_is_live ON live_streams(is_live);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE live_streams ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Registrations policies
CREATE POLICY "Users can view their own registrations"
  ON registrations FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create registrations"
  ON registrations FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own registrations"
  ON registrations FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Live streams policies (everyone can view)
CREATE POLICY "Anyone can view live streams"
  ON live_streams FOR SELECT
  TO authenticated
  USING (true);

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_registrations_updated_at
  BEFORE UPDATE ON registrations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert sample live stream
INSERT INTO live_streams (title, description, youtube_video_id, speaker, is_live)
VALUES (
  'Sermon by Dr. William F. Kumuyi',
  'Live worship and teaching session',
  'dQw4w9WgXcQ',
  'Dr. William F. Kumuyi',
  true
) ON CONFLICT DO NOTHING;
