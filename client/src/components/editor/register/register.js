import { Quill } from "react-quill";
import ImageResize from "quill-image-resize-module-react";
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";

import { WarningFormat } from "../formats/WarningFormat";
import { ImportantFormat } from "../formats/ImportantFormat";
import { ExerciseFormat } from "../formats/ExerciseFormat";
import { ImageFormat } from "../formats/ImageFormat";

const Link = Quill.import("formats/link");
Link.className = "ql-link";
const Code = Quill.import("formats/code");
Code.className = "ql-code";
const List = Quill.import("formats/list");
List.className = "ql-list";
var Size = Quill.import("attributors/style/size");
Size.whitelist = [
  "8px",
  "10px",
  "12px",
  "14px",
  "16px",
  "18px",
  "20px",
  "22px",
  "24px",
  "36px",
  "48px",
  "56px",
  "72px",
];
const ColorClass = Quill.import("attributors/class/color");
const BackgroundClass = Quill.import("attributors/class/background");

export const register = () => {
  Quill.register(Link, true);
  Quill.register(Code, true);
  Quill.register(List, true);
  Quill.register("modules/imageResize", ImageResize);
  Quill.register(Size, true);
  hljs.registerLanguage("javascript", javascript);

  Quill.register(ColorClass, true);

  Quill.register(BackgroundClass, true);

  Quill.register(ImportantFormat, true);
  Quill.register(WarningFormat, true);
  Quill.register(ExerciseFormat, true);
  Quill.register(ImageFormat, true);
};
