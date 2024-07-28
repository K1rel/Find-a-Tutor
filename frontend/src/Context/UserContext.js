import React, { createContext, useState, useEffect, useContext } from "react";
import { getCurrentUser, getUsers } from "../services/userService";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [allUsers, setAllUsers] = useState([]);

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const currentUser = await getCurrentUser();

                setUser(currentUser);
            } catch (error) {
                console.error("Error fetching current user:", error);
            }
        };
        const fetchAllUsers = async () => {
            try {
                const users = await getUsers();
                setAllUsers(users);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchCurrentUser();
        fetchAllUsers();
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, allUsers }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    return useContext(UserContext);
};
