import { createClient } from '@supabase/supabase-js'

// Use Vite's special syntax to access environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  //throw new Error("Supabase URL and Anon Key must be defined in .env file. (e.g. VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY)");
}

// Create and export the Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
