import { Router } from "express";
import { createPurchased } from "../controller/purchasedController";

const router: Router = Router();

router.route("/create-purchased/:userID").post(createPurchased);

export default router;
