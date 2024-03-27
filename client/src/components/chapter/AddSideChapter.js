import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useParams } from "react-router-dom";
import Input from "../UI/Input";
import { useAddSideChapterMutation } from "../../api/endpoints/chaptersEndpoints";
import { useTranslation } from "react-i18next";
const AddSideChapter = ({ mainChapter }) => {
  const { subject_id } = useParams();
  const [chaptersName, setChaptersName] = useState("");
  const [addSideChapter] = useAddSideChapterMutation();
  const { t } = useTranslation();
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
      <div className="flex h-full w-full items-center  pl-[14px]">
        <AddIcon fontSize="small" />
        <Input
          type="text"
          value={chaptersName}
          onChange={(event) => setChaptersName(event.target.value)}
          placeholder={t("chapters.createChapter")}
          className="color h-full  w-full bg-transparent text-[12px] placeholder-black outline-none"
        />
      </div>
    </form>
  );
};

export default AddSideChapter;
