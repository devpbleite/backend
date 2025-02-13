import express from "express";
import cors from "cors";
import personRoutes from "./routes/personRoutes";
import transactionRoutes from "./routes/transactionRoutes";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/people", personRoutes);
app.use("/transactions", transactionRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
