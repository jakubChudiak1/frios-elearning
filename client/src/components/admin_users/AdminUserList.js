import React from "react";
import AdminUser from "./AdminUser";

const AdminUserList = ({ usersList, text }) => {
  return (
    <div className="flex w-full flex-col overflow-x-auto">
      <h2 className="text-[20px]">{text}</h2>
      <table className="mt-3 w-full overflow-x-auto">
        <thead className="bg-gray-100 text-left capitalize">
          <tr>
            <th className="p-3">meno</th>
            <th className="p-3">priezvisko</th>
            <th className="p-3">email</th>
            <th className="p-3">rola</th>
            <th className="p-3"></th>
          </tr>
        </thead>
        <tbody className="">
          {usersList?.map((user) => (
            <AdminUser key={user?.user_id} user={user} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUserList;
