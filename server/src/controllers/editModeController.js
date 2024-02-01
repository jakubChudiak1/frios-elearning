class EditModeController {
  static async turnEditModeOn(req, res) {
    {
      if (req.session.edit_mode == null) {
        req.session.edit_mode = true;
      }
    }
  }

  static async turnEditModeOff(req, res) {
    {
      if (req.session.edit_mode) {
        req.session.edit_mode = null;
      }
    }
  }
}
export default EditModeController;
