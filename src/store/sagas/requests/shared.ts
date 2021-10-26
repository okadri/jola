import { supabase } from "../../../initSupabase"
import { Country, Language } from "../../shared/model"

export function requestLoadCountries() {
    return supabase
        .from<Country>('countries')
        .select(`*`)
}

export function requestLoadLanguages() {
    return supabase
        .from<Language>('languages')
        .select(`*`)
}
