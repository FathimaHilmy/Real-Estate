import jwt from "jsonwebtoken";
import { UserModel, PropertyModel } from "./users.js";
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

const propcreate = (req, res) => {
  try {
    const { propertyname, transactiontype, propertytype, price } = req.body;

    if (!propertyname || !transactiontype || !propertytype || !price) {
      return res.status(400).json({ message: "required all fields" });
    }
    console.log("backend reciebved", { propertyname });
    const property = PropertyModel.create({
      propertyname,
      transactiontype,
      propertytype,
      price,
      user: req.userId,
    });
    return res.status(200).json({ message: "property added" }, property);
  } catch (error) {
    return res.status(400).json({ message: message.error });
  }
};

const pagination = async (req, res) => {
  const limit = parseInt(req.query.limit);
  const page = parseInt(req.query.page);
  console.log(limit, page);

  const result = {};

  const startIndex = (page - 1) * limit;
  try {
    result.result = await PropertyModel.find()
      .limit(limit)
      .skip(startIndex)
      .exec();
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const del = async (req, res) => {
  try {
    console.log("params:", req.params);
    console.log("controller is coming here");
    const id = req.params.id;
    console.log("herehere", id);
    const dele = await PropertyModel.findOneAndDelete({ _id: id });
    res.status(200).json(dele);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const upd = async (req, res) => {
  try {
    const id = req.params.id;

    console.log("running", req.params.id);

    const { propertyname, transactiontype, propertytype, price } = req.body;
    const update = await PropertyModel.findOneAndUpdate(
      { _id: id },
      { propertyname, transactiontype, propertytype, price },
      { new: true },
    );
    console.log("updated prop", update);
    res.status(200).json(update);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const transfil = async (req, res) => {
  try {
    const type = req.query.type;
    const properties = await PropertyModel.find();
    const filtered = properties.filter((prop) => prop.transactiontype === type);
    res.status(200).json(filtered);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const propfil = async (req, res) => {
  try {
    const type = req.query.type;
    console.log("type is", type);
    const properties = await PropertyModel.find();
    console.log(properties);
    const filtered = properties.filter((prop) => prop.propertytype === type);
    console.log(filtered);
    res.status(200).json(filtered);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const pricefil = async (req, res) => {
  try {
    const min = Number(req.query.min);
    const max = Number(req.query.max);
    console.log("min and max us", min, max);
    console.log(typeof min, typeof max);
    const filtered = await PropertyModel.find({
      price: { $gte: min, $lte: max },
    });
    console.log(filtered);
    res.status(200).json(filtered);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export {
  signup,
  login,
  propcreate,
  pagination,
  del,
  upd,
  transfil,
  propfil,
  pricefil,
};
