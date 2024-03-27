import path from "path";
import fs from "fs";
class TranslateController {
  static getTranslation(req, res) {
    try {
      const { lang } = req.params;
      const filePath = path.join("./", "locales", `${lang.split("-")[0]}.json`);
      fs.readFile(filePath, "utf-8", (error, data) => {
        if (error) {
          return res.status(404).json({ error: "not found" });
        } else {
          const jsonData = JSON.parse(data);
          res.status(200).json(jsonData);
        }
      });
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

export default TranslateController;
