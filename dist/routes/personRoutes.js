"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const PersonController_1 = __importDefault(require("../controllers/PersonController"));
const router = express_1.default.Router();
router.post("/", PersonController_1.default.create);
router.put("/:id", PersonController_1.default.update);
router.delete("/:id", PersonController_1.default.delete);
router.get("/", PersonController_1.default.findAll);
router.get("/:id", PersonController_1.default.findById);
exports.default = router;
