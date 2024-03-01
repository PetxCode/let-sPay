import { Router } from "express";
import {
  createStroe,
  getAllStore,
  getOneStore,
} from "../controller/storeController";
import multer from "multer";
const upload = multer().single("picture");

const router: Router = Router();

router.route("/create-store/:vendorID").post(upload, createStroe);

router.route("/get-store").get(getAllStore);
router.route("/get-one-store").get(getOneStore);

export default router;
