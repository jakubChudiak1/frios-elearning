import React from "react";
import UserProfileImage from "./UserProfileImage";
import { useNavigate } from "react-router-dom";
import { useSignoutMutation } from "../../api/endpoints/authEndpoints";
import EditModeButton from "./EditModeButton";

const UserProfile = React.forwardRef(({ user, userMenu, setUserMenu }, ref) => {
  const navigate = useNavigate();
  const [signout] = useSignoutMutation();
  const signoutHandler = async () => {
    signout();
    setUserMenu(false);
    navigate("/");
  };
  return (
    <div
      className={`${
        userMenu ? "block" : "hidden"
      } absolute right-0 top-[100%] z-[10000] mt-3 h-[300px] w-[200px] border border-gray-200 bg-white `}
      ref={ref}
    >
      <div className="flex flex-col">
        <div className="p-2">
          <div className="flex items-center gap-2 border-b border-gray-100 py-2">
            <UserProfileImage user={user} handleMenuClick={false} />
            <div className="flex flex-col ">
              <p className="text-[14px] font-semibold capitalize ">
                {`${user?.name}
                ${user?.surname}`}
              </p>
              <p className="text-[12px]">{user?.role_name}</p>
            </div>
          </div>
          {(user?.id_role === 1 || user?.id_role === 2) && <EditModeButton />}
          <p className="cursor-pointer" onClick={signoutHandler}>
            Sign out
          </p>
        </div>
      </div>
    </div>
  );
});

export default UserProfile;
