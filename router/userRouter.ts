import { Router } from "express";
import {
  createUser,
  getAllUser,
  getOneUser,
  getOneUserHistory,
  loginUser,
} from "../controller/userController";

const router: Router = Router();

router.route("/create-user").post(createUser);
router.route("/login-user").post(loginUser);

router.route("/get-users").get(getAllUser);
router.route("/get-one-user/:userID").get(getOneUser);
router.route("/get-one-user-history/:userID").get(getOneUserHistory);

export default router;
