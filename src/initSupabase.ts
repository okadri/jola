import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import {REACT_APP_SUPABASE_URL, REACT_APP_SUPABASE_ANON_KEY} from "@env";

const supabaseUrl = REACT_APP_SUPABASE_URL
const supabaseKey = REACT_APP_SUPABASE_ANON_KEY

// Better put your these secret keys in .env file
export const supabase = createClient(supabaseUrl, supabaseKey, {
  localStorage: AsyncStorage as any,
});
