"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const TransactionController_1 = __importDefault(require("../controllers/TransactionController"));
const router = express_1.default.Router();
router.post("/", TransactionController_1.default.create);
router.get("/", TransactionController_1.default.findAll);
router.get("/", TransactionController_1.default.findAll);
router.get("/:personId", TransactionController_1.default.findByPersonId);
router.get("/totals/all", TransactionController_1.default.getTotals);
exports.default = router;
