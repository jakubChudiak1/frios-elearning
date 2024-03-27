import React from "react";
import AccessUserTableBody from "./access_table/AccessUserTableBody";

const AccessItem = ({ access, acceptAccessHandler, rejectAccessHandler }) => {
  return (
    <AccessUserTableBody
      access={access}
      acceptAccessHandler={acceptAccessHandler}
      rejectAccessHandler={rejectAccessHandler}
    />
  );
};

export default AccessItem;
