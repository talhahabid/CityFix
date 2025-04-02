import express from "express";
import { submitForm, getForms } from "../controllers/Form.controller.js";
// import { requireAuth } from "../../middleware/requireAuth.js";

const router = express.Router();
// router.use(requireAuth);
router.post("/submit/:_id", submitForm);
router.get("/getForms", getForms);
export default router;
