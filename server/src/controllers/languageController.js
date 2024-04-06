import Language from "../models/language.js";

class LanguageController {
  static async getLanguages(req, res) {
    try {
      const languages = await Language.getLanguages();
      res.status(200).json(languages);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
}
export default LanguageController;
