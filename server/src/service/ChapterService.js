import Chapter from "../models/chapter.js";
class ChapterService {
  static async getRecursiveSideChapters(mainChapterId) {
    try {
      const sideChapters = await Chapter.getSideChapters(mainChapterId);

      const sideChaptersWithRecursiveSideChapters = await Promise.all(
        sideChapters.map(async (sideChapter) => ({
          ...sideChapter,
          sideChapters: await ChapterService.getRecursiveSideChapters(
            sideChapter?.chapter_id
          ),
        }))
      );

      return sideChaptersWithRecursiveSideChapters;
    } catch (error) {
      throw new Error(error);
    }
  }
}
export default ChapterService;
