import { Quill } from "react-quill";
import { insertWarning } from "../handlers/insertWarning";
import { insertExercise } from "../handlers/insertExercise";
import { insertImportant } from "../handlers/insertImportant";
import hljs from "highlight.js/lib/core";
import { undoChange } from "../handlers/undoChange";
import { redoChange } from "../handlers/redoChange";
import { bindings } from "../bindings/bindings";
import { imageHandler } from "../handlers/imageHandler";

window.Quill = Quill;
export const modules = {
  keyboard: {
    bindings: bindings,
  },
  toolbar: {
    container: "#toolbar",
    handlers: {
      warning: insertWarning,
      exercise: insertExercise,
      important: insertImportant,
      undo: undoChange,
      redo: redoChange,
      image: imageHandler,
    },
  },
  history: {
    delay: 500,
    maxStack: 100,
    userOnly: true,
  },
  imageResize: {
    parchment: Quill.import("parchment"),
    modules: ["Resize", "DisplaySize", "Toolbar"],
  },

  syntax: {
    highlight: (text) => hljs.highlightAuto(text).value,
  },
};
