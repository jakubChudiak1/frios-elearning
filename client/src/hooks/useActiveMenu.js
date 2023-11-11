import { useState, useEffect } from "react";

const useActiveMenu = (user, authenticated) => {
  const [activeMenu, setActiveMenu] = useState("main");
  useEffect(() => {
    if (authenticated && user) {
      switch (user?.id_role) {
        case 1:
          setActiveMenu("admin");
          break;
        case 2:
          setActiveMenu("teacher");
          break;
        default:
          setActiveMenu("student");
      }
    } else {
      setActiveMenu("main");
    }
  }, [authenticated, user]);
  return activeMenu;
};

export default useActiveMenu;
