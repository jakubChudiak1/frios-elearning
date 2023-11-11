import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import LockOutlined from "@mui/icons-material/LockOutlined";

const main = [
  {
    id: 1,
    name: "domov",
    icon: <HomeOutlinedIcon fontSize="medium" />,
    path: "/",
  },
];

const student = [
  {
    id: 1,
    name: "domov",
    icon: <HomeOutlinedIcon fontSize="medium" />,
    path: "/",
  },
  {
    id: 2,
    name: "Moje predmety",
    icon: <MenuBookOutlinedIcon fontSize="medium" />,
    path: "/my-subjects",
  },
];

const teacher = [
  {
    id: 1,
    name: "domov",
    icon: <HomeOutlinedIcon fontSize="medium" />,
    path: "/",
  },
  {
    id: 2,
    name: "moje predmety",
    icon: <MenuBookOutlinedIcon fontSize="medium" />,
    path: "/my-subjects",
  },
  {
    id: 3,
    name: "študenti",
    icon: <SchoolOutlinedIcon fontSize="medium" />,
    path: "/students",
  },
];

const admin = [
  {
    id: 1,
    name: "domov",
    icon: <HomeOutlinedIcon fontSize="medium" />,
    path: "/",
  },
  {
    id: 2,
    name: "predmety",
    icon: <MenuBookOutlinedIcon fontSize="medium" />,
    path: "/subjects",
  },
  {
    id: 3,
    name: "pouzivatelia",
    icon: <PeopleAltOutlinedIcon fontSize="medium" />,
    path: "/users",
  },
  {
    id: 4,
    name: "pristupy",
    icon: <LockOutlined fontSize="medium" />,
    path: "/accesses",
  },
];

const menuConfig = { main, student, teacher, admin };

export default menuConfig;
