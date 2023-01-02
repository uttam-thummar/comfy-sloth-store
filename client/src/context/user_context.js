import { useAuth0 } from "@auth0/auth0-react";
import { createContext, useEffect, useState, useContext } from "react";

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
    const { loginWithRedirect, logout, user, isLoading, error } = useAuth0();
    const [myUser, setMyUser] = useState(null);

    useEffect(() => {
        setMyUser(user);
    }, [user]);

    return (
        <UserContext.Provider value={{
            loginWithRedirect,
            logout,
            myUser,
            isLoading,
            error
        }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUserContext = () => {
    return useContext(UserContext);
}