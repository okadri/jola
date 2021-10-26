import { SharedActionTypes } from "./actions";
import { Country, Language } from "./model";

export interface SharedState {
    confirmLogout: boolean;
    countries: Country[],
    languages: Language[],
}

const initialState: SharedState = {
    confirmLogout: false,
    countries: [],
    languages: [],
}

export const sharedReducer = (state: SharedState = initialState, action: any) => {
    const { type, payload } = action;
    let newState = { ...state };

    switch (type) {
        case SharedActionTypes.SET_VALUES:
            newState.countries = payload.countries;
            newState.languages = payload.languages;
            break;
        case SharedActionTypes.CONFIRM_LOGOUT:
            newState.confirmLogout = payload;
            break;
    };
    return newState;
};