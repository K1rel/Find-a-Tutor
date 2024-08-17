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
    logoutUser,
    loginUser,
    registerUser,
} from "../services/userService";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);
    const [allUsers, setAllUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchUserData = async (id) => {
        setLoading(true);
        try {
            const userData = await findUser(id);
            setProfile(userData);
        } catch (error) {
            console.error("Error fetching user:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchCurrentUser = async () => {
            setLoading(true);
            try {
                const currentUser = await getCurrentUser();

                setUser(currentUser);
            } catch (error) {
                console.error("Error fetching current user:", error);
            } finally {
                setLoading(false);
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

    const loggedUserProfile = async () => {
        try {
            setProfile(user);
            console.log(profile);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const updateUser = async (profileData) => {
        try {
            await updateUserProfile(profileData);

            const currentUser = await getCurrentUser();
            setUser(currentUser);
            setProfile(currentUser);
        } catch (error) {
            console.error("Update user error:", error);
            if (error.response && error.response.status === 422) {
                console.error("Validation errors:", error.response.data.errors);
            }
            throw error;
        }
    };
    const login = async (loginData) => {
        try {
            const { user, token } = await loginUser(loginData);
            localStorage.setItem("token", token);
            setUser(user);
        } catch (error) {
            console.error("Login error:", error);
            throw error;
        }
    };
    const logout = async () => {
        try {
            await logoutUser();
            setUser(null);
            setProfile(null);
        } catch (error) {
            console.error(
                "Logout error:",
                error.response?.data || error.message
            );
        }
    };

    const register = async (formData) => {
        try {
            const response = await registerUser(formData);
            await login({ email: formData.email, password: formData.password });
            return response;
        } catch (error) {
            console.error("Registration error:", error);
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
                logout,
                login,
                loggedUserProfile,
                register,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    return useContext(UserContext);
};
