import React, { useState } from "react";
import UserProfile from "./UserProfile";

const UserProfileImage = ({ user, signout, enableHandler }) => {
  const [userMenu, setUserMenu] = useState(false);

  const openUserMenu = () => {
    if (enableHandler) {
      setUserMenu(true);
    }
  };

  const closeUserMenu = () => {
    if (enableHandler) {
      setUserMenu(false);
    }
  };

  return (
    <>
      <div
        className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-[50%] bg-purple-500 text-white"
        onMouseEnter={openUserMenu}
      >
        <p className="text-lg font-semibold capitalize">
          {user?.name.charAt(0)}
        </p>
      </div>

      {userMenu && (
        <UserProfile
          user={user}
          userMenu={userMenu}
          closeUserMenu={closeUserMenu}
          signout={signout}
        />
      )}
    </>
  );
};

export default UserProfileImage;
