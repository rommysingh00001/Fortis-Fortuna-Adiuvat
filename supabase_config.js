// supabase.js
export const SUPABASE_URL = "https://mqmcnbsgnaunqsiqbzxy.supabase.co";      // Replace with your URL
export const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1xbWNuYnNnbmF1bnFzaXFienh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg2MjYyNzIsImV4cCI6MjA5NDIwMjI3Mn0.Z_ZXi4q5NKGQw_6k0ICaz94ilnoky8jdYqhtTmKLAE4";          // Replace with your anon key

// Create Supabase client
export const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Demo USER_ID (replace with auth later)
export const USER_ID = "demo-user";
