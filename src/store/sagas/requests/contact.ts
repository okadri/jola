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

export function requestArchiveContact(contact: Contact) {
    return supabase
        .from('contacts')
        .update({
            is_archived: true
        })
        .eq('id', contact.id)
}

export function requestUpdateContact(contact: Contact) {
    return supabase
        .from('contacts')
        .update({
            name: contact.name,
            email: contact.email,
            phone: contact.phone,
            street: contact.street,
            city: contact.city,
            state: contact.state,
            zipcode: contact.zipcode,
            country_of_origin: contact.country_of_origin?.id
        })
        .eq('id', contact.id)
}