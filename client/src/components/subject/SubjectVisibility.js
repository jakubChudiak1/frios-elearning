import React from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useChangeVisibilityMutation } from "../../api/endpoints/subjectsEndpoints";
const SubjectVisibility = ({ subject }) => {
  const [changeVisibility] = useChangeVisibilityMutation();
  const changeVisibilityHandler = async (visibility) => {
    await changeVisibility({
      subjectId: subject?.subject_id,
      is_visible: visibility,
    });
  };

  return (
    <div className="text-red-200 ">
      {subject?.is_visible ? (
        <VisibilityIcon
          fontSize="medium"
          onClick={(event) => {
            event.preventDefault();
            changeVisibilityHandler(false);
          }}
        />
      ) : (
        <VisibilityOffIcon
          fontSize="medium"
          onClick={(event) => {
            event.preventDefault();
            changeVisibilityHandler(true);
          }}
        />
      )}
    </div>
  );
};

export default SubjectVisibility;
