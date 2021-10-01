import { useSelector } from "react-redux";
import { RootState } from "../rootReducer";
import { Contact } from "./model";

export const selectContacts = (): Contact[] => useSelector((state: RootState) => state.contact.contacts);

export const selectCurrentContact = (): Contact | undefined => useSelector((state: RootState) => state.contact.currentContact);