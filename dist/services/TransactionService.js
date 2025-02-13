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
const firebase_1 = __importDefault(require("../config/firebase"));
const PersonService_1 = __importDefault(require("./PersonService"));
const TransactionService = {
    createTransaction(description, value, type, personId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!description || value === undefined || !type || !personId) {
                throw new Error("Todos os campos são obrigatórios");
            }
            const person = yield PersonService_1.default.getPersonById(personId);
            if (!person) {
                throw new Error("Pessoa não encontrada");
            }
            if (person.age < 18 && type === "receita") {
                throw new Error("Menores de idade não podem ter receitas");
            }
            const docRef = yield firebase_1.default
                .collection("transactions")
                .add({ description, value, type, personId });
            return docRef.id;
        });
    },
    getTransactionsByPersonId(personId) {
        return __awaiter(this, void 0, void 0, function* () {
            const snapshot = yield firebase_1.default
                .collection("transactions")
                .where("personId", "==", personId)
                .get();
            return snapshot.docs.map((doc) => (Object.assign({ id: doc.id }, doc.data())));
        });
    },
    getAllTransactions() {
        return __awaiter(this, void 0, void 0, function* () {
            const snapshot = yield firebase_1.default.collection("transactions").get();
            return snapshot.docs.map((doc) => (Object.assign({ id: doc.id }, doc.data())));
        });
    },
    getTotals() {
        return __awaiter(this, void 0, void 0, function* () {
            // Busca todas as pessoas
            const peopleSnapshot = yield firebase_1.default.collection("people").get();
            const people = peopleSnapshot.docs.map((doc) => (Object.assign({ id: doc.id }, doc.data())));
            // Busca todas as transações
            const transactionsSnapshot = yield firebase_1.default.collection("transactions").get();
            const transactions = transactionsSnapshot.docs.map((doc) => (Object.assign({ id: doc.id }, doc.data())));
            // Calcula os totais para cada pessoa
            const peopleTotals = people.map((person) => {
                const personTransactions = transactions.filter((t) => t.personId === person.id);
                const totalReceitas = personTransactions
                    .filter((t) => t.type === "receita")
                    .reduce((sum, t) => sum + t.value, 0);
                const totalDespesas = personTransactions
                    .filter((t) => t.type === "despesa")
                    .reduce((sum, t) => sum + t.value, 0);
                const saldo = totalReceitas - totalDespesas;
                return {
                    person,
                    totalReceitas,
                    totalDespesas,
                    saldo,
                };
            });
            // Calcula os totais gerais
            const totalGeralReceitas = peopleTotals.reduce((sum, pt) => sum + pt.totalReceitas, 0);
            const totalGeralDespesas = peopleTotals.reduce((sum, pt) => sum + pt.totalDespesas, 0);
            const saldoLiquido = totalGeralReceitas - totalGeralDespesas;
            return {
                people: peopleTotals,
                totalGeralReceitas,
                totalGeralDespesas,
                saldoLiquido,
            };
        });
    },
};
exports.default = TransactionService;
