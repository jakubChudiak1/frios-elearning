import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import { useUpdateChaptersContentMutation } from "../../api/endpoints/chaptersEndpoints";
import { useParams } from "react-router-dom";
import Toolbar from "./Toolbar";
import { formats } from "./formats/formats";
import { modules } from "./modules/modules";
import "quill-paste-smart";
import { register } from "./register/register";
//https://medium.com/@mircea.calugaru/react-quill-editor-with-full-toolbar-options-and-custom-buttons-undo-redo-176d79f8d375
register();
const Editor = ({ data }) => {
  const [updateChaptersContent] = useUpdateChaptersContentMutation();
  const { chapter_id } = useParams();
  const [datas, setDatas] = useState(data);
  useEffect(() => {
    setDatas(data);
  }, [data]);

  const updateChaptersDataHandler = async () => {
    await updateChaptersContent({ chapterId: chapter_id, content: datas });
  };
  console.log(datas);
  return (
    <div className="relative flex h-full w-full flex-col">
      <Toolbar submitData={updateChaptersDataHandler} />
      <ReactQuill
        value={datas}
        onChange={setDatas}
        modules={modules}
        formats={formats}
        className=" h-[550px] w-full"
        preserveWhitespace
        theme="snow"
      />
    </div>
  );
};

export default Editor;
