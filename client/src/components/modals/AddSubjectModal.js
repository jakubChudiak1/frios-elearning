import React from "react";
import ReactDOM from "react-dom";
import PageOverlay from "../UI/PageOverlay";
import AddSubjectForm from "../subject/AddSubjectForm";

const AddSubjectModal = React.forwardRef(
  ({ closeAddSubjectModalHandler }, ref) => {
    const modalRoot = document.getElementById("modal");
    return ReactDOM.createPortal(
      <>
        <PageOverlay />
        <AddSubjectForm
          ref={ref}
          closeAddSubjectModalHandler={closeAddSubjectModalHandler}
        />
      </>,
      modalRoot,
    );
  },
);

export default AddSubjectModal;
