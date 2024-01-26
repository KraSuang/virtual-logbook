// AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

interface AuthContextProps {
    authenticated: boolean;
    login: () => void;
    logout: () => void;
}

interface AuthProviderProps {
    children: React.ReactNode;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [authenticated, setAuthenticated] = useState<boolean>(false);

    const verifyAccessToken = async () => {
        const accessToken = localStorage.getItem('accessToken');

        if (!accessToken) {
            setAuthenticated(false);
            if (!['/login', '/register'].includes(window.location.pathname)) {
                window.location.href = '/login';
            }
            return;
        }

        try {
            const response = await axios.get('http://api.localhost:10154/v1/access/protection', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
            });

            const accessResult = response.data;

            if (accessResult.status === 401 || accessResult.status === 403) {
                setAuthenticated(false);
                if (!['/login', '/register'].includes(window.location.pathname)) {
                    window.location.href = '/login';
                }
            } else {
                setAuthenticated(true);
            }
        } catch (error) {
            setAuthenticated(false);
            if (!['/login', '/register'].includes(window.location.pathname)) {
                window.location.href = '/login';
            }
        }
    };

    useEffect(() => {
        verifyAccessToken();
    }, []);

    const value: AuthContextProps = {
        authenticated,
        login: () => setAuthenticated(true),
        logout: () => setAuthenticated(false),
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextProps => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
