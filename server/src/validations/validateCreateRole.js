import Joi from "joi";

const createRoleValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
  });
  return schema.validate(data);
};
export default createRoleValidation;
