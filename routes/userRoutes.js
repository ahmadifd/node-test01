import express from "express";
import usersController from "../controllers/usersController.js";

const router = express.Router();

router.route("/").get(usersController.getUsers);
//router.route("/:id").get(usersController.getUser);

export default router;
