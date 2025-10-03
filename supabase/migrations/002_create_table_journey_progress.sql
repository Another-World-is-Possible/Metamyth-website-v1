-- Create journey_progress table that supports multiple journeys per user
CREATE TABLE IF NOT EXISTS journey_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  journey_data JSONB DEFAULT '{}'::jsonb,
  llm_responses JSONB DEFAULT '{}'::jsonb,
  last_stage_id TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_journey_progress_user_id ON journey_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_journey_progress_user_active ON journey_progress(user_id, is_active);
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
COMMENT ON TABLE journey_progress IS 'Stores user progress through metamyth journeys. Supports multiple journeys per user with is_active flag.';
