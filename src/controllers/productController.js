import * as Product from "../models/productModel.js";

export async function getProducts(req, res) {
  try {
    res.json(await Product.getAllProducts());
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function addProduct(req, res) {
  try {
    const { id, title, author, category, stock } = req.body;

    if (!id || !title || !author || !category ||
        !Number.isInteger(stock) || stock < 0) {
      return res.status(400).json({
        message: "ID, judul, penulis, kategori, dan stok valid wajib diisi"
      });
    }

    res.status(201).json(
      await Product.createProduct({ id, title, author, category, stock })
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function editProduct(req, res) {
  try {
    const { title, author, category, stock } = req.body;

    if (
      (stock !== undefined &&
        (!Number.isInteger(stock) || stock < 0)) ||
      (title !== undefined && !title.trim()) ||
      (author !== undefined && !author.trim()) ||
      (category !== undefined && !category.trim())
    ) {
      return res.status(400).json({ message: "Data buku tidak valid" });
    }

    res.json(await Product.updateProduct(req.params.id, {
      ...(title !== undefined && { title }),
      ...(author !== undefined && { author }),
      ...(category !== undefined && { category }),
      ...(stock !== undefined && { stock })
    }));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function removeProduct(req, res) {
  try {
    res.json(await Product.deleteProduct(req.params.id));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}