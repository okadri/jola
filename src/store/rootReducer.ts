// https://youtu.be/DYBuMh553yc
import { combineReducers } from "redux";
import { contactReducer } from "./contact/reducer";

export const rootReducer = combineReducers({
    contact: contactReducer,
});

export type RootState = ReturnType<typeof rootReducer>;