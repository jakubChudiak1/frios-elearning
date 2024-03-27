import { useState, useEffect } from "react";

const useActiveMenu = (user, authenticated, loading) => {
  const [activeMenu, setActiveMenu] = useState(null);
  useEffect(() => {
    if (authenticated && user) {
      switch (user?.role_id) {
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
  }, [authenticated, user, loading]);
  return activeMenu;
};

export default useActiveMenu;
