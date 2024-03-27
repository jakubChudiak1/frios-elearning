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
      console.log(error);
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
      const { subject_id, content } = req.body;
      const newContent = await Chapter.updateChaptersContent(chapter_id, {
        content,
      });
      res.status(200).json({ message: "Content Succesfully updated" });
    } catch (error) {
      console.log(error);
    }
  }

  static async updateChaptersName(req, res) {
    try {
      const { chapter_id } = req.params;
      const { name } = req.body;
      const newName = await Chapter.updateChaptersName(chapter_id, { name });
      res
        .status(200)
        .json({ message: "Chapters name was successfully changed" });
    } catch (error) {
      throw new Error(error);
    }
  }

  static async updateChapterPublished(req, res) {
    try {
      const { chapter_id } = req.params;
      const { published } = req.body;
      const newChapter = await Chapter.updateChapterPublished(chapter_id, {
        published,
      });
      res.status(200).json({ message: "Chapter successfully updated" });
    } catch (error) {
      console.log(error);
    }
  }

  static async deleteChapter(req, res) {
    try {
      const { subject_id, chapter_id } = req.params;
      await Chapter.deleteChapter(chapter_id);
      res.status(200).json({ message: "Chapter was successfully removed" });
    } catch (error) {
      throw new Error(error);
    }
  }
}
export default ChapterController;
