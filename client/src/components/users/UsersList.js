import React from "react";
import UserItem from "./UserItem";
import UsersConfig from "../../config/users.config";

const UsersList = ({ users, usersName }) => {
  const filteredArr = usersName
    ? users?.filter((user) =>
        user?.users_name.toLowerCase().includes(usersName.toLowerCase()),
      )
    : users;

  return (
    <div className="mt-1 flex flex-col overflow-x-auto">
      <div className="mt-1 w-[767px] overflow-x-auto overflow-y-auto md:w-full ">
        <div className="grid w-full grid-cols-4 bg-gray-100 px-2 py-2 font-semibold capitalize">
          {UsersConfig()?.map((item) => (
            <div key={item?.id}>{item.name}</div>
          ))}
        </div>
        <div className="w-full">
          {filteredArr?.map((user) => (
            <UserItem key={user?.user_id} user={user} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UsersList;
