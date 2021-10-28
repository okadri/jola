import {
    handleCreateContact,
    handleLoadContacts,
    handleArchiveContact,
    handleUpdateContact
} from "./handlers/contact";
import { ContactActionTypes } from "../contact/actions";
import { takeLatest, all } from "redux-saga/effects";
import { SharedActionTypes } from "../shared/actions";
import { handleLoadValues } from "./handlers/shared";

function* sharedSaga() {
    yield takeLatest(SharedActionTypes.LOAD_VALUES, handleLoadValues);
}

function* contactSaga() {
    yield takeLatest(ContactActionTypes.CREATE_CONTACT, handleCreateContact);
    yield takeLatest(ContactActionTypes.LOAD_CONTACTS, handleLoadContacts);
    yield takeLatest(ContactActionTypes.ARCHIVE_CONTACT, handleArchiveContact);
    yield takeLatest(ContactActionTypes.UPDATE_CONTACT, handleUpdateContact);
}

export default function* rootSaga() {
    yield all(
        [
            sharedSaga(),
            contactSaga(),
        ]
    )
}