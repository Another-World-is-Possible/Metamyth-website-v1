-- Create journey_progress table for storing user metamyth journey data
CREATE TABLE IF NOT EXISTS journey_progress (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  journey_data JSONB DEFAULT '{}'::jsonb,
  llm_responses JSONB DEFAULT '{}'::jsonb,
  last_stage_id TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_journey_progress_user_id ON journey_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_journey_progress_updated_at ON journey_progress(updated_at);

-- Enable Row Level Security
ALTER TABLE journey_progress ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (for idempotency)
DROP POLICY IF EXISTS "Users can view own progress" ON journey_progress;
DROP POLICY IF EXISTS "Users can insert own progress" ON journey_progress;
DROP POLICY IF EXISTS "Users can update own progress" ON journey_progress;
DROP POLICY IF EXISTS "Users can delete own progress" ON journey_progress;

-- Policy: Users can only read their own progress
CREATE POLICY "Users can view own progress" ON journey_progress
  FOR SELECT USING (auth.uid() = user_id);

-- Policy: Users can insert their own progress
CREATE POLICY "Users can insert own progress" ON journey_progress
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own progress
CREATE POLICY "Users can update own progress" ON journey_progress
  FOR UPDATE USING (auth.uid() = user_id);

-- Policy: Users can delete their own progress
CREATE POLICY "Users can delete own progress" ON journey_progress
  FOR DELETE USING (auth.uid() = user_id);

-- Add comment for documentation
COMMENT ON TABLE journey_progress IS 'Stores user progress through the metamyth journey, synced from localStorage';
