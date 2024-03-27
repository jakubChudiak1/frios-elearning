import React, { useState } from "react";
import Input from "../UI/Input";
import SearchIcon from "@mui/icons-material/Search";
import Button from "../UI/Button";
import { useTranslation } from "react-i18next";

const UserSearchForm = ({ usersName, setUsersName }) => {
  const { t } = useTranslation();
  return (
    <form className="mt-1 flex w-full border border-black py-1 md:w-[380px]">
      <Input
        placeholder={t("usersList.searchUser")}
        className=" w-full pl-1  outline-none"
        value={usersName}
        onChange={(event) => {
          setUsersName(event.target.value);
        }}
      />
      <Button type="button">
        <SearchIcon />
      </Button>
    </form>
  );
};

export default UserSearchForm;
