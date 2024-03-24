import { useContext } from "react";
import { AppContext } from "./main";

export function useAppContext() {
    return useContext(AppContext)
}