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
    requestUpdateContact,
    requestClearContactLanguages,
    requestSetContactLanguages
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
        const { errorUpdate } = yield call(requestUpdateContact, payload);
        const { errorClear } = yield call(requestClearContactLanguages, payload);
        const { errorSetLangs } = yield call(requestSetContactLanguages, payload);
        if (errorUpdate) console.log('handleUpdateContact_update', errorUpdate);
        if (errorClear) console.log('handleUpdateContact_clear', errorClear);
        if (errorSetLangs) console.log('handleUpdateContact_setLangs', errorSetLangs);
        yield put(setUpdatedContact(payload));
    } catch (error) {
        console.log(error);
    }
}