import React, { useState, useEffect, createContext, useContext } from "react";
import axios from "axios";
import apiConfig from "../config/api.config";
import useFetchData from "../hooks/useFetchData";

const AccessContext = createContext();

export const AccessContextProvider = ({ children }) => {
  const [access, setAccess] = useState({});
  const [areLoading, setLoading] = useState(true);
  const [subjectId, setSubjectId] = useState(null);

  useEffect(() => {
    const checkAccess = async (subject_id) => {
      try {
        const response = await axios.get(
          apiConfig.accessRoutes.getAccessStatus(subject_id),
        );
        setAccess(response.data);
        setLoading(true);
      } catch (error) {
        setAccess(null);
      } finally {
        setLoading(false);
      }
    };

    checkAccess(subjectId);
  }, [subjectId]);

  return (
    <AccessContext.Provider
      value={{ access, setSubjectId, subjectId, areLoading }}
    >
      {children}
    </AccessContext.Provider>
  );
};

export const useAccess = () => {
  return useContext(AccessContext);
};
