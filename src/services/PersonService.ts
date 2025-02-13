import db from "../config/firebase";
import Person from "../models/Person";

const PersonService = {
  async createPerson(name: string, age: number): Promise<string> {
    if (!name || age === undefined) {
      throw new Error("Nome e idade são obrigatórios");
    }
    const docRef = await db.collection("people").add({ name, age });
    return docRef.id;
  },

  async updatePerson(id: string, name: string, age: number): Promise<void> {
    if (!name || age === undefined) {
      throw new Error("Nome e idade são obrigatórios");
    }
    await db.collection("people").doc(id).update({ name, age });
  },

  async deletePerson(id: string): Promise<void> {
    // Remove todas as transações da pessoa
    const transactions = await db
      .collection("transactions")
      .where("personId", "==", id)
      .get();
    const batch = db.batch();
    transactions.docs.forEach((doc) => batch.delete(doc.ref));
    await batch.commit();

    // Remove a pessoa
    await db.collection("people").doc(id).delete();
  },

  async getPersonById(id: string): Promise<Person | null> {
    const doc = await db.collection("people").doc(id).get();
    return doc.exists ? ({ id: doc.id, ...doc.data() } as Person) : null;
  },

  async getAllPeople(): Promise<Person[]> {
    const snapshot = await db.collection("people").get();
    return snapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() } as Person)
    );
  },
};

export default PersonService;
