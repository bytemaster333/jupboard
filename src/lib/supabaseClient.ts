import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zreknaqtjijmmcklpboh.supabase.co'; // Supabase dashboard > Project Settings > API
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpyZWtuYXF0amlqbW1ja2xwYm9oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY2MjYyOTIsImV4cCI6MjA2MjIwMjI5Mn0.cVskeVrieXGumO02GDbRLIwU9w-c22WUKuLb59OazZc'; // Supabase dashboard > Project Settings > API > anon public key

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
