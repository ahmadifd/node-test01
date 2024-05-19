import express from "express";
import Tst1Controller from "../controllers/tst1Controller.js";

const router = express.Router();

router.route("/").get(Tst1Controller.func1);

router.route("/:city").get(Tst1Controller.func2);

export default router;
