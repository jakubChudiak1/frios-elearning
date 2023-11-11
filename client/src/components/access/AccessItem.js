import React from "react";
import Button from "../UI/Button";

const AccessItem = ({ access, acceptAccessHandler, rejectAccessHandler }) => {
  return (
    <tr>
      <td className="p-3">{access?.access_id}</td>
      <td className="p-3">{access?.name}</td>
      <td className="p-3">{access?.surname}</td>
      <td className="p-3">{access?.subjects_name}</td>
      <td className="p-3">{access?.status}</td>
      <td className="p-3">
        <Button
          className="w-full bg-green-500 py-2 text-white"
          onClick={() => {
            acceptAccessHandler(access?.access_id);
          }}
        >
          Prijať
        </Button>
      </td>
      <td className="p-3">
        <Button
          className="w-full bg-red-500 py-2 text-white"
          onClick={() => {
            rejectAccessHandler(access?.access_id);
          }}
        >
          Odmietnuť
        </Button>
      </td>
    </tr>
    ///a
  );
};

export default AccessItem;
