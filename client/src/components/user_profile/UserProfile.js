import React from "react";
import UserProfileImage from "./UserProfileImage";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSignoutMutation } from "../../api/endpoints/authEndpoints";

const UserProfile = ({ userMenu, closeUserMenu, setAuthenticated, user }) => {
  const navigate = useNavigate();
  const [signout] = useSignoutMutation();
  const signoutHandler = async () => {
    signout();
    navigate("/");
  };

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
              setAuthenticated={setAuthenticated}
            />
            <p className="text-[16px] font-semibold capitalize">{user?.name}</p>
          </div>
          <p className="cursor-pointer" onClick={signoutHandler}>
            Sign out
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
