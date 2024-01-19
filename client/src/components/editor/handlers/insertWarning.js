export function insertWarning() {
  const selection = this.quill.getSelection();
  if (selection) {
    const cursorPosition = selection.index;
    const formats = this.quill.getFormat(cursorPosition);
    console.log(formats);
    if (formats && formats["warning"]) {
      this.quill.formatText(cursorPosition, 1, "warning", false);
    } else {
      this.quill.insertEmbed(cursorPosition, "warning", "");
    }
  }
}
