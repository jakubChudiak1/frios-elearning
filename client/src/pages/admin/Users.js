import React from "react";
import Section from "../../components/UI/Section";
import apiConfig from "../../config/api.config";
import useFetchData from "../../hooks/useFetchData";
import AdminUserList from "../../components/admin_users/AdminUserList";

const Users = () => {
  const usersList = useFetchData(apiConfig.userRoutes.getUserList);
  console.log(usersList.data);
  return (
    <Section>
      <AdminUserList usersList={usersList.data} text={"Používatelia"} />
    </Section>
  );
};

export default Users;
