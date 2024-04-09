import Joi from "joi";

const createCategoryValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
  });
  return schema.validate(data);
};
export default createCategoryValidation;
