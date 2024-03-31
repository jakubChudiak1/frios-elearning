import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import LockOutlined from "@mui/icons-material/LockOutlined";
import EmailOutlined from "@mui/icons-material/EmailOutlined";
import { useTranslation } from "react-i18next";

const MenuConfig = () => {
  const { t } = useTranslation();
  const main = [
    {
      id: 1,
      name: t("mainMenu.home"),
      icon: <HomeOutlinedIcon fontSize="medium" />,
      path: "",
    },
  ];

  const student = [
    {
      id: 1,
      name: t("studentMenu.home"),
      icon: <HomeOutlinedIcon fontSize="medium" />,
      path: "",
    },
    {
      id: 2,
      name: t("studentMenu.mySubjects"),
      icon: <MenuBookOutlinedIcon fontSize="medium" />,
      path: "my-subjects",
    },
    {
      id: 3,
      name: t("studentMenu.myRequests"),
      icon: <LockOutlined fontSize="medium" />,
      path: "my-requests",
    },
  ];

  const teacher = [
    {
      id: 1,
      name: t("teacherMenu.home"),
      icon: <HomeOutlinedIcon fontSize="medium" />,
      path: "",
    },
    {
      id: 2,
      name: t("teacherMenu.mySubjects"),
      icon: <MenuBookOutlinedIcon fontSize="medium" />,
      path: "my-subjects",
    },
    {
      id: 3,
      name: t("teacherMenu.myRequests"),
      icon: <LockOutlined fontSize="medium" />,
      path: "my-requests",
    },
    {
      id: 4,
      name: t("teacherMenu.requests"),
      icon: <EmailOutlined fontSize="medium" />,
      path: "requests",
    },
  ];

  const admin = [
    {
      id: 1,
      name: t("adminMenu.home"),
      icon: <HomeOutlinedIcon fontSize="medium" />,
      path: "",
    },
    {
      id: 2,
      name: t("adminMenu.subjects"),
      icon: <MenuBookOutlinedIcon fontSize="medium" />,
      path: "subjects",
    },
    {
      id: 3,
      name: t("adminMenu.users"),
      icon: <PeopleAltOutlinedIcon fontSize="medium" />,
      path: "users",
    },
    {
      id: 4,
      name: t("adminMenu.requests"),
      icon: <EmailOutlined fontSize="medium" />,
      path: "requests",
    },
  ];
  const menuConfig = { main, student, teacher, admin };
  return menuConfig;
};

export default MenuConfig;
