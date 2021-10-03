import { ContactActionTypes } from "./actions";
import { Contact } from "./model";

export interface ContactState {
    contacts: Contact[];
    currentContact?: Contact;
    loading: boolean;
}

const initialState: ContactState = {
    contacts: [],
    loading: true,
}

export const contactReducer = (state: ContactState = initialState, action: any) => {
    const { type, payload } = action;

    switch (type) {
        case ContactActionTypes.SET_CONTACTS:
            return { ...state, contacts: payload, loading: false };

        case ContactActionTypes.SET_CURRENT_CONTACT:
            return { ...state, currentContact: payload };

        default:
            return state;
    }
};