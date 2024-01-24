import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import useOnClickOutside from "react-cool-onclickoutside";
import { useDeleteSubjectMutation } from "../../api/endpoints/subjectsEndpoints";
import UpdateSubjectModal from "../modals/UpdateSubjectModal";
import AddSubjectButton from "./AddSubjectButton";

const SubjectModification = ({ subject_id, subject }) => {
  const [openUpdateSubjectModal, setOpenUpdateSubjectModal] = useState(false);
  const [deleteSubject] = useDeleteSubjectMutation();
  const ref = useOnClickOutside(() => {
    setOpenUpdateSubjectModal(false);
  });

  const openUpdateSubjectModalHandler = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setOpenUpdateSubjectModal(true);
  };

  const closeUpdateSubjectModalHandler = (event) => {
    console.log("clicked");
    setOpenUpdateSubjectModal(false);
  };

  const deleteSubjectHandler = async (event) => {
    event.preventDefault();
    await deleteSubject(subject_id);
  };

  return (
    <>
      <div className="absolute right-0 top-0 z-[10000] p-1">
        <div className="flex flex-col gap-1">
          <DeleteIcon
            onClick={deleteSubjectHandler}
            className="cursor-pointer text-red-500"
            fontSize="medium"
          />
          <EditIcon
            className="cursor-pointer text-[#a855f7]"
            fontSize="medium"
            onClick={openUpdateSubjectModalHandler}
          />
        </div>
      </div>
      {openUpdateSubjectModal && (
        <UpdateSubjectModal
          ref={ref}
          subject_id={subject_id}
          subject={subject}
          closeUpdateSubjectModalHandler={closeUpdateSubjectModalHandler}
        />
      )}
    </>
  );
};

export default SubjectModification;
