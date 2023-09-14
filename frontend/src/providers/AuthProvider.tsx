import React, { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextProps {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: any;
  token?: string;
  setUser?: React.Dispatch<React.SetStateAction<string>>;
  setIsAuthenticated?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLoading?: React.Dispatch<React.SetStateAction<boolean>>;
  setToken?: React.Dispatch<React.SetStateAction<string>>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  isLoading: true,
  user: null,
  token: '',
  setUser: () => {},
  setIsAuthenticated: () => {},
  setIsLoading: () => {},
  setToken: () => {},
  logout: () => {},
});

export const AuthProvider = (
  { 
    children 
  } : {
    children: React.ReactNode;
  }
) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState('');

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        user,
        token,
        setIsAuthenticated,
        setIsLoading,
        setUser,
        setToken,
        logout: () => {
          setIsAuthenticated(false);
          setUser('');
          setToken('');
        }
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);