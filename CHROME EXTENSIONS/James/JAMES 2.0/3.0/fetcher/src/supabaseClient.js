import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://usxmcwfatfhvwfvqspil.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVzeG1jd2ZhdGZodndmdnFzcGlsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTcxMDI0NTcsImV4cCI6MjAxMjY3ODQ1N30.6ulYTo0WXXPJ_hFseZ5uZl_BJzg1iY7AN7h3ZyeXj-s"

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
