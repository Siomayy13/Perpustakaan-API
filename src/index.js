import express from "express";
import path from "path";
import { fileURLToPath } from "url";

import productRoutes from "./routes/productRoutes.js";
import customerRoutes from "./routes/customerRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import loanRoutes from "./routes/loanRoutes.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.static(path.join(__dirname, "views")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.use("/products", productRoutes);
app.use("/customers", customerRoutes);
app.use("/categories", categoryRoutes);
app.use("/loans", loanRoutes);

if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
    console.log("API buku       : /products");
    console.log("API anggota    : /customers");
    console.log("API kategori   : /categories");
    console.log("API peminjaman : /loans");
  });
}

export default app;