import React from "react";
import SaveContent from "./toolbar-items/SaveContent";
import TextColor from "./toolbar-items/TextColor";
import BackgroundColor from "./toolbar-items/BackgroundColor";
import Headers from "./toolbar-items/Headers";
import { register } from "./register/register";
import Important from "./toolbar-items/Important";
import Warning from "./toolbar-items/Warning";
import Exercise from "./toolbar-items/Exercise";
import Undo from "./toolbar-items/Undo";
import Redo from "./toolbar-items/Redo";
import { changeDefaultIcons } from "./icons/changeDefaultIcons";
import InlineCode from "./toolbar-items/InlineCode";
import FontSize from "./toolbar-items/FontSize";

changeDefaultIcons();

const Toolbar = ({ submitData }) => (
  <div id="toolbar" className="sticky top-0">
    <div className="ql-formats">
      <Headers />
      <FontSize />
    </div>
    <div className="ql-formats">
      <button className="ql-bold" />
      <button className="ql-italic" />
      <button className="ql-underline" />
      <button className="ql-strike" />
    </div>
    <div className="ql-formats">
      <button className="ql-list" value="ordered" />
      <button className="ql-list" value="bullet" />
      <button className="ql-indent" value="-1" />
      <button className="ql-indent" value="+1" />
    </div>
    <div className="ql-formats">
      <select className="ql-align" />
      <TextColor />
      <BackgroundColor />
    </div>
    <div className="ql-formats">
      <button className="ql-link" />
      <button className="ql-image" />
      <button className="ql-video" />
    </div>
    <div className="ql-formats">
      <button className="ql-code-block" />
      <button className="ql-code">
        <InlineCode />
      </button>
      <button className="ql-clean" />
    </div>

    <div className="ql-formats">
      <button className="ql-warning">
        <Warning />
      </button>
      <button className="ql-important">
        <Important />
      </button>
      <button className="ql-exercise">
        <Exercise />
      </button>
    </div>
    <div className="ql-formats">
      <button className="ql-undo">
        <Undo />
      </button>
      <button className="ql-redo">
        <Redo />
      </button>
      <SaveContent onClick={submitData} />
    </div>
  </div>
);

export default Toolbar;
