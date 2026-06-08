import express from "express";
const router = express.Router();
import {
  signup,
  login,
  propcreate,
  pagination,
  del,
  upd,
  transfil,
  propfil,
  pricefil,
} from "./controller.js";
import {
  signupvalidation,
  loginvalidation,
  jwtverification,
} from "./authentication.js";

router.post("/signup", signupvalidation, signup);
router.post("/login", loginvalidation, login);
router.post("/create", jwtverification, propcreate);
router.get("/getprop", pagination);
router.delete("/delete/:id", jwtverification, del);
router.put("/update/:id", jwtverification, upd);
router.get("/tfilt", jwtverification, transfil);
router.get("/pfilt", jwtverification, propfil);
router.get("/prfilt", jwtverification, pricefil);

export default router;
