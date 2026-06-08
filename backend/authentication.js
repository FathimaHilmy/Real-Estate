import Joi from "joi";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

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

const jwtverification = (req, res, next) => {
  const AuthHeader = req.headers.authorization;
  console.log("this is running");
  if (!AuthHeader) {
    return res.status(400).json({ message: "no token" });
  }
  const token = AuthHeader.split(" ")[1];
  console.log(token);
  console.log(process.env.JWT_SECRET);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decoded.id;

    next();
  } catch (error) {
    res.status(400).json({ message: "going wrong" });
  }
};

export { signupvalidation, loginvalidation, jwtverification };
