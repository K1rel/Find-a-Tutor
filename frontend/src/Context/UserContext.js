import React, {
    createContext,
    useState,
    useEffect,
    useContext,
    useCallback,
} from "react";
import {
    getCurrentUser,
    getUsers,
    findUser,
    updateUserProfile,
} from "../services/userService";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);
    const [allUsers, setAllUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchUserData = useCallback(async (id) => {
        setLoading(true);
        try {
            const userData = await findUser(id);
            setProfile(userData);
        } catch (error) {
            console.error("Error fetching user:", error);
        } finally {
            setLoading(false);
        }
    }, []);

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

    const updateUser = async (id, profileData) => {
        try {
            const updatedUser = await updateUserProfile(id, profileData);
            setUser(updatedUser);
            setProfile(updatedUser);
        } catch (error) {
            throw error;
        }
    };

    return (
        <UserContext.Provider
            value={{
                user,
                setUser,
                allUsers,
                profile,
                updateUser,
                loading,
                setLoading,
                fetchUserData,
                setProfile,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    return useContext(UserContext);
};
