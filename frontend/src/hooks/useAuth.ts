import React from "react";
// const { user, login, logout } = useAuth();

const useAuth = () => {
  const [user, setUser] = React.useState('');

  const login = async (user: React.SetStateAction<string>) => {
    setUser(user);
  };

  const logout = async () => {
    setUser('');
  };

  return { user, login, logout };
}

export default useAuth;