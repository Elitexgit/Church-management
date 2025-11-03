/*
  # Create admin system and schedules

  1. New Tables
    - `admin_users`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `email` (text, unique)
      - `role` (text) - 'super_admin' or 'admin'
      - `created_at` (timestamp)

    - `schedules`
      - `id` (uuid, primary key)
      - `title` (text) - Event/activity title
      - `description` (text)
      - `date` (date) - Event date
      - `start_time` (time) - Start time
      - `end_time` (time) - End time
      - `location` (text)
      - `created_by` (uuid, foreign key to admin_users)
      - `created_at` (timestamp)

    - `meals_menu`
      - `id` (uuid, primary key)
      - `name` (text) - Meal name
      - `description` (text)
      - `meal_type` (text) - 'breakfast', 'lunch', 'dinner', 'snack'
      - `date` (date)
      - `dietary_info` (text)
      - `created_by` (uuid, foreign key to admin_users)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all new tables
    - Admins can view/manage their content
    - Regular users can view published content

  3. Important Notes
    - paulelite606@gmail.com will be set as super_admin
*/

CREATE TABLE IF NOT EXISTS admin_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid UNIQUE,
  email text UNIQUE NOT NULL,
  role text NOT NULL DEFAULT 'admin',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin can view all admins"
  ON admin_users FOR SELECT
  TO authenticated
  USING (true);

CREATE TABLE IF NOT EXISTS schedules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  date date NOT NULL,
  start_time time NOT NULL,
  end_time time NOT NULL,
  location text,
  created_by uuid REFERENCES admin_users(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE schedules ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view schedules"
  ON schedules FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can create schedules"
  ON schedules FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = created_by
      AND admin_users.user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can update their schedules"
  ON schedules FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = created_by
      AND admin_users.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = created_by
      AND admin_users.user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can delete their schedules"
  ON schedules FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = created_by
      AND admin_users.user_id = auth.uid()
    )
  );

CREATE TABLE IF NOT EXISTS meals_menu (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  meal_type text NOT NULL,
  date date NOT NULL,
  dietary_info text,
  created_by uuid REFERENCES admin_users(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE meals_menu ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view meals"
  ON meals_menu FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can create meals"
  ON meals_menu FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = created_by
      AND admin_users.user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can update their meals"
  ON meals_menu FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = created_by
      AND admin_users.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = created_by
      AND admin_users.user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can delete their meals"
  ON meals_menu FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = created_by
      AND admin_users.user_id = auth.uid()
    )
  );
