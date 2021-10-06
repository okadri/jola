import { useSelector } from "react-redux";
import { RootState } from "../rootReducer";

export const selectConfirmLogout = (): boolean | undefined =>
    useSelector((state: RootState) => state.shared.confirmLogout);
