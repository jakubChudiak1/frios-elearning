const checkEditMode = (req, res, next) => {
  if (session.edit_mode) {
    next();
  } else {
    res.end();
  }
};
