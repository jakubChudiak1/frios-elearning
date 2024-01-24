import Subject from "../models/subject.js";
import createSubjectValidation from "../validations/validateCreateSubject.js";
import Access from "../models/access.js";
import User from "../models/user.js";
import fs from "fs";
import redis from "redis";
import redisClient from "../config/redisClient.js";

class SubjectController {
  static async getSubjects(req, res) {
    try {
      const subjects = await Subject.getSubjects();
      res.json(subjects);
    } catch (error) {
      console.log(error);
    }
  }

  static async getSubjectsByStatus(req, res) {
    try {
      const { is_public } = req.query;
      const subjects = await Subject.getSubjectsByStatus(is_public);
      /* console.log("not fetchedd");
      await redisClient.setEx(req.originalUrl, 3600, JSON.stringify(subjects)); */
      res.json(subjects);
    } catch (error) {
      console.log(error);
    }
  }

  static async getSubjectById(req, res) {
    try {
      const { subject_id } = req.params;
      const subject = await Subject.getSubjectById(subject_id);
      res.json(subject);
    } catch (error) {
      console.log(error);
    }
  }

  static async getSubjectByName(req, res) {
    try {
      const { name } = req.query;
      const subject = await Subject.getSubjectByName(name);
      res.json(subject);
    } catch (error) {
      console.log(error);
    }
  }

  static async getSubjectByString(req, res) {
    try {
      const { q } = req.query;
      const subjects = await Subject.getSubjectsByString(q);
      res.json(subjects);
    } catch (error) {
      console.log(error);
    }
  }

  static async getSubjectByCreator(req, res) {
    try {
      const { user_id, subject_id } = req.query;
      const subjects = await Subject.getSubjectsByCreator(user_id, subject_id);
      res.json(subjects);
    } catch (error) {
      console.log(error);
    }
  }

  static async getSubjectsByCategory(req, res) {
    try {
      const { category_name } = req.query;
      const subjects = await Subject.getSubjectsByCategory(category_name);
      res.json(subjects);
    } catch (error) {
      console.log(error);
    }
  }

  static async getRecommendedSubjects(req, res) {
    try {
      const { category_name, subject_id } = req.query;
      const subjects = await Subject.getRecommendedSubjects(
        category_name,
        subject_id
      );
      res.json(subjects);
    } catch (error) {
      console.log(error);
    }
  }

  static async createSubject(req, res) {
    try {
      console.log(req.body);
      const { category_id, subject_code, name, is_public, description } =
        req.body;
      const user_id = req.session.user_id;
      const admins = await User.getUsersByRole(1);
      let image_path = null;
      if (req.file) {
        image_path = req.file.filename;
      }
      const { error } = createSubjectValidation(req.body);
      if (error) {
        res.status(400).json({ message: error.details[0].message });
        console.log(error.details[0]);
      } else {
        const newSubject = await Subject.createSubject({
          category_id,
          user_id,
          subject_code,
          name,
          is_public,
          image_path,
          description,
        });
        const subject_id = Number(newSubject);
        await Access.createAccess({
          user_id: user_id,
          subject_id: subject_id,
          editable: true,
          status: "accepted",
          created_at: new Date(),
        });
        const adminAccess = admins.map(async (admin) => {
          await Access.createAccess({
            user_id: admin.user_id,
            subject_id,
            editable: true,
            status: "accepted",
            created_at: new Date(),
          });
        });

        await Promise.all(adminAccess);

        res.status(201).json({ message: "Subject created successfully" });
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async deleteSubject(req, res) {
    try {
      const { subject_id } = req.params;
      const image = await Subject.getSubjectById(subject_id);

      if (
        image &&
        image.image_path &&
        fs.existsSync(`public/images/${image.image_path}`)
      ) {
        console.log(image.image_path);
        fs.unlinkSync(`public/images/${image.image_path}`);
      }

      const subject = await Subject.deleteSubject(subject_id);
      res.status(201).json({ message: "Subject deleted successfully" });
    } catch (error) {
      console.log(error);
    }
  }

  static async updateSubject(req, res) {
    try {
      const { category_id, subject_code, name, is_public, description } =
        req.body;
      console.log("body", req.body);
      const { subject_id } = req.params;
      const updatedSubject = await Subject.updateSubject(subject_id, {
        category_id,
        subject_code,
        name,
        is_public,
        description,
      });
      res.status(201).json({ message: "Subject updated successfully" });
    } catch (error) {
      console.log(error);
    }
  }
}
export default SubjectController;
