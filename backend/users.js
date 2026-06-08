import mongoose from "mongoose";
const userSchema = mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const UserModel = mongoose.model("user", userSchema);

const propertySchema = mongoose.Schema({
  propertyname: { type: String, required: true },
  transactiontype: { type: String, enum: ["sale", "rent"], required: true },
  propertytype: { type: String, enum: ["land", "apartment"], required: true },
  price: { type: Number, required: true },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
});

const PropertyModel = mongoose.model("property", propertySchema);

export { UserModel, PropertyModel };
