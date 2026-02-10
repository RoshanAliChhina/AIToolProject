// Supabase configuration
// This file is ready to use once you add Supabase credentials to .env

let supabaseClient = null;

export const initSupabase = async () => {
  if (supabaseClient) return supabaseClient;

  try {
      const { createClient } = await import(/* @vite-ignore */ '@supabase/supabase-js');

    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

    // Check if config is provided
    if (!supabaseUrl || !supabaseAnonKey || supabaseUrl === '' || supabaseAnonKey === '') {
      console.warn('Supabase config not provided. Using localStorage fallback.');
      return null;
    }

    supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
    return supabaseClient;
  } catch (error) {
    console.error('Supabase initialization error:', error);
    return null;
  }
};

// Export client (will be null if not configured)
export { supabaseClient };

