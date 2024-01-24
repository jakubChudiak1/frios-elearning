import React from "react";
import PageOverlay from "../UI/PageOverlay";
import AddSubjectForm from "../subject/AddSubjectForm";

const AddSubjectModal = React.forwardRef(
  ({ closeAddSubjectModalHandler }, ref) => {
    return (
      <>
        <PageOverlay />
        <AddSubjectForm
          ref={ref}
          closeAddSubjectModalHandler={closeAddSubjectModalHandler}
        />
      </>
    );
  },
);

export default AddSubjectModal;
