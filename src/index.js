
import express from "express";
import dotenv from "dotenv";
import loanRoutes from "./routes/loanRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "REST API Peminjaman Buku Perpustakaan",
    endpoints: {
      loans: "/loans",
      loanById: "/loans/:id",
      filter: "/loans?status=Terlambat"
    }
  });
});

app.use("/loans", loanRoutes);

const port = process.env.PORT || 3000;


if (process.env.NODE_ENV !== "production") {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

export default app;
