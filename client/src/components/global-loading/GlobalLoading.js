import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { CircularProgress } from "@mui/material";

const GlobalLoading = () => {
  const isSomeQueryPending = useSelector((state) =>
    Object.values(state.api.queries)
      .filter((query) => query.endpointName !== "getAccessStatus")
      .some((query) => query.status === "pending"),
  );

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isSomeQueryPending) {
      setIsLoading(true);
      document.body.style.overflowY = "hidden";
    } else {
      setIsLoading(false);
      document.body.style.overflowY = "auto";
    }
  }, [isSomeQueryPending]);

  return (
    <>
      {isLoading && (
        <div
          className={`pointer-events-none fixed top-0 z-10 flex h-screen w-full items-center justify-center bg-white  md:top-[10%] md:w-full  lg:w-[calc(100%-140px)] 
      `}
        >
          <CircularProgress
            color="secondary"
            className="absolute left-auto top-[50%] md:top-[40%]"
          />
        </div>
      )}
    </>
  );
};

export default GlobalLoading;
