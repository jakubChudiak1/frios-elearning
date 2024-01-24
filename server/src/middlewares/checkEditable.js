import Access from "../models/access.js";

const checkEditable = async (req, res, next) => {
  const subject_id = req.params.subject_id;

  try {
    const isEditable = await Access.getIsSubjectEditableByUser(
      req.session.user_id,
      subject_id
    );

    if (isEditable) {
      next();
    } else {
      res.status(400).json({
        message: "User has no permission to manipulate with this subject",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export default checkEditable;
