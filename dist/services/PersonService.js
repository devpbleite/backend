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
const PersonService = {
    createPerson(name, age) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!name || age === undefined) {
                throw new Error("Nome e idade são obrigatórios");
            }
            const docRef = yield firebase_1.default.collection("people").add({ name, age });
            return docRef.id;
        });
    },
    updatePerson(id, name, age) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!name || age === undefined) {
                throw new Error("Nome e idade são obrigatórios");
            }
            yield firebase_1.default.collection("people").doc(id).update({ name, age });
        });
    },
    deletePerson(id) {
        return __awaiter(this, void 0, void 0, function* () {
            // Remove todas as transações da pessoa
            const transactions = yield firebase_1.default
                .collection("transactions")
                .where("personId", "==", id)
                .get();
            const batch = firebase_1.default.batch();
            transactions.docs.forEach((doc) => batch.delete(doc.ref));
            yield batch.commit();
            // Remove a pessoa
            yield firebase_1.default.collection("people").doc(id).delete();
        });
    },
    getPersonById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const doc = yield firebase_1.default.collection("people").doc(id).get();
            return doc.exists ? Object.assign({ id: doc.id }, doc.data()) : null;
        });
    },
    getAllPeople() {
        return __awaiter(this, void 0, void 0, function* () {
            const snapshot = yield firebase_1.default.collection("people").get();
            return snapshot.docs.map((doc) => (Object.assign({ id: doc.id }, doc.data())));
        });
    },
};
exports.default = PersonService;
