import Joi from "joi";

const createSubjectValidation = (data) => {
  const schema = Joi.object({
    category_id: Joi.number().required(),
    subject_code: Joi.string().optional().allow(""),
    description: Joi.string().optional().allow(""),
    name: Joi.string().required(),
    is_public: Joi.number().required(),
    is_visible: Joi.number().required(),
    image_path: Joi.string().optional(),
    language_id: Joi.string().required(),
  });
  return schema.validate(data);
};
export default createSubjectValidation;
