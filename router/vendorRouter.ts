import { Router } from "express";
import {
  createVendor,
  getAllVendor,
  getOneVendor,
  getOneVendorHistory,
  getOneVendorStore,
  loginVendor,
} from "../controller/vendorController";

const router: Router = Router();

router.route("/create-vendor").post(createVendor);
router.route("/login-vendor").post(loginVendor);

router.route("/get-vendor").get(getAllVendor);
router.route("/get-one-vendor/:vendorID").get(getOneVendor);
router.route("/get-one-vendor-history/:vendorID").get(getOneVendorHistory);
router.route("/get-one-vendor-store/:vendorID").get(getOneVendorStore);

export default router;
