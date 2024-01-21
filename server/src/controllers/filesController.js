import Files from "../models/files.js";

class FilesController {
  static async getFiles(req, res) {
    try {
      const files = await Files.getFiles();
      res.json(files);
    } catch (error) {
      console.log(error);
    }
  }

  static async getFileById(req, res) {
    try {
      const { file_id } = req.params;
      const file = await Files.getFileById(file_id);
      res.json(file);
    } catch (error) {
      console.log(error);
    }
  }

  static async createFile(req, res) {
    try {
      let path = null;
      if (req.file) {
        path = req.file.filename;
      }
      const file = await Files.createFile({ path });
      res
        .status(200)
        .json({ message: "file was created successfully", path: path });
    } catch (error) {
      console.log(error);
    }
  }
}

export default FilesController;
