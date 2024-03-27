import React from "react";
import { useGetRolesQuery } from "../../api/endpoints/rolesEndpoints";

const RolesSelect = ({ onBlur, onChange, defaultValue }) => {
  const { data: roles, isLoading } = useGetRolesQuery();
  if (isLoading) {
    return null;
  }
  return (
    <select
      name="role_id"
      onBlur={onBlur}
      onChange={onChange}
      className="border border-black px-1 py-2 capitalize outline-none "
      defaultValue={defaultValue}
    >
      {roles?.map((role) => (
        <option key={role?.role_id} value={role?.role_id}>
          {role?.name}
        </option>
      ))}
    </select>
  );
};

export default RolesSelect;
