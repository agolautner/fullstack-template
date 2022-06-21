import React, { useContext, createContext, useState, useEffect} from 'react';
import http from 'axios';
import jwt_decode from 'jwt-decode';
import { toDoApi } from '../api/toDoApi';
import config from '../app.config';
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    const {get, post} = toDoApi();

    useEffect(() => {
      const tokenInStorage = localStorage.getItem('token');
      if (tokenInStorage) {
        setToken(tokenInStorage);
        setUser(jwt_decode(tokenInStorage))
      }
    }, [])
    
    const auth = (provider="google") => {
        const googleBaseUrl = config[provider].base_url;
        const searchParams = new URLSearchParams();
        searchParams.append('client_id', config[provider].client_id);
        searchParams.append('scope', 'openid');
        searchParams.append('redirect_uri', window.location.origin + '/callback/' + provider);
        searchParams.append('response_type', 'code');
        searchParams.append('prompt', 'select_account');

        const fullUrl = googleBaseUrl + '?' + searchParams.toString();
        window.location.href = fullUrl;
    };

    const login = async (code, provider) => {
        try {
            const res = await post('/user/login', { code, provider });
            setToken(res.data.sessionToken);
            localStorage.setItem('token', res.data.sessionToken);
            setUser(jwt_decode(res.data.sessionToken));
        } catch (error) {
            console.log(error);
            setToken(null);
            localStorage.removeItem('token');
        }
    }

    const logout = () => {
        setToken(null);
        localStorage.removeItem('token');
    };

    const register = async (username) => {
        try {
            const response = await post('/user/create', {username});
            console.log(response.status);
            console.log(response.data);
            if (response?.status === 200) {
                setToken(response.data.sessionToken);
            localStorage.setItem('token', response.data.sessionToken);
            setUser(jwt_decode(response.data.sessionToken));
            }
        } catch (error) {
            console.log(error);
        }
    }

    const contextValue = { token, auth, login, logout, user, register}
    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = () => {
    const context = useContext(AuthContext)
    if(!context) throw new Error('add authProvider')
    return context
}

export { AuthProvider, useAuth }