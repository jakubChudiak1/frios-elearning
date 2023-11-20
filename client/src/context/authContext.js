import React, { useEffect, useState, createContext, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useFetchData from "../hooks/useFetchData";
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
  const authenticated = isSuccess;
  return (
    <AuthContext.Provider
      value={{ user, authenticated: authenticated, loading: isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
