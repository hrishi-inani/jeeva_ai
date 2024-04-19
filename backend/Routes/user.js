import express from "express";
import { recordings, getRecordings } from "../Controllers/userController.js";

const router = express.Router();

router.post("/recordings",recordings);
router.get("/getRecordings", getRecordings);

const user = router;
export default user;