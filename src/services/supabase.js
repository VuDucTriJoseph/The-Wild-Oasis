import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://nywmlqwstwsgkqvbklbs.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im55d21scXdzdHdzZ2txdmJrbGJzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI4MDU2MTksImV4cCI6MjA2ODM4MTYxOX0.YqcsLbPz9UoYtjQpIX4RWIUfFtR6Q3hEQfTtZ1Ij-0A";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
