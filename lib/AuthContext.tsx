import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { Children, createContext, useContext, useEffect, useState } from 'react';
import { isNumericLiteral } from 'typescript';

interface AuthProps {
    authState?: {token: string | null; authenticated: boolean | null};
    onRegister?: (email: string, password: string, username: string) => Promise<any>;
    onLogin?: (email: string, password: string) => Promise<any>;
    onLogout?: () => Promise<any>;
}

const TOKEN_KEY = 'jwt-aora';
export const API_URL = 'https://x8ki-letl-twmt.n7.xano.io/api:-_Vqip5t';
const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({children}:any) => {
    const [authState, setAuthState] = useState<{
        token: string | null;
        authenticated: boolean | null;
    }>({
        token: null,
        authenticated: null
    });
    // onload
    useEffect(() => {
        const loadToken = async() => {
            const token = await SecureStore.getItemAsync(TOKEN_KEY);
            console.log('stored: ', token);

            if (token) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                setAuthState({
                    token: token,
                    authenticated: true
                });
            }
        };
        loadToken();
    });

    const register = async(email: string, password: string, username: string) => {
        try { 
            const data = {
                email, password, username
            };
            return await axios.post(API_URL + "/auth/signup", data, {
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
              });
 
        } catch (error) {
            console.log(error);
           // throw new Error(error);
            return error;
        }
    }

    const login = async(email: string, password: string) => {
        try { 
            const data = {
                email, password
            };
            const result = await axios.post(API_URL + "/auth/login", data, {
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
              });
 
              console.log(result.data);

            setAuthState({
                token: result.data,
                authenticated: true
            });

             axios.defaults.headers.common['Authorization'] = `Bearer ${result.data}`;

             await SecureStore.setItemAsync(TOKEN_KEY, result.data);

             return result;
 
        } catch (error) {
            console.log(error);
           // throw new Error(error);
            return error;
        }
    };

    const logout = async() => {
        await SecureStore.deleteItemAsync(TOKEN_KEY);

        axios.defaults.headers.common['Authorization'] = '';

        setAuthState({
            token: null,
            authenticated: false
        });
    };

    const value = {
        onRegister: register,
        onLogin: login,
        onLogout: logout,
        authState
    };

    return   <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
