import axios from "axios";
import apiConfig from "../../../config/api.config";

export function imageHandler() {
  const input = document.createElement("input");
  input.setAttribute("type", "file");
  input.setAttribute("accept", "image/*");
  input.click();

  input.onchange = async () => {
    const file = input.files[0];
    const formData = new FormData();
    formData.append("upload", file);
    const range = this.quill.getSelection(true);
    this.quill.setSelection(range.index + 1);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_ADRESS}files/add-file`,
        formData,
      );
      this.quill.insertEmbed(
        range.index,
        "image",
        apiConfig.images.subjectImage(res.data.path),
      );
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };
}
