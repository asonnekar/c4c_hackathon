import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  "https://oahnqpqpsqmmlwxumhpa.supabase.co/";
const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9haG5xcHFwc3FtbWx3eHVtaHBhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM4Nzc2OTIsImV4cCI6MjA1OTQ1MzY5Mn0.zTcXBen9Ddv2nsYHnhHmPwM2MOAniZH4Duzg7UhH6DI";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
