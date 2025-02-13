import { Request, Response, RequestHandler } from "express";
import PersonService from "../services/PersonService";

const PersonController = {
  create: (async (req: Request, res: Response): Promise<void> => {
    try {
      const { name, age } = req.body;
      const id = await PersonService.createPerson(name, age);
      res.status(201).json({ id });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }) as RequestHandler,

  update: (async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const { name, age } = req.body;
      await PersonService.updatePerson(id, name, age);
      res.status(200).json({ message: "Pessoa atualizada com sucesso" });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }) as RequestHandler,

  delete: (async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      await PersonService.deletePerson(id);
      res.status(200).json({ message: "Pessoa deletada com sucesso" });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }) as RequestHandler,

  findAll: (async (req: Request, res: Response): Promise<void> => {
    try {
      const people = await PersonService.getAllPeople();
      res.status(200).json(people);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }) as RequestHandler,

  findById: (async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const person = await PersonService.getPersonById(id);
      if (person) {
        res.status(200).json(person);
      } else {
        res.status(404).json({ message: "Pessoa não encontrada" });
      }
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }) as RequestHandler,
};

export default PersonController;
