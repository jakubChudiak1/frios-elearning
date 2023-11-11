import { useState, useEffect } from "react";
import axios from "axios";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { setGlobalLoading } from "../redux/features/globalLoadingSlice";

const useFetchData = (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const fetchData = useCallback(async () => {
    try {
      dispatch(setGlobalLoading(true));
      setIsLoading(true);
      const response = await axios.get(url);
      setData(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
      dispatch(setGlobalLoading(false));
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, error, refetch: fetchData, isLoading };
};

export default useFetchData;
