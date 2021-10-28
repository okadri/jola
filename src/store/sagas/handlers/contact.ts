import { call, put } from "redux-saga/effects";
import {
    addContact,
    setArchiveContact,
    setContacts,
    setUpdatedContact
} from "../../contact/actions";
import {
    requestCreateContact,
    requestLoadContacts,
    requestArchiveContact,
    requestUpdateContact
} from "../requests/contact";

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

export function* handleArchiveContact({payload} : ReturnType<typeof setArchiveContact>) {
    try {
        const { error } = yield call(requestArchiveContact, payload);
        if (error) console.log(error);
        yield put(setArchiveContact(payload));
    } catch (error) {
        console.log(error);
    }
}

export function* handleUpdateContact({payload} : ReturnType<typeof setUpdatedContact>) {
    try {
        const { data: updatedContact, error } = yield call(requestUpdateContact, payload);
        if (error) console.log('handleUpdateContact', error);
        yield put(setUpdatedContact(payload));
    } catch (error) {
        console.log(error);
    }
}