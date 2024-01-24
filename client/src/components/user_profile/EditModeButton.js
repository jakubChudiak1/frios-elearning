import React, { useState } from "react";
import { Switch } from "@mui/material";
import { styled } from "@mui/material/styles";
import { setEditModeSlice } from "../../redux/features/editModeSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const EditModeButton = () => {
  const { editModeState } = useSelector((state) => state.editModeState);
  const dispatch = useDispatch();

  const handleEditModeChange = (event) => {
    const newEditModeState = event.target.checked;
    dispatch(setEditModeSlice(newEditModeState));
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
      <CustomSwitch checked={editModeState} onChange={handleEditModeChange} />
    </div>
  );
};

export default EditModeButton;
