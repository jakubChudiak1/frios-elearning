import Subject from "../models/subject.js";
import Access from "../models/access.js";

const checkChapterAccess = async (req, res, next) => {
  const userId = req.session.user_id;
  const subjectId = req.params.subject_id;
  const subject = await Subject.getSubjectById(subjectId);
  if (!subject) {
    return res.status(404).json({ error: "Subject not found" });
  }
  const isAccessed = await Access.getAccessedSubjectByUser(subjectId, userId);
  if (subject.is_public) {
    next();
  } else if (!subject.is_public && !userId) {
    next();
  } else if (!subject.is_public && userId && isAccessed) {
    next();
  } else {
    next();
  }
};
export default checkChapterAccess;
