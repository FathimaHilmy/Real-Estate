import Joi from "joi";

const signupvalidation = (req, res, next) => {
  const Schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(4).required(),
  });
  const { error } = Schema.validate(req.body);
  if (error) {
    return (
      res.status(400).json({
        message: error.details[0].message,
        "this is the error": error,
      }),
      console.log("validation failed")
    );
  }
  console.log("vaidation success");
  next();
};

const loginvalidation = (req, res, next) => {
  const Schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(4).required(),
  });
  const { error } = Schema.validate(req.body);
  if (error) {
    return (
      res.status(400).json({
        message: error.details[0].message,
        "this is the error": error,
      }),
      console.log("validation failed")
    );
  }
  console.log("vaidation success");
  next();
};

export { signupvalidation, loginvalidation };
