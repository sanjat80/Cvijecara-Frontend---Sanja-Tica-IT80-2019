import { PropsWithChildren, createContext, useContext, useState } from "react";
import { Korpa } from "../models/korpa";

interface StoreContextValue{
    basket: Korpa | null;

}

export const StoreContext = createContext<StoreContextValue | undefined>(undefined);

export function useStoreContext(){
    const context = useContext(StoreContext);

    if(context === undefined){
        throw Error('oops - we do not seem to be inside the provider');
    }
    return context;
}

export function StoreProvider({children}:PropsWithChildren<any>){
    const[basket] = useState<Korpa | null>(null);


return (
    <StoreContext.Provider value={{basket}}>
        {children}
    </StoreContext.Provider>
    )
}