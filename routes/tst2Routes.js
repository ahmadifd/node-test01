import express from "express";
import Tst2Controller from "../controllers/tst2Controller.js";
import multer from "multer";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, //5mb
  },
});

router.route("/").post(Tst2Controller.func3);
router.route("/").get(Tst2Controller.func2);

export default router;
