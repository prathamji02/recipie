import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Only initialize if we have the credentials
let supabase = null
if (supabaseUrl && supabaseKey) {
    supabase = createClient(supabaseUrl, supabaseKey)
}

export { supabase }
