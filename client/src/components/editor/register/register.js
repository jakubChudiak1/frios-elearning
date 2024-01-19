import { Quill } from "react-quill";
import ImageResize from "quill-image-resize-module-react";
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import { WarningFormat } from "../formats/WarningFormat";
import { ImportantFormat } from "../formats/ImportantFormat";
import { ExerciseFormat } from "../formats/ExerciseFormat";

const Link = Quill.import("formats/link");
Link.className = "ql-link";
const Code = Quill.import("formats/code");
Code.className = "ql-code";
const List = Quill.import("formats/list");
List.className = "ql-list";
const fontSizeStyle = Quill.import("attributors/style/size");
fontSizeStyle.whitelist = [
  "10px",
  "12px",
  "14px",
  "16px",
  "20px",
  "24px",
  "36px",
];

const Size = Quill.import("formats/size");
Size.whitelist = ["extra-small", "small", "medium", "large"];

export const register = () => {
  Quill.register(Link, true);
  Quill.register(Code, true);
  Quill.register(List, true);
  Quill.register("modules/imageResize", ImageResize);

  hljs.registerLanguage("javascript", javascript);

  Quill.register(Size, true);

  const ColorClass = Quill.import("attributors/class/color");
  Quill.register(ColorClass, true);

  const BackgroundClass = Quill.import("attributors/class/background");
  Quill.register(BackgroundClass, true);

  Quill.register(ImportantFormat);
  Quill.register(WarningFormat, true);
  Quill.register(ExerciseFormat);
};
