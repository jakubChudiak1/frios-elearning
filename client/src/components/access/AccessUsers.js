import React, { useState } from "react";
import { Close } from "@mui/icons-material";
import { useParams } from "react-router-dom";
import UserSearchForm from "../users/UserSearchForm";
import { useGetSubjectsUsersQuery } from "../../api/endpoints/accessesEndpoints";
import { useGetUsersWithoutAccessQuery } from "../../api/endpoints/accessesEndpoints";
import AccessUsersList from "./AccessUsersList";
import { CircularProgress } from "@mui/material";
import { useTranslation } from "react-i18next";
import UserAccessHeaderConfig from "../../config/usersWithoutAccess.config";
import UserWithAccessConfig from "../../config/subjectsUsers.config";
const AccessUsers = React.forwardRef(({ closeUsersModalHandler }, ref) => {
  const { t } = useTranslation();
  const [displayUsers, setDisplayUsers] = useState(true);
  const [usersName, setUsersName] = useState("");
  const { subject_id } = useParams();
  const { data: users, isLoading: usersLoading } = useGetSubjectsUsersQuery(
    subject_id,
    {
      skip: !displayUsers,
    },
  );
  const { data: usersWithoutAccess, isLoading: withoutAccess } =
    useGetUsersWithoutAccessQuery(subject_id, { skip: displayUsers });

  const displayUsersHandler = () => {
    setDisplayUsers(true);
  };

  const displayUsersWithoutAccessHandler = () => {
    setDisplayUsers(false);
  };
  const usersWithoutAccesses = UserAccessHeaderConfig();
  const subjectsUsersTableHeader = UserWithAccessConfig();
  return (
    <div
      className=" absolute left-[50%] top-[40%] z-[10000]  min-h-[320px] w-[90%] -translate-x-1/2 -translate-y-1/2 transform overflow-x-auto  rounded-[10px] bg-white p-3 xs:w-[28rem] md:w-[37rem] md:p-7  lg:left-[55%] lg:w-[48rem] xl:top-[50%]"
      ref={ref}
    >
      <div className="flex items-center justify-between">
        <h2 className="text-[20px] capitalize">{t("headers.users")}</h2>
        <Close
          fontSize="large"
          className="cursor-pointer"
          onClick={closeUsersModalHandler}
        />
      </div>
      <UserSearchForm usersName={usersName} setUsersName={setUsersName} />
      <div className="my-2 flex cursor-pointer flex-col items-baseline gap-1 capitalize xs:flex-row xs:items-center  xs:gap-3">
        <span
          onClick={displayUsersHandler}
          className={`${displayUsers ? "text-[#a855f7]" : "text-black"}`}
        >
          {t("subjectsUsers.activeUsers")}
        </span>
        <span
          onClick={displayUsersWithoutAccessHandler}
          className={`${displayUsers ? "text-black" : "text-[#a855f7]"}`}
        >
          {t("subjectsUsers.addUsers")}
        </span>
      </div>
      {usersLoading || withoutAccess ? (
        <CircularProgress
          color="secondary"
          className="absolute left-[45%] top-[60%] sm:left-[47%] md:top-[60%]"
        />
      ) : (
        <AccessUsersList
          users={displayUsers ? users : usersWithoutAccess}
          usersName={usersName}
          header={
            displayUsers ? subjectsUsersTableHeader : usersWithoutAccesses
          }
          displayUsers={displayUsers}
        />
      )}
    </div>
  );
});

export default AccessUsers;
