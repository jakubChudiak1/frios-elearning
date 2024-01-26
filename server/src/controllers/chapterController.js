import Chapter from "../models/chapter.js";
import ChapterService from "../service/ChapterService.js";

class ChapterController {
  static async getSubjectsChapters(req, res) {
    try {
      const { subject_id } = req.params;
      const chapters = await Chapter.getSubjectsChapters(subject_id);

      const chaptersWithRecursiveSideChapters = await Promise.all(
        chapters.map(async (chapter) => ({
          ...chapter,
          sideChapters: await ChapterService.getRecursiveSideChapters(
            chapter?.chapter_id
          ),
        }))
      );
      res.json(chaptersWithRecursiveSideChapters);
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

  static async createMainChapter(req, res) {
    try {
      const { subject_id, name } = req.body;
      const chapter = await Chapter.createMainChapter({
        subject_id,
        name,
      });
      res.status(200).json({ message: "Chapter created successfully" });
    } catch (error) {
      console.log(error);
    }
  }

  static async createSideChapter(req, res) {
    try {
      const { subject_id, name, main_chapter } = req.body;
      const chapter = await Chapter.createSideChapter({
        subject_id,
        name,
        main_chapter,
      });
      res.status(200).json({ message: "Chapter created successfully" });
    } catch (error) {
      console.log(error);
    }
  }

  static async updateChaptersContent(req, res) {
    try {
      const { chapter_id } = req.params;
      const { content } = req.body;
      const newContent = await Chapter.updateChaptersContent(chapter_id, {
        content,
      });
      res.status(200).json({ message: "Content Succesfully updated" });
    } catch (error) {
      console.log(error);
    }
  }
}
export default ChapterController;
