import React, { useState } from "react";
import Section from "../../components/UI/Section";
import { useGetUsersListQuery } from "../../api/endpoints/usersEndpoints";
import UsersList from "../../components/users/UsersList";
import UserSearchForm from "../../components/users/UserSearchForm";
import { useTranslation } from "react-i18next";
import ArrowBack from "../../components/UI/ArrowBack";
import { useParams } from "react-router-dom";
const Users = () => {
  const { data: usersList } = useGetUsersListQuery();
  const { t } = useTranslation();
  const [usersName, setUsersName] = useState("");
  const { lang } = useParams();
  return (
    <Section>
      <ArrowBack link={`/${lang}`} showed={"hidden"} />
      <h2 className="mt-1 text-[20px] capitalize">{t("headers.users")}</h2>
      <UserSearchForm usersName={usersName} setUsersName={setUsersName} />
      <UsersList users={usersList} usersName={usersName} />
    </Section>
  );
};

export default Users;
