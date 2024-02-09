import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import { useParams } from "react-router-dom";
import Toolbar from "./Toolbar";
import { formats } from "./formats/formats";
import { modules } from "./modules/modules";
import "quill-paste-smart";
import { register } from "./register/register";
//https://medium.com/@mircea.calugaru/react-quill-editor-with-full-toolbar-options-and-custom-buttons-undo-redo-176d79f8d375
register();
const Editor = ({ data, dataHandler, height, onChange }) => {
  const [datas, setDatas] = useState(data);
  useEffect(() => {
    setDatas(data);
  }, [data]);
  const submitDataHandler = async () => {
    await dataHandler(datas);
  };

  return (
    <div className="relative flex h-full w-full flex-col">
      <Toolbar submitData={submitDataHandler} />
      <ReactQuill
        value={datas}
        onChange={onChange ? onChange : setDatas}
        modules={modules}
        formats={formats}
        className={`${height ? `${height}` : "h-[550px]"} w-full`}
        preserveWhitespace
        theme="snow"
      />
    </div>
  );
};

export default Editor;
