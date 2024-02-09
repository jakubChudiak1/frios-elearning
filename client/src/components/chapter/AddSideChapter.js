import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useParams } from "react-router-dom";
import Input from "../UI/Input";
import { useAddSideChapterMutation } from "../../api/endpoints/chaptersEndpoints";

const AddSideChapter = ({ mainChapter }) => {
  const { subject_id } = useParams();
  const [chaptersName, setChaptersName] = useState("");
  const [addSideChapter] = useAddSideChapterMutation();
  const addSideChapterHandler = async (event) => {
    event.preventDefault();
    await addSideChapter({
      subject_id: subject_id,
      name: chaptersName,
      main_chapter: mainChapter,
    });
    setChaptersName("");
  };

  return (
    <form
      className="w-full  border-b border-[lightgray] bg-white py-4 font-semibold"
      onSubmit={addSideChapterHandler}
    >
      <div className="flex h-full w-full items-center gap-1 pl-[6px]">
        <AddIcon fontSize="small" />
        <Input
          type="text"
          value={chaptersName}
          onChange={(event) => setChaptersName(event.target.value)}
          placeholder={"pridajte kapitolu"}
          className="color h-full  w-full bg-transparent text-[12px] placeholder-black outline-none"
        />
      </div>
    </form>
  );
};

export default AddSideChapter;
