import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useAddMainChapterMutation } from "../../api/endpoints/chaptersEndpoints";
import { useParams } from "react-router-dom";
import Input from "../UI/Input";

const AddChapter = () => {
  const { subject_id } = useParams();
  const [chaptersName, setChaptersName] = useState("");
  const [addMainChapter] = useAddMainChapterMutation();
  const addChapterHandler = async (event) => {
    event.preventDefault();
    await addMainChapter({ subject_id: subject_id, name: chaptersName });
    setChaptersName("");
  };

  return (
    <form
      className="w-full  border-b border-[lightgray] bg-gray-50 py-4 font-semibold"
      onSubmit={addChapterHandler}
    >
      <div className="flex h-full w-full items-center gap-1 pl-[4px]">
        <button type="submit">
          <AddIcon />
        </button>
        <Input
          type="text"
          value={chaptersName}
          onChange={(event) => setChaptersName(event.target.value)}
          placeholder="pridajte kapitolu"
          className="color h-full  w-full bg-transparent text-[14px] placeholder-black outline-none"
        />
      </div>
    </form>
  );
};

export default AddChapter;
