import Language from "../models/language.js";

class LanguageController {
  static async getLanguages(req, res) {
    try {
      const languages = await Language.getLanguages();
      res.status(200).json(languages);
    } catch (error) {
      console.log(error);
    }
  }
}
export default LanguageController;
