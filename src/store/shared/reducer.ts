import { SharedActionTypes } from "./actions";

export interface SharedState {
    confirmLogout?: boolean;
}

const initialState: SharedState = {
}

export const sharedReducer = (state: SharedState = initialState, action: any) => {
    const { type, payload } = action;
    let newState = { ...state };

    switch (type) {
        case SharedActionTypes.CONFIRM_LOGOUT:
            newState.confirmLogout = payload;
            break;
    };
    return newState;
};