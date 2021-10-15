import { handleCreateContact, handleLoadContacts, handleUpdateContact } from "./handlers/contact";
import { ContactActionTypes } from "../contact/actions";
import { takeLatest, all } from "redux-saga/effects";

function* contactSaga() {
    yield takeLatest(ContactActionTypes.CREATE_CONTACT, handleCreateContact);
    yield takeLatest(ContactActionTypes.LOAD_CONTACTS, handleLoadContacts);
    yield takeLatest(ContactActionTypes.ARCHIVE_CONTACT, handleUpdateContact);
}

export default function* rootSaga() {
    yield all(
        [
            contactSaga(),
        ]
    )
}