import React, { useState } from "react";
import Button from "../UI/Button";
import useOnClickOutside from "react-cool-onclickoutside";
import AddSubjectModal from "../modals/AddSubjectModal";
import { useTranslation } from "react-i18next";

const AddSubjectButton = () => {
  const [openAddSubjecModal, setOpenAddSubjectModal] = useState(false);
  const { t } = useTranslation();
  const ref = useOnClickOutside(() => {
    setOpenAddSubjectModal(false);
  });

  const openAddSubjectModalHandler = () => {
    setOpenAddSubjectModal(true);
  };

  const closeAddSubjectModalHandler = () => {
    setOpenAddSubjectModal(false);
  };

  return (
    <>
      <Button
        onClick={openAddSubjectModalHandler}
        className="absolute right-0 top-[60px] z-[10] mt-2 w-fit self-baseline bg-purple-500 p-1 capitalize text-white xs:p-2 sm:top-[50px] "
      >
        <p className="capitalize">{t("createSubject.createSubject")}</p>
      </Button>
      {openAddSubjecModal && (
        <AddSubjectModal
          ref={ref}
          closeAddSubjectModalHandler={closeAddSubjectModalHandler}
        />
      )}
    </>
  );
};

export default AddSubjectButton;
