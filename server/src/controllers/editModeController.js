class EditModeController {
  static async setEditMode(req, res) {
    const { editMode } = req.body;
    req.session.edit_mode = editMode;
    res.status(200).json({ message: "Success" });
  }
}
export default EditModeController;
