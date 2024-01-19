import React, { useState } from "react";
import UserProfile from "./UserProfile";
import useOnclickOutside from "react-cool-onclickoutside";

const UserProfileImage = ({ user, handleMenuClick }) => {
  const [userMenu, setUserMenu] = useState(false);
  const ref = useOnclickOutside(
    () => {
      setUserMenu(false);
    },
    { ignoreClass: "user-profile-image" },
  );

  const userMenuHandler = () => {
    setUserMenu(!userMenu);
  };
  return (
    <>
      <div
        className=" user-profile-image flex h-10 w-10 cursor-pointer items-center justify-center rounded-[50%] bg-purple-500 text-white"
        onClick={handleMenuClick ? userMenuHandler : undefined}
      >
        <p className="text-lg font-semibold capitalize">
          {user?.name.charAt(0)}
        </p>
      </div>

      {userMenu && (
        <UserProfile
          user={user}
          ref={ref}
          userMenu={userMenu}
          setUserMenu={setUserMenu}
        />
      )}
    </>
  );
};

export default UserProfileImage;
