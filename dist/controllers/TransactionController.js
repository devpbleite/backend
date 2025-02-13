"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TransactionService_1 = __importDefault(require("../services/TransactionService"));
const TransactionController = {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { description, value, type, personId } = req.body;
                const id = yield TransactionService_1.default.createTransaction(description, value, type, personId);
                return res.status(201).json({ id });
            }
            catch (error) {
                return res.status(400).json({ message: error.message });
            }
        });
    },
    findAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const transactions = yield TransactionService_1.default.getAllTransactions();
                return res.status(200).json(transactions);
            }
            catch (error) {
                return res.status(400).json({ message: error.message });
            }
        });
    },
    findByPersonId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { personId } = req.params;
                const transactions = yield TransactionService_1.default.getTransactionsByPersonId(personId);
                return res.status(200).json(transactions);
            }
            catch (error) {
                return res.status(400).json({ message: error.message });
            }
        });
    },
    getTotals(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const totals = yield TransactionService_1.default.getTotals();
                return res.status(200).json(totals);
            }
            catch (error) {
                return res.status(400).json({ message: error.message });
            }
        });
    },
};
exports.default = TransactionController;
