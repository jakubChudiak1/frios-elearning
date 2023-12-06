import React, { createContext, useContext } from "react";
import { useGetIsValidQuery } from "../api/endpoints/authEndpoints";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const {
    data: user,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetIsValidQuery();
  return (
    <AuthContext.Provider
      value={{ user, authenticated: !!user, loading: isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
