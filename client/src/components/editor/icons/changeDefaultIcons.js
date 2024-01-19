import { Quill } from "react-quill";
import { CodeOutlined } from "@mui/icons-material";

export const changeDefaultIcons = () => {
  const icons = Quill.import("ui/icons");
  icons["code"] = <CodeOutlined />;
};
