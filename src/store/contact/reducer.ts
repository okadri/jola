import { ContactActionTypes } from "./actions";
import { Contact } from "./model";

export interface ContactState {
    contacts: Contact[];
    currentContact?: Contact;
    loading: boolean;
    searchCriteria?: string;
    filteredContacts?: Contact[];
}

const initialState: ContactState = {
    contacts: [],
    loading: true,
}

export const contactReducer = (state: ContactState = initialState, action: any) => {
    const { type, payload } = action;

    switch (type) {
        case ContactActionTypes.SET_CONTACTS:
            return { ...state, contacts: payload, filteredContacts: payload, loading: false };

        case ContactActionTypes.SET_CURRENT_CONTACT:
            return { ...state, currentContact: payload };

        case ContactActionTypes.SET_SEARCH_CRITERIA:
            let newState = { ...state, searchCriteria: payload };
            newState.filteredContacts = payload ?
                newState.contacts.filter(contact =>
                    JSON.stringify(contact).toLowerCase().indexOf(payload.toLowerCase()) > -1
                )
                : newState.contacts;

            return newState;

        default:
            return state;
    }
};