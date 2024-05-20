import express from "express";
import Tst1Controller from "../controllers/tst1Controller.js";
import multer from "multer";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, //5mb
  },
});

router.route("/").get(Tst1Controller.func1);

router.route("/:city").get(Tst1Controller.func2);

router.route("/").post(
    upload.single("file"), 
    Tst1Controller.func3);

export default router;
