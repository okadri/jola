import { call, put } from "redux-saga/effects";
import { setContacts } from "../../contact/actions";
import { requestLoadContacts } from "../requests/contact";

export function* handleLoadContacts() {
    try {
        const  { data: contacts, error } = yield call(requestLoadContacts);
        if (error) console.log(error);
        yield put(setContacts(contacts));
    } catch (error) {
        console.log(error);
    }
}