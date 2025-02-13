import db from "../config/firebase";
import Transaction from "../models/Transaction";
import PersonService from "./PersonService";
import Person from "../models/Person";

const TransactionService = {
  async createTransaction(
    description: string,
    value: number,
    type: "despesa" | "receita",
    personId: string
  ): Promise<string> {
    if (!description || value === undefined || !type || !personId) {
      throw new Error("Todos os campos são obrigatórios");
    }

    const person = await PersonService.getPersonById(personId);
    if (!person) {
      throw new Error("Pessoa não encontrada");
    }

    if (person.age < 18 && type === "receita") {
      throw new Error("Menores de idade não podem ter receitas");
    }

    const docRef = await db
      .collection("transactions")
      .add({ description, value, type, personId });
    return docRef.id;
  },

  async getTransactionsByPersonId(personId: string): Promise<Transaction[]> {
    const snapshot = await db
      .collection("transactions")
      .where("personId", "==", personId)
      .get();
    return snapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() } as Transaction)
    );
  },

  async getAllTransactions(): Promise<Transaction[]> {
    const snapshot = await db.collection("transactions").get();
    return snapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() } as Transaction)
    );
  },

  async getTotals(): Promise<{
    people: Array<{
      person: Person;
      totalReceitas: number;
      totalDespesas: number;
      saldo: number;
    }>;
    totalGeralReceitas: number;
    totalGeralDespesas: number;
    saldoLiquido: number;
  }> {
    // Busca todas as pessoas
    const peopleSnapshot = await db.collection("people").get();
    const people = peopleSnapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() } as Person)
    );

    // Busca todas as transações
    const transactionsSnapshot = await db.collection("transactions").get();
    const transactions = transactionsSnapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() } as Transaction)
    );

    // Calcula os totais para cada pessoa
    const peopleTotals = people.map((person) => {
      const personTransactions = transactions.filter(
        (t) => t.personId === person.id
      );

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
    const totalGeralReceitas = peopleTotals.reduce(
      (sum, pt) => sum + pt.totalReceitas,
      0
    );
    const totalGeralDespesas = peopleTotals.reduce(
      (sum, pt) => sum + pt.totalDespesas,
      0
    );
    const saldoLiquido = totalGeralReceitas - totalGeralDespesas;

    return {
      people: peopleTotals,
      totalGeralReceitas,
      totalGeralDespesas,
      saldoLiquido,
    };
  },
};

export default TransactionService;
