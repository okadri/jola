import { supabase } from "../../../initSupabase"
import { Contact } from "../../contact/model"

export function requestLoadContacts() {
    return supabase
        .from<Contact>('contacts')
        .select(`
        *,
        country_of_origin (*),
        languages (*),
        visits (*)
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
            country_of_origin: contact.country_of_origin?.id,
        })
        .eq('id', contact.id);
}

export function requestClearContactLanguages(contact: Contact) {
    return supabase
        .from('contact_languages')
        .delete()
        .match({ contact_id: contact.id });
}

export function requestSetContactLanguages(contact: Contact) {
    const contactLanguages = contact.languages?.map(l => {
        return { contact_id: contact.id, language_id: l.id };
    });
    return supabase
        .from('contact_languages')
        .insert(contactLanguages);
}