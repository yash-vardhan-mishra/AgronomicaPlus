import React, { createContext, useContext, useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { useLoading } from './LoadingContext';
import { getItem, removeToken, saveItem } from '../services/keychain';

interface AuthContextType {
    isLoggedIn: boolean;
    authToken: string;
    login: (authToken: string) => void;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [authToken, setAuthToken] = useState<string | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const { setLoading } = useLoading();

    // Function to check the authToken in secure storage 
    const checkAuthToken = async () => {
        try {
            setLoading(true);
            const authToken = await getItem('authTokenEmployee');
            console.log('authToken is', authToken);
            setAuthToken(authToken);
            setIsLoggedIn(!!authToken);
            setLoading(false);
        } catch (error) {
            console.log('log is', error);

        }
    };

    // login function to set the token manually
    const login = (authToken: string) => {
        setAuthToken(authToken);
        setIsLoggedIn(true);
    };

    // Function to log the user out by removing the authToken
    const logout = async () => {
        await removeToken();
        setAuthToken(null);
        setIsLoggedIn(false);
    };

    useEffect(() => {
        checkAuthToken();
    }, []);    
    
    return (
        <AuthContext.Provider value={{ isLoggedIn, authToken: authToken || '', login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
