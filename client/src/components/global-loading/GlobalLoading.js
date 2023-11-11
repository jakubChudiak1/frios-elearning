import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { CircularProgress } from "@mui/material";

const GlobalLoading = () => {
  const { globalLoading } = useSelector((state) => state.globalLoading);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (globalLoading) {
      setIsLoading(true);
      document.body.style.overflow = "hidden";
    } else {
      setIsLoading(false);
      document.body.style.overflow = "auto";
    }
  }, [globalLoading]);

  return (
    <div
      className={`fixed top-[10%] flex h-screen w-full items-center justify-center sm:w-[calc(100%-160px)] ${
        isLoading ? "block" : "hidden"
      } pointer-events-none  z-10 bg-white`}
    >
      <CircularProgress color="secondary" className="absolute top-[40%]" />
    </div>
  );
};

export default GlobalLoading;
