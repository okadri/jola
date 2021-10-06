export enum SharedActionTypes {
    CONFIRM_LOGOUT = 'shared/CONFIRM_LOGOUT',
}

export const confirmLogout = (payload: boolean) => ({
    type: SharedActionTypes.CONFIRM_LOGOUT,
    payload: payload,
});
