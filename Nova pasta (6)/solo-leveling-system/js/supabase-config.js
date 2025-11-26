
const SUPABASE_URL = 'https://ofojlwvwkfxoukjzhfqz.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9mb2psd3Z3a2Z4b3VranpoZnF6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQxNTk2NDIsImV4cCI6MjA3OTczNTY0Mn0.ZeGjodoG7_t_bXULISNqY_qAPR_Wi887-s267XyDNwY';

// Initialize Supabase Client
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

console.log("Supabase Initialized");
