import { createContext, useContext } from "react";

export const AppContext =createContext()

const useExpenseTracker= ()=>{
    return useContext(AppContext)
}
export default useExpenseTracker