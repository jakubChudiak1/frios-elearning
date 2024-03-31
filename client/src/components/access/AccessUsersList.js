import React from "react";
import AccessUserItem from "./AccessUserItem";

const AccessUsersList = ({ users, usersName, header, displayUsers }) => {
  const filteredArr = usersName
    ? users?.filter((user) =>
        user?.users_name.toLowerCase().includes(usersName.toLowerCase()),
      )
    : users;

  return (
    <div className=" h-[150px] w-full overflow-x-auto overflow-y-auto ">
      <div className=" w-[450px] border-collapse  overflow-x-auto overflow-y-auto md:w-full">
        <div className="sticky top-0 z-[1000] w-full bg-white text-left capitalize">
          <div className="grid grid-cols-4 font-semibold">
            {header?.map((item) => (
              <div key={item?.id}>{item?.name}</div>
            ))}
          </div>
        </div>
        <div className="w-full">
          {filteredArr?.map((user) => (
            <AccessUserItem
              key={user?.access_id || user?.user_id}
              user={user}
              displayUsers={displayUsers}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AccessUsersList;
