import React from "react";
import AccessItem from "./AccessItem";

const AccessList = ({
  accessesList,
  text,
  acceptAccessHandler,
  rejectAccessHandler,
}) => {
  return (
    <div className="flex w-full flex-col overflow-x-auto">
      <h2 className="text-[20px]">{text}</h2>
      <table className="mt-3 w-full overflow-x-auto">
        <thead className="bg-gray-100 text-left capitalize">
          <tr>
            <th className="p-3">prístup id</th>
            <th className="p-3">meno</th>
            <th className="p-3">priezvisko</th>
            <th className="p-3">predmet</th>
            <th className="p-3">status</th>
            <th className="p-3">Prijať</th>
            <th className="p-3">Odmietnuť</th>
          </tr>
        </thead>
        <tbody>
          {accessesList?.map((access) => (
            <AccessItem
              key={access?.access_id}
              access={access}
              acceptAccessHandler={acceptAccessHandler}
              rejectAccessHandler={rejectAccessHandler}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AccessList;
