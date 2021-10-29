import { ContactActionTypes, SortByOptions } from "./actions";
import { Contact } from "./model";

export interface ContactState {
    contacts: Contact[];
    currentContact?: Contact;
    loading: boolean;
    searchCriteria: string;
    displayContacts: Contact[];
    showOptions: boolean;
    confirmArchive: boolean;
    sortBy: SortByOptions;
    smsTemplate: string;
}

const initialState: ContactState = {
    contacts: [],
    displayContacts: [],
    loading: true,
    showOptions: false,
    confirmArchive: false,
    sortBy: SortByOptions.SMART,
    searchCriteria: "",
    smsTemplate: "Salam.. Came by to visit and missed you. We hope to see you in the Masjid!"
}

const sortAndFilterBy = (contacts: Contact[], sortOption: SortByOptions, filter: string) => {
    let newContacts = contacts.filter(c => !c.is_archived);
    switch (sortOption) {
        case SortByOptions.SMART:
        case SortByOptions.NAME:
            newContacts.sort((a: Contact, b: Contact) =>
                a.name.toLowerCase() > b.name.toLowerCase() ? 1 : a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 0
            );
            break;
        case SortByOptions.LAST_VISIT:
        case SortByOptions.DISTANCE:
            newContacts.sort((a: Contact, b: Contact) =>
                a.street.toLowerCase() > b.street.toLowerCase() ? 1 : a.street.toLowerCase() < b.street.toLowerCase() ? -1 : 0
            );
            break;
    };
    return filter ? newContacts.filter(contact =>
        JSON.stringify(contact).toLowerCase().indexOf(filter.toLowerCase()) > -1
    ) : newContacts;
};

export const contactReducer = (state: ContactState = initialState, action: any) => {
    const { type, payload } = action;
    let newState = { ...state };
    let tmp;

    switch (type) {
        case ContactActionTypes.SET_CONTACTS:
            newState.contacts = newState.displayContacts = sortAndFilterBy(payload, state.sortBy, state.searchCriteria);
            newState.loading = false;
            break;

        case ContactActionTypes.SET_CURRENT_CONTACT:
            newState.currentContact = payload;
            break;

        case ContactActionTypes.SET_SHOW_OPTIONS:
            newState.showOptions = payload;
            break;

        case ContactActionTypes.SET_SORT_BY:
            newState.displayContacts = state.sortBy !== payload ?
                sortAndFilterBy(state.contacts, payload, state.searchCriteria)
                : newState.contacts;
            newState.sortBy = payload;
            break;

        case ContactActionTypes.SET_SEARCH_CRITERIA:
            newState.searchCriteria = payload;
            newState.displayContacts = payload ?
                sortAndFilterBy(state.contacts, state.sortBy, payload)
                : state.contacts;
            break;

        case ContactActionTypes.CREATE_CONTACT:
            newState.loading = true;
            break;

        case ContactActionTypes.ADD_CONTACT:
            tmp = payload[0];
            newState.currentContact = tmp;
            newState.contacts.push(tmp);
            newState.displayContacts = sortAndFilterBy(newState.contacts, state.sortBy, state.searchCriteria);
            newState.loading = false;
            break;

        case ContactActionTypes.CONFIRM_ARCHIVE:
            newState.confirmArchive = payload;
            break;

        case ContactActionTypes.SET_ARCHIVE_CONTACT:
            tmp = newState.contacts.find(c => c.id === payload.id);
            if (tmp) {
                tmp.is_archived = true;
                newState.displayContacts = sortAndFilterBy(newState.contacts, state.sortBy, state.searchCriteria);
            }
            break;

        case ContactActionTypes.SET_UPDATED_CONTACT:
            newState.currentContact = payload;
            newState.contacts = newState.contacts.filter(c => c.id !== payload.id);
            newState.contacts.push(payload);
            newState.displayContacts = sortAndFilterBy(newState.contacts, state.sortBy, state.searchCriteria);
            break;

    };

    return newState;
};