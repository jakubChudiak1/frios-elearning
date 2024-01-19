export function insertImportant() {
  const selection = this.quill.getSelection();
  if (selection) {
    const cursorPosition = selection.index;
    const formats = this.quill.getFormat(cursorPosition);
    if (formats && formats["important"]) {
      this.quill.formatText(cursorPosition, 1, "important", false);
    } else {
      this.quill.insertEmbed(cursorPosition, "important", "");
    }
  }
}
