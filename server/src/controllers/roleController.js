import Role from "../models/role.js";
import createRoleValidation from "../validations/validateCreateRole.js";

class RoleController {
  static async getRoles(req, res) {
    try {
      const roles = await Role.getRoles();
      res.json(roles);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  static async createRole(req, res) {
    try {
      const { name } = req.body;
      const { error } = createRoleValidation(req.body);
      if (error) {
        res.status(400).json({ message: error.details[0].message });
      } else {
        const newRole = await Role.createRole({ name });
        res.status(201).json({ message: "Role created successfully" });
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async deleteRole(req, res) {
    try {
      const { id_role } = req.params;
      const role = await Role.deleteRole(id_role);
      res.status(201).json({ message: "Role deleted successfully" });
    } catch (error) {
      console.log(error);
    }
  }
}
export default RoleController;
