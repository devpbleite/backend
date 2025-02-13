import { Request, Response, RequestHandler } from "express";
import TransactionService from "../services/TransactionService";

const TransactionController = {
  create: (async (req: Request, res: Response): Promise<void> => {
    try {
      const { description, value, type, personId } = req.body;
      const id = await TransactionService.createTransaction(
        description,
        value,
        type,
        personId
      );
      res.status(201).json({ id });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }) as RequestHandler,

  findAll: (async (req: Request, res: Response): Promise<void> => {
    try {
      const transactions = await TransactionService.getAllTransactions();
      res.status(200).json(transactions);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }) as RequestHandler,

  findByPersonId: (async (req: Request, res: Response): Promise<void> => {
    try {
      const { personId } = req.params;
      const transactions = await TransactionService.getTransactionsByPersonId(
        personId
      );
      res.status(200).json(transactions);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }) as RequestHandler,

  getTotals: (async (req: Request, res: Response): Promise<void> => {
    try {
      const totals = await TransactionService.getTotals();
      res.status(200).json(totals);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }) as RequestHandler,
};

export default TransactionController;
