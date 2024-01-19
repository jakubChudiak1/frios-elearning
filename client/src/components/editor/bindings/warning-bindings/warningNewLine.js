export const warningNewLine = {
  key: "Enter",
  empty: true,
  format: ["warning"],
  handler: function (range, context) {
    console.log("called");
    const [line, offset] = this.quill.getLine(range.index);
    if (context.format.warning && line && line.statics.blotName === "warning") {
      this.quill.insertText(range.index + offset, "\n", "user");
      this.quill.setSelection(range.index + offset + 1, "silent");
    } else {
      this.quill.setSelection(range.index + 1);
    }
  },
};
