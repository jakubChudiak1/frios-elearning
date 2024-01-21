import { Quill } from "react-quill";

const ParchmentEmbed = Quill.import("blots/block/embed");
const ATTRIBUTES = ["alt", "height", "width", "style"];

class ImageFormat extends ParchmentEmbed {
  static create(value) {
    let node = super.create(value);
    if (typeof value === "string") {
      node.setAttribute("src", this.sanitize(value));
    }
    return node;
  }

  static formats(domNode) {
    return ATTRIBUTES.reduce(function (formats, attribute) {
      if (domNode.hasAttribute(attribute)) {
        formats[attribute] = domNode.getAttribute(attribute);
      }
      return formats;
    }, {});
  }

  static match(url) {
    return /\.(jpe?g|gif|png)$/.test(url) || /^data:image\/.+;base64/.test(url);
  }

  static sanitize(url) {
    return url;
  }

  static value(domNode) {
    return domNode.getAttribute("src");
  }

  format(name, value) {
    if (ATTRIBUTES.indexOf(name) > -1) {
      if (value) {
        this.domNode.setAttribute(name, value);
      } else {
        this.domNode.removeAttribute(name);
      }
    } else {
      super.format(name, value);
    }
  }
}

ImageFormat.blotName = "image";
ImageFormat.tagName = "IMG";

export { ImageFormat };
