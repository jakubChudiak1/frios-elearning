import React from "react";
import Section from "../../components/UI/Section";
import AdminUserList from "../../components/admin_users/AdminUserList";
import { useGetUsersListQuery } from "../../api/endpoints/usersEndpoints";
const Users = () => {
  const { data: usersList } = useGetUsersListQuery();

  return (
    <Section>
      <AdminUserList usersList={usersList} text={"Používatelia"} />
    </Section>
  );
};

export default Users;
