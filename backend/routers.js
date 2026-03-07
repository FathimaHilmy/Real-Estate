import express from "express";
const router = express.Router();
import { signup, login } from "./controller.js";
import { signupvalidation, loginvalidation } from "./authentication.js";

router.post("/signup", signupvalidation, signup);
router.post("/login", loginvalidation, login);

export default router;
