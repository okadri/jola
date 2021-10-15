import { supabase } from "../../../initSupabase"
import { Contact } from "../../contact/model"

export function requestLoadContacts() {
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
        .eq('is_archived', false)
}

export function requestCreateContact(contact: Contact) {
    return supabase
        .from('contacts')
        .insert([
            contact
        ]);
}

export function requestUpdateContact(contact: Contact) {
    return supabase
        .from('contacts')
        .update({
            is_archived: contact.is_archived
        })
        .eq('id', contact.id)}