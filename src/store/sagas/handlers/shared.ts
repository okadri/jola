import { call, put } from "redux-saga/effects";
import { setValues } from "../../shared/actions";
import { requestLoadCountries, requestLoadLanguages } from "../requests/shared";

export function* handleLoadValues() {
    try {
        const { data: countries, countriesError } = yield call(requestLoadCountries);
        const { data: languages, languagesError } = yield call(requestLoadLanguages);
        if (countriesError) console.log(countriesError);
        if (languagesError) console.log(languagesError);
        yield put(setValues(countries, languages));
    } catch (error) {
        console.log(error);
    }
}

