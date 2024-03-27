import { useTranslation } from "react-i18next";
const UserWithAccessConfig = () => {
  const { t } = useTranslation();
  const subjectsUsersTableHeader = [
    {
      id: 1,
      name: t("subjectsUsers.usersName"),
    },
    {
      id: 2,
      name: t("subjectsUsers.createdAt"),
    },
    {
      id: 3,
      name: t("subjectsUsers.editable"),
    },
    {
      id: 4,
      name: t("subjectsUsers.remove"),
    },
  ];
  return subjectsUsersTableHeader;
};
export default UserWithAccessConfig;
