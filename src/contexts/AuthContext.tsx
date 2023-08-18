import { UserDTO } from "@dtos/UserDTO";
import { ReactNode, createContext } from "react";

export type AuthContextDataProps = {
    user: UserDTO;
}

type AuthContextProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
    return (

        <AuthContext.Provider value={{
            user: {

                id: '2',
                name: 'Gustavo Caixeta',
                email: 'gustavo@email.com',
                avatar: 'ghccaixeta.png',
            }
        }}>
            {children}
        </AuthContext.Provider>
    )
}