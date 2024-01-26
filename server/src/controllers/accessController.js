import Access from "../models/access.js";
import User from "../models/user.js";

class AccessController {
  static async getAccesses(req, res) {
    try {
      const access = await Access.getAccesses();
      res.json(access);
    } catch (error) {
      console.log(error);
    }
  }

  static async getAccesById(req, res) {
    try {
      const { access_id } = req.params;
      const access = await Access.getAccessById(access_id);
      res.json(access);
    } catch (error) {
      console.log(error);
    }
  }

  static async getEditableSubjects(req, res) {
    try {
      const userId = req.session.user_id;
      console.log(userId);
      const editableSubjects = await Access.getEditableSubjects(userId);
      res.json(editableSubjects);
    } catch (error) {
      console.log(error);
    }
  }

  static async getAccessByStatus(req, res) {
    try {
      const { status } = req.query;
      const accesses = await Access.getAccessByStatus(status);
      res.json(accesses);
    } catch (error) {
      console.log(error);
    }
  }

  static async getUsersAccesses(req, res) {
    try {
      const user_id = req.session.user_id;
      const accesses = await Access.getAccessByUserId(user_id);
      res.json(accesses);
    } catch (error) {
      console.log(error);
    }
  }

  static async getIsSubjectEditableByUser(req, res) {
    try {
      const user_id = req.session.user_id;
      const subject_id = req.params;
      const isEditable = await Access.getIsSubjectEditableByUser(
        user_id,
        subject_id
      );
      res.json(isEditable);
    } catch (error) {
      console.log(error);
    }
  }

  static async getUsersSubjectsByStatus(req, res) {
    try {
      const user_id = req.session.user_id;
      const { status } = req.query;
      if (user_id) {
        const accessedSubjects = await Access.getUsersSubjectsByStatus(
          user_id,
          status
        );
        res.json(accessedSubjects);
      } else {
        res.status(401).json({ message: "unathorized" });
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async getUsersRequests(req, res) {
    try {
      const user_id = req.session.user_id;
      const requests = await Access.getUsersRequests(user_id);
      res.json(requests);
    } catch (error) {}
  }

  static async getAccessedSubjectByUser(req, res) {
    try {
      const { subject_id } = req.body;
      const { user_id } = req.session.user_id;
      const isAccessed = await Access.getAccessedSubjectByUser(
        subject_id,
        user_id
      );
      res.json(isAccessed);
    } catch (error) {
      console.log(error);
    }
  }

  static async getAccessStatus(req, res) {
    try {
      const { subject_id } = req.params;
      const user_id = req.session.user_id;
      const access = await Access.getAccessStatus(user_id, subject_id);
      res.json(access);
    } catch (error) {}
  }

  static async createAccess(req, res) {
    try {
      const { subject_id } = req.body;
      const access = await Access.createAccess({
        user_id: req.session.user_id,
        subject_id: subject_id,
        editable: false,
        status: "pending",
        created_at: new Date(),
      });

      res.json({ message: "Access Succesfully created" });
    } catch (error) {
      console.log(error);
    }
  }

  static async updateStatus(req, res) {
    try {
      const { status } = req.body;
      const { access_id } = req.params;
      const accesss = await Access.updateStatus(access_id, {
        status,
      });
      res.status(200).json({ message: "Success" });
    } catch (error) {
      console.log(error);
    }
  }

  static async acceptStatus(req, res) {
    try {
      const { access_id } = req.params;
      const accesss = await Access.acceptStatus(access_id);
      res.status(200).json({ message: "Success" });
    } catch (error) {
      console.log(error);
    }
  }

  static async rejectStatus(req, res) {
    try {
      const { access_id } = req.params;
      const accesss = await Access.rejectStatus(access_id);
      res.status(200).json({ message: "Success" });
    } catch (error) {
      console.log(error);
    }
  }

  static async deleteAccess(req, res) {
    try {
      const { access_id } = req.params;
      const access = await Access.deleteAccess(access_id);
      res.status(200).json({ message: "Access Succesfuly deleted" });
    } catch (error) {
      console.log(error);
    }
  }
}
export default AccessController;
