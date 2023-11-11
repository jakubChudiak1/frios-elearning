import React from "react";
import Button from "../UI/Button";

const AdminUser = ({ user }) => {
  return (
    <tr className="">
      <td className="p-3">{user?.first_name}</td>
      <td className="p-3">{user?.surname}</td>
      <td className="p-3">{user?.email}</td>
      <td className="p-3">{user?.roles_name}</td>
      <td className="p-3">
        <Button className="bg-purple-500 px-4 py-2 text-white">Edit</Button>
      </td>
    </tr>
  );
};

export default AdminUser;
