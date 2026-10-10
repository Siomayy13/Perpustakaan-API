import * as Customer from "../models/customerModel.js";

export async function getCustomers(req, res) {
  try {
    res.json(await Customer.getAllCustomers());
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function addCustomer(req, res) {
  try {
    const { id, name } = req.body;

    if (!id?.trim() || !name?.trim()) {
      return res.status(400).json({
        message: "ID dan nama anggota wajib diisi"
      });
    }

    res.status(201).json(
      await Customer.createCustomer({
        id: id.trim(),
        name: name.trim()
      })
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function editCustomer(req, res) {
  try {
    const { name } = req.body;

    if (!name?.trim()) {
      return res.status(400).json({
        message: "Nama anggota wajib diisi"
      });
    }

    res.json(await Customer.updateCustomer(req.params.id, {
      name: name.trim()
    }));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function removeCustomer(req, res) {
  try {
    res.json(await Customer.deleteCustomer(req.params.id));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}