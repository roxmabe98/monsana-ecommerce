// src/supabase/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xuxkkxucwninfopeqvdz.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh1eGtreHVjd25pbmZvcGVxdmR6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg5NjkyNTYsImV4cCI6MjA2NDU0NTI1Nn0.GeXWq5cyqUFWdilZMEq1sTD2Ixbj_7r7GIG5shNqKXw';

export const supabase = createClient(supabaseUrl, supabaseKey);