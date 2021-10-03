import { useSelector } from "react-redux";
import { RootState } from "../rootReducer";
import { Contact } from "./model";

export const selectContacts = (): Contact[] =>
    useSelector((state: RootState) => state.contact.contacts);

export const selectFileterdContacts = (): Contact[] | undefined =>
    useSelector((state: RootState) => state.contact.filteredContacts);

export const selectCurrentContact = (): Contact | undefined =>
    useSelector((state: RootState) => state.contact.currentContact);

export const selectLoadingContacts = (): boolean =>
    useSelector((state: RootState) => state.contact.loading);

export const selectSearchCriteria = (): string | undefined =>
    useSelector((state: RootState) => state.contact.searchCriteria);
