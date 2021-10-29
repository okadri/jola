import { Contact } from "./model";

export enum ContactActionTypes {
    LOAD_CONTACTS = 'contact/LOAD_CONTACTS',
    SET_CONTACTS = 'contact/SET_CONTACTS',
    SET_CURRENT_CONTACT = 'contact/SET_CURRENT_CONTACT',
    SET_SEARCH_CRITERIA = 'contact/SET_SEARCH_CRITERIA',
    SET_SHOW_OPTIONS = 'contact/SET_SHOW_OPTIONS',
    SET_SORT_BY = 'contact/SET_SORT_BY',
    ADD_CONTACT = 'contact/ADD_CONTACT',
    CREATE_CONTACT = 'contact/CREATE_CONTACT',
    ARCHIVE_CONTACT = 'contact/ARCHIVE_CONTACT',
    UPDATE_CONTACT = 'contact/UPDATE_CONTACT',
    SET_UPDATED_CONTACT = 'contact/SET_UPDATED_CONTACT',
    SET_ARCHIVE_CONTACT = 'contact/SET_ARCHIVE_CONTACT',
    CONFIRM_ARCHIVE = 'contact/CONFIRM_ARCHIVE',
}

export enum SortByOptions {
    SMART = 'Smart Sorting',
    NAME = 'Alphabetical',
    LAST_VISIT = 'Last Visit',
    DISTANCE = 'Distance',
}

export const loadContacts = () => ({
    type: ContactActionTypes.LOAD_CONTACTS,
    payload: null,
});

export const setContacts = (contacts: Contact[]) => ({
    type: ContactActionTypes.SET_CONTACTS,
    payload: contacts,
});

export const setCurrentContact = (contact?: Contact) => ({
    type: ContactActionTypes.SET_CURRENT_CONTACT,
    payload: contact,
});

export const setSearchCriteria = (searchCriteria: string) => ({
    type: ContactActionTypes.SET_SEARCH_CRITERIA,
    payload: searchCriteria,
});

export const setShowOptions = (showOptions: boolean) => ({
    type: ContactActionTypes.SET_SHOW_OPTIONS,
    payload: showOptions,
});

export const setSortBy = (sortBy: SortByOptions) => ({
    type: ContactActionTypes.SET_SORT_BY,
    payload: sortBy,
});

export const createContact = (contact: Contact) => ({
    type: ContactActionTypes.CREATE_CONTACT,
    payload: contact,
});

export const addContact = (contact: Contact) => ({
    type: ContactActionTypes.ADD_CONTACT,
    payload: contact,
});

export const archiveContact = (contact: Contact | undefined) => ({
    type: ContactActionTypes.ARCHIVE_CONTACT,
    payload: contact,
});

export const setArchiveContact = (contact: Contact) => ({
    type: ContactActionTypes.SET_ARCHIVE_CONTACT,
    payload: contact,
});

export const confirmArchive = (payload: boolean) => ({
    type: ContactActionTypes.CONFIRM_ARCHIVE,
    payload: payload,
});

export const updateContact = (contact: Contact) => ({
    type: ContactActionTypes.UPDATE_CONTACT,
    payload: contact,
});

export const setUpdatedContact = (contact: Contact) => ({
    type: ContactActionTypes.SET_UPDATED_CONTACT,
    payload: contact,
});
