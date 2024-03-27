import React from "react";
import AccessUserTableBody from "./access_table/AccessUserTableBody";
import UsersWithoutAccessTableBody from "./access_table/UsersWithoutAccessTableBody";

const AccessUserItem = ({ user, displayUsers }) => {
  return (
    <>
      {displayUsers ? (
        <AccessUserTableBody user={user} />
      ) : (
        <UsersWithoutAccessTableBody user={user} />
      )}
    </>
  );
};

export default AccessUserItem;
