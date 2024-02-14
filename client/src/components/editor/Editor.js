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
const Editor = ({ data, dataHandler, height, onChange, isHandler }) => {
  const [content, setContent] = useState(data);
  useEffect(() => {
    setContent(data);
  }, [data]);

  const handleChange = (value) => {
    setContent(value);
    onChange && onChange(value);
  };

  const submitDataHandler = async () => {
    await dataHandler(content);
  };

  return (
    <div className="relative flex h-full w-full flex-col">
      <Toolbar submitData={submitDataHandler} isHandler={isHandler} />
      <ReactQuill
        value={content || ""}
        onChange={handleChange}
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
