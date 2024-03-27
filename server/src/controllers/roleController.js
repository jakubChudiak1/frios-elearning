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

  static async updateRole(req, res) {
    try {
      const { name } = req.body;
      const { role_id } = req.params;
      const role = await Role.updateRole(role_id, { name: name });
      res.status(200).json({ message: "Role successfully updated" });
    } catch (error) {
      console.log(error);
    }
  }

  static async deleteRole(req, res) {
    try {
      const { role_id } = req.params;
      const role = await Role.deleteRole(role_id);
      res.status(201).json({ message: "Role deleted successfully" });
    } catch (error) {
      console.log(error);
    }
  }
}
export default RoleController;
