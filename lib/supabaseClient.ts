import { createClient } from '@supabase/supabase-js';

// Hardcoded credentials as requested by user
const supabaseUrl = 'https://lkcdiiggelxpazqzntpe.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxrY2RpaWdnZWx4cGF6cXpudHBlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQxNzE5MDUsImV4cCI6MjA3OTc0NzkwNX0.U4wSK1yKRwAsyVjp3n4fGnTGiR0M1gYn9FTPcJV7kHg';

export const supabase = createClient(
  supabaseUrl, 
  supabaseAnonKey
) as any;