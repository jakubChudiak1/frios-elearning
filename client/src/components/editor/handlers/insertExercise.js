export function insertExercise() {
  const selection = this.quill.getSelection();
  if (selection) {
    const cursorPosition = selection.index;
    const formats = this.quill.getFormat(cursorPosition);
    if (formats && formats["exercise"]) {
      this.quill.formatText(cursorPosition, 1, "exercise", false);
    } else {
      this.quill.insertEmbed(cursorPosition, "exercise", "");
    }
  }
}
