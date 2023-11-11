import Chapter from "../models/chapter.js";

class ChapterController {
  static async getSubjectsChapters(req, res) {
    try {
      const { subject_id } = req.params;
      const chapters = await Chapter.getSubjectsChapters(subject_id);
      res.json(chapters);
    } catch (error) {
      console.log(error);
    }
  }

  static async getChaptersContent(req, res) {
    try {
      const { subject_id, chapter_id } = req.params;
      const chapters = await Chapter.getChaptersContent(subject_id, chapter_id);
      res.json(chapters);
    } catch (error) {
      console.log(error);
    }
  }

  static async getMainChapters(req, res) {
    try {
      const { subject_id } = req.body;
      const chapters = await Chapter.getMainChapters(subject_id);
      res.json(chapters);
    } catch (error) {
      console.log(error);
    }
  }

  static async getSideChapters(req, res) {
    try {
      const { main_chapter } = req.params;
      const chapters = await Chapter.getSideChapters(main_chapter);
      res.json(chapters);
    } catch (error) {
      console.log(chapters);
    }
  }
}
export default ChapterController;
