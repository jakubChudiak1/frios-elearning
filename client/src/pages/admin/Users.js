import React, { useState } from "react";
import Section from "../../components/UI/Section";
import { useGetUsersListQuery } from "../../api/endpoints/usersEndpoints";
import UsersList from "../../components/users/UsersList";
import UserSearchForm from "../../components/users/UserSearchForm";
import { useTranslation } from "react-i18next";

const Users = () => {
  const { data: usersList } = useGetUsersListQuery();
  const { t } = useTranslation();
  const [usersName, setUsersName] = useState("");
  return (
    <Section>
      <h2 className="text-[20px] capitalize">{t("headers.users")}</h2>
      <UserSearchForm usersName={usersName} setUsersName={setUsersName} />
      <UsersList users={usersList} usersName={usersName} />
    </Section>
  );
};

export default Users;
