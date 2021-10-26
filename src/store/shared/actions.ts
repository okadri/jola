import { Country, Language } from "./model";

export enum SharedActionTypes {
    LOAD_VALUES = 'shared/LOAD_VALUES',
    SET_VALUES = 'shared/SET_VALUES',
    CONFIRM_LOGOUT = 'shared/CONFIRM_LOGOUT',
}

export const loadValues = () => ({
    type: SharedActionTypes.LOAD_VALUES,
});

export const setValues = (countries: Country[], languages: Language[]) => ({
    type: SharedActionTypes.SET_VALUES,
    payload: {
        countries,
        languages,
    }
});

export const confirmLogout = (payload: boolean) => ({
    type: SharedActionTypes.CONFIRM_LOGOUT,
    payload: payload,
});
