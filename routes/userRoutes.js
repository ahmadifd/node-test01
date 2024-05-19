import express from "express";
import usersController from "../controllers/usersController.js";
import Tst1Controller from "../controllers/tst1Controller.js";

const router = express.Router();

router.route("/").get(usersController.getUsers);
//router.route("/:id").get(usersController.getUser);

export default router;
