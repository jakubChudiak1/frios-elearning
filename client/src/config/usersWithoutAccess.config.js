import { useTranslation } from "react-i18next";
const UserAccessHeaderConfig = () => {
  const { t } = useTranslation();

  const usersAccessTableHeader = [
    {
      id: 1,
      name: t("subjectsUsers.usersName"),
    },
    {
      id: 2,
      name: t("subjectsUsers.usersRole"),
    },
    {
      id: 3,
      name: t("subjectsUsers.editable"),
    },
    {
      id: 4,
      name: t("subjectsUsers.add"),
    },
  ];
  return usersAccessTableHeader;
};
export default UserAccessHeaderConfig;
