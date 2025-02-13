interface Transaction {
  id?: string;
  description: string;
  value: number;
  type: "despesa" | "receita";
  personId: string;
}

export default Transaction;
