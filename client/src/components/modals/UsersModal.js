import React from "react";
import ReactDOM from "react-dom";
import AccessUsers from "../access/AccessUsers";
import PageOverlay from "../UI/PageOverlay";

const UsersModal = React.forwardRef(({ closeUsersModalHandler }, ref) => {
  const modalRoot = document.getElementById("modal");
  return ReactDOM.createPortal(
    <>
      <PageOverlay />
      <AccessUsers ref={ref} closeUsersModalHandler={closeUsersModalHandler} />
    </>,
    modalRoot,
  );
});

export default UsersModal;
