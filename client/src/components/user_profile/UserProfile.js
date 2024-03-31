import React from "react";
import UserProfileImage from "./UserProfileImage";
import { useNavigate } from "react-router-dom";
import { useSignoutMutation } from "../../api/endpoints/authEndpoints";
import EditModeButton from "./EditModeButton";
import { useDispatch } from "react-redux";
import { setEditModeSlice } from "../../redux/features/editModeSlice";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const UserProfile = React.forwardRef(({ user, userMenu, setUserMenu }, ref) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [signout] = useSignoutMutation();
  const { lang } = useParams();
  const signoutHandler = async () => {
    signout();
    setUserMenu(false);
    dispatch(setEditModeSlice(false));
    navigate(`/${lang}`);
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
          {(user?.role_id === 1 || user?.role_id === 2) && (
            <EditModeButton user={user} />
          )}
          <p className="cursor-pointer" onClick={signoutHandler}>
            {t("userProfile.signout")}
          </p>
        </div>
      </div>
    </div>
  );
});

export default UserProfile;
