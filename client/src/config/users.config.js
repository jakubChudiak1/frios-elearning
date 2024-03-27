import { useTranslation } from "react-i18next";
const UsersConfig = () => {
  const { t } = useTranslation();
  const usersTableHeader = [
    {
      id: 1,
      name: t("usersList.name"),
    },
    { id: 2, name: t("usersList.email") },
    {
      id: 3,
      name: t("usersList.role"),
    },
    {
      id: 4,
      name: t("usersList.submit"),
    },
  ];
  return usersTableHeader;
};
export default UsersConfig;
