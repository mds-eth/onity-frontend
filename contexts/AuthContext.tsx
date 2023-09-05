import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

import ApiService from "../services/api.service";
import { destroyCookie, setCookie } from 'nookies';
import { AxiosResponse } from 'axios';
import { useRouter } from 'next/router';
import { encryptionData } from '../utils/Utils';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
  nameUser: string;
  token: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface IAuthProps {
  isAuth: boolean;
  tokenSession: string;
  userName: string;
  children: ReactNode;
}

export const AuthProvider: React.FC<IAuthProps> = ({ isAuth, tokenSession, userName, children }) => {

  const router = useRouter();

  const [token, setToken] = useState<string>(tokenSession);
  const [nameUser, setNameUser] = useState<string>(userName);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(isAuth);

  const login = async (email: string, password: string) => {

    try {
      const response: AxiosResponse = await ApiService.post('/auth/login', { email, password });

      if (response.status === 200) {
        setIsAuthenticated(true);

        const MAX_AGE_COOKIE = 60 * 60 * 1;

        response.data.authenticated = true

        setNameUser(response.data.user_name);

        setToken(response.data.access_token);

        setCookie(undefined, "[@auth:user]", JSON.stringify(await encryptionData(response.data)), { maxAge: MAX_AGE_COOKIE, path: '/' });

        return true;
      }
    } catch (error) {
      return false;
    }
  };

  const logout = () => {
    destroyCookie(undefined, '[@auth:user]', { path: '/', });

    setIsAuthenticated(false);

    router.push('/auth/login');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, nameUser, token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};
