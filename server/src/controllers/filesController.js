import Files from "../models/files.js";

class FilesController {
  static async getFiles(req, res) {
    try {
      const files = await Files.getFiles();
      res.status(200).json(files);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  static async getFileById(req, res) {
    try {
      const { file_id } = req.params;
      const file = await Files.getFileById(file_id);
      res.status(200).json(file);
    } catch (error) {
      res.status(500).json({ message: error });
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
      res.status(500).json({ message: error });
    }
  }
}

export default FilesController;
