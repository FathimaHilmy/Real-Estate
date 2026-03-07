import jwt from "jsonwebtoken";
import UserModel from "./users.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

const signup = async (req, res) => {
  try {
    console.log("this is the data", req.body);
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "required both fields" });
    }
    const userfound = await UserModel.findOne({ email });
    if (userfound) {
      return res.status(400).json({ message: "user exists" });
    }
    const hashpassword = await bcrypt.hash(password, 10);
    const user = await UserModel.create({
      email,
      password: hashpassword,
    });
    console.log("This is the user", user);
    return res.status(200).json({ message: "user created", user });
  } catch (error) {
    return res
      .status(400)
      .json({ message: error.message, "erroris here": error });
  }
};

const login = async (req, res) => {
  try {
    console.log("this is the data", req.body);
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "required both fields" });
    }
    const userfound = await UserModel.findOne({ email });
    if (!userfound) {
      return res.status(400).json({ message: "user  doesnt exists" });
    }
    const ispassvalid = await bcrypt.compare(password, userfound.password);
    if (!ispassvalid) {
      return res.status(400).json({ message: "password invalid" });
    }
    const token = jwt.sign({ id: userfound._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    return res.status(200).json({ message: "login succesful", token });
  } catch (error) {
    return res
      .status(400)
      .json({ message: error.message, "erroris here": error });
  }
};

export { signup, login };
