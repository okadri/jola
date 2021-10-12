import { ContactActionTypes, SortByOptions } from "./actions";
import { Contact } from "./model";

export interface ContactState {
    contacts: Contact[];
    currentContact?: Contact;
    loading: boolean;
    searchCriteria: string;
    displayContacts: Contact[];
    showOptions: boolean;
    sortBy: SortByOptions;
}

const initialState: ContactState = {
    contacts: [],
    displayContacts: [],
    loading: true,
    showOptions: false,
    sortBy: SortByOptions.SMART,
    searchCriteria: "",
}

const sortAndFilterBy = (contacts: Contact[], sortOption: SortByOptions, filter: string) => {
    let newContacts = [];
    switch (sortOption) {
        case SortByOptions.SMART:
        case SortByOptions.NAME:
            newContacts = contacts.sort((a: Contact, b: Contact) =>
                a.name.toLowerCase() > b.name.toLowerCase() ? 1 : a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 0
            );
            break;
        case SortByOptions.LAST_VISIT:
        case SortByOptions.DISTANCE:
            newContacts = contacts.sort((a: Contact, b: Contact) =>
                a.street.toLowerCase() > b.street.toLowerCase() ? 1 : a.street.toLowerCase() < b.street.toLowerCase() ? -1 : 0
            );
            break;
        default:
            newContacts = contacts;
    };
    return newContacts.filter(contact =>
        JSON.stringify(contact).toLowerCase().indexOf(filter.toLowerCase()) > -1
    );
};

export const contactReducer = (state: ContactState = initialState, action: any) => {
    const { type, payload } = action;
    let newState = { ...state };

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

        case ContactActionTypes.ADD_CONTACT:
            newState.contacts.push(payload);
            newState.displayContacts = sortAndFilterBy(state.contacts, state.sortBy, state.searchCriteria);
            break;
    };
    return newState;
};