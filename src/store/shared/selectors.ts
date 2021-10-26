import { useSelector } from "react-redux";
import { RootState } from "../rootReducer";
import { Country, Language } from "./model";

export const selectConfirmLogout = (): boolean | undefined =>
    useSelector((state: RootState) => state.shared.confirmLogout);

export const selectCountries = (): Country[] =>
    useSelector((state: RootState) => state.shared.countries);

export const selectLanguages = (): Language[] =>
    useSelector((state: RootState) => state.shared.languages);
