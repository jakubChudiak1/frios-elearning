import { useState, useEffect } from "react";
import axios from "axios";
import { useCallback } from "react";
import { useDispatch } from "react-redux";

const useFetchData = (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(url);
      setData(response.data);
    } catch (err) {
      setError(err);
    } finally {
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, error, refetch: fetchData };
};

export default useFetchData;
