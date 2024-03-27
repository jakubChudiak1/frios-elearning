import React, { useState } from "react";
import Button from "../UI/Button";
import useOnClickOutside from "react-cool-onclickoutside";
import UsersModal from "../modals/UsersModal";
import { useTranslation } from "react-i18next";
const SubjectUserButton = () => {
  const [openUsersModal, setOpenUsersModal] = useState(false);
  const ref = useOnClickOutside(() => {
    setOpenUsersModal(false);
  });

  const openUsersModalHandler = () => {
    setOpenUsersModal(true);
  };

  const closeUsersModalHandler = () => {
    setOpenUsersModal(false);
  };
  const { t } = useTranslation();
  return (
    <>
      <div className="max-w-[150px] pt-3 text-center">
        <Button
          className="w-full bg-purple-500 px-2 py-2 text-[14px] font-medium capitalize text-white"
          onClick={openUsersModalHandler}
        >
          {t("subjectDetails.users")}
        </Button>
      </div>
      {openUsersModal && (
        <UsersModal ref={ref} closeUsersModalHandler={closeUsersModalHandler} />
      )}
    </>
  );
};

export default SubjectUserButton;
