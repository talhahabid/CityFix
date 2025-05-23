import express from "express";
import { submitForm, getForms, editFormStatus, deleteForm } from "../controllers/Form.controller.js";
// import { requireAuth } from "../../middleware/requireAuth.js";

const router = express.Router();
// router.use(requireAuth);
router.post("/submit/:_id", submitForm);
router.get("/getForms", getForms);
router.put("/editForm/:_id", editFormStatus)
router.delete("/deleteForm/:_id", deleteForm)
export default router;