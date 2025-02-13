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
const PersonService_1 = __importDefault(require("../services/PersonService"));
const PersonController = {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, age } = req.body;
                const id = yield PersonService_1.default.createPerson(name, age);
                return res.status(201).json({ id });
            }
            catch (error) {
                return res.status(400).json({ message: error.message });
            }
        });
    },
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { name, age } = req.body;
                yield PersonService_1.default.updatePerson(id, name, age);
                return res.status(200).json({ message: "Pessoa atualizada com sucesso" });
            }
            catch (error) {
                return res.status(400).json({ message: error.message });
            }
        });
    },
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield PersonService_1.default.deletePerson(id);
                return res.status(200).json({ message: "Pessoa deletada com sucesso" });
            }
            catch (error) {
                return res.status(400).json({ message: error.message });
            }
        });
    },
    findAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const people = yield PersonService_1.default.getAllPeople();
                return res.status(200).json(people);
            }
            catch (error) {
                return res.status(400).json({ message: error.message });
            }
        });
    },
    findById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const person = yield PersonService_1.default.getPersonById(id);
                return person
                    ? res.status(200).json(person)
                    : res.status(404).json({ message: "Pessoa não encontrada" });
            }
            catch (error) {
                return res.status(400).json({ message: error.message });
            }
        });
    },
};
exports.default = PersonController;
