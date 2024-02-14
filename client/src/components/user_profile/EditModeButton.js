import React, { useState } from "react";
import { Switch } from "@mui/material";
import { styled } from "@mui/material/styles";
import { setEditModeSlice } from "../../redux/features/editModeSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useSetEditModeMutation } from "../../api/endpoints/editModeEndpoints";

const EditModeButton = ({ user }) => {
  const [setEditMode] = useSetEditModeMutation();

  const handleEditModeChange = async (event) => {
    const editMode = event.target.checked;
    await setEditMode({ editMode: editMode });
  };

  const CustomSwitch = styled(Switch)(({ theme }) => ({
    "& .MuiSwitch-switchBase.Mui-checked": {
      color: "#a855f7",
    },
    "& .MuiSwitch-switchBase.Mui-checked+.MuiSwitch-track": {
      backgroundColor: "#a855f7",
    },
  }));
  return (
    <div className="flex w-full items-center">
      <p className=" capitalize">edit mode:</p>
      <CustomSwitch checked={user?.edit_mode} onChange={handleEditModeChange} />
    </div>
  );
};

export default EditModeButton;
