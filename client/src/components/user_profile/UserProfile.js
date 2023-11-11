import React from "react";
import UserProfileImage from "./UserProfileImage";

const UserProfile = ({ userMenu, closeUserMenu, signout, user }) => {
  return (
    <div
      className={`${
        userMenu ? "block" : "hidden"
      } absolute right-0 top-[100%] z-10 mt-3 h-[300px] w-[200px] border border-gray-200 bg-white `}
      onMouseLeave={closeUserMenu}
    >
      <div className="flex flex-col">
        <div className="p-2">
          <div className="flex items-center gap-3 py-2">
            <UserProfileImage
              enableHandler={false}
              user={user}
              signout={signout}
            />
            <p className="text-[16px] font-semibold capitalize">{user?.name}</p>
          </div>
          <p className="cursor-pointer" onClick={signout}>
            Sign out
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
