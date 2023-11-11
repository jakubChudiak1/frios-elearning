import React, { useEffect, useState, createContext, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useFetchData from "../hooks/useFetchData";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = async () => {
      try {
        const response = await axios.get("/auth/isvalid", {
          withCredentials: true,
        });
        setUser(response.data);
        setAuthenticated(true);
        setLoading(true);
      } catch (e) {
        setAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
    auth();
  }, [authenticated]);
  const signout = async () => {
    try {
      const response = await axios.post("/auth/signout");
      if (response.status === 200) {
        setAuthenticated(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, authenticated, setAuthenticated, loading, signout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
