import React, { createContext, useContext, useEffect } from "react";
import { useGetIsValidQuery } from "../api/endpoints/authEndpoints";
import { setEditModeSlice } from "../redux/features/editModeSlice";
import { useDispatch } from "react-redux";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const dispatch = useDispatch();
  const {
    data: user,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetIsValidQuery();

  useEffect(() => {
    dispatch(setEditModeSlice(user?.edit_mode));
  }, [user?.edit_mode]);

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
