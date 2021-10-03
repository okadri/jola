import { supabase } from "../../../initSupabase"
import { Contact } from "../../contact/model"

export function requestLoadContacts () {
    return supabase
        .from<Contact>('contacts')
        .select(`
        *,
        country_of_origin (
            name,
            code
        ),
        languages (
            name,
            code
        )
        `)  
}