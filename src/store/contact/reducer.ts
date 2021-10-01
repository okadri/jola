import { ContactActionTypes } from "./actions";
import { Contact } from "./model";

export interface ContactState {
    contacts: Contact[];
    currentContact?: Contact;
}

const initialState: ContactState = {
    contacts: [],
}

export const contactReducer = (state: ContactState = initialState, action: any) => {
    const { type, payload } = action;

    switch (type) {
        case ContactActionTypes.LOAD_CONTACTS:
            return { ...state, contacts: payload };

        case ContactActionTypes.SET_CURRENT_CONTACT:
            return { ...state, currentContact: payload };

        default:
            return state;
    }
};