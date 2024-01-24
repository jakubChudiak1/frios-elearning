import React from "react";
import ReactDOM from "react-dom";
import PageOverlay from "../UI/PageOverlay";
import UpdateSubjectForm from "../subject/UpdateSubjectForm";

const UpdateSubjectModal = React.forwardRef(
  ({ subject_id, subject, closeUpdateSubjectModalHandler }, ref) => {
    const modalRoot = document.getElementById("update-subject-modal");
    console.log("subject_id modal", subject_id);
    return ReactDOM.createPortal(
      <>
        <PageOverlay />
        <UpdateSubjectForm
          subject_id={subject_id}
          subject={subject}
          closeUpdateSubjectModalHandler={closeUpdateSubjectModalHandler}
          ref={ref}
        />
      </>,
      modalRoot,
    );
  },
);

export default UpdateSubjectModal;
