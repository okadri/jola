import { call, put } from "redux-saga/effects";
import { addContact, setContacts } from "../../contact/actions";
import { Contact } from "../../contact/model";
import { requestCreateContact, requestLoadContacts } from "../requests/contact";

export function* handleLoadContacts() {
    try {
        const { data: contacts, error } = yield call(requestLoadContacts);
        if (error) console.log(error);
        yield put(setContacts(contacts));
    } catch (error) {
        console.log(error);
    }
}

export function* handleCreateContact({payload} : ReturnType<typeof addContact>) {
    try {
        const { data: savedContact, error } = yield call(requestCreateContact, payload);
        if (error) console.log(error);
        yield put(addContact(savedContact));
    } catch (error) {
        console.log(error);
    }
}