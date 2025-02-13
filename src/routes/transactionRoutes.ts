import express from "express";
import TransactionController from "../controllers/TransactionController";

const router = express.Router();

router.post("/", TransactionController.create);
router.get("/", TransactionController.findAll);
router.get("/", TransactionController.findAll);
router.get("/:personId", TransactionController.findByPersonId);
router.get("/totals/all", TransactionController.getTotals);

export default router;
