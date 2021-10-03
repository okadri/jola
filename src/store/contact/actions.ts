import { Contact } from "./model";

export enum ContactActionTypes {
    LOAD_CONTACTS = 'contact/LOAD_CONTACTS',
    SET_CONTACTS = 'contact/SET_CONTACTS',
    SET_CURRENT_CONTACT = 'contact/SET_CURRENT_CONTACT',
    SET_SEARCH_CRITERIA = 'contact/SET_SEARCH_CRITERIA',
}

export const loadContacts = () => ({
    type: ContactActionTypes.LOAD_CONTACTS,
    payload: null,
});

export const setContacts = (contacts: Contact[]) => ({
    type: ContactActionTypes.SET_CONTACTS,
    payload: contacts,
});

export const setCurrentContact = (contact: Contact) => ({
    type: ContactActionTypes.SET_CURRENT_CONTACT,
    payload: contact,
});

export const setSearchCriteria = (searchCriteria: string) => ({
    type: ContactActionTypes.SET_SEARCH_CRITERIA,
    payload: searchCriteria,
});