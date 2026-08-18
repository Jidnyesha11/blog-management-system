/* eslint-disable react-refresh/only-export-components */

import {
    createContext,
    useContext,
    useState
} from "react";

import {
    loginUser,
    registerUser
} from "../services/authService";

const AuthContext =
    createContext(null);

export const AuthProvider = ({
    children
}) => {
    const [user, setUser] =
        useState(() => {
            const savedUser =
                localStorage.getItem(
                    "blog_user"
                );

            return savedUser
                ? JSON.parse(savedUser)
                : null;
        });

    const [token, setToken] =
        useState(() =>
            localStorage.getItem(
                "blog_token"
            )
        );

    const login = async (
        credentials
    ) => {
        const response =
            await loginUser(
                credentials
            );

        const {
            token: newToken,
            user: newUser
        } = response.data;

        localStorage.setItem(
            "blog_token",
            newToken
        );

        localStorage.setItem(
            "blog_user",
            JSON.stringify(newUser)
        );

        setToken(newToken);
        setUser(newUser);

        return response.data;
    };

    const register = async (
        userData
    ) => {
        const response =
            await registerUser(
                userData
            );

        const {
            token: newToken,
            user: newUser
        } = response.data;

        localStorage.setItem(
            "blog_token",
            newToken
        );

        localStorage.setItem(
            "blog_user",
            JSON.stringify(newUser)
        );

        setToken(newToken);
        setUser(newUser);

        return response.data;
    };

    const logout = () => {
        localStorage.removeItem(
            "blog_token"
        );

        localStorage.removeItem(
            "blog_user"
        );

        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                login,
                register,
                logout,
                isAuthenticated:
                    Boolean(token)
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () =>
    useContext(AuthContext);