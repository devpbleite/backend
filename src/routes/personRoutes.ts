import express from "express";
import PersonController from "../controllers/PersonController";

const router = express.Router();

router.post("/", PersonController.create);
router.put("/:id", PersonController.update);
router.delete("/:id", PersonController.delete);
router.get("/", PersonController.findAll);
router.get("/:id", PersonController.findById);

export default router;
