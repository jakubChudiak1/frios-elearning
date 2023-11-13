import Joi from "joi";

const createUserValidation = (data) => {
  const schema = Joi.object({
    personal_number: Joi.number(),
    ldap_login: Joi.string(),
    name: Joi.string().required(),
    surname: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).trim().required(),
  });
  return schema.validate(data);
};
export default createUserValidation;
