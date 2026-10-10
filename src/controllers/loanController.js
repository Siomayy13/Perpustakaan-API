import * as Loan from "../models/loanModel.js";
import { isValidStatus } from "../models/categoryModel.js";

export async function getLoans(req, res) {
  try {
    const { status } = req.query;

    if (status && !isValidStatus(status)) {
      return res.status(400).json({
        message: "Status tidak valid"
      });
    }

    res.json(await Loan.getAllLoans(status));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function getLoan(req, res) {
  try {
    res.json(await Loan.getLoanById(req.params.id));
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export async function addLoan(req, res) {
  try {
    const {
      book_id, book_title, member_id, member_name,
      loan_date, due_date, return_date = null,
      status = "Dipinjam"
    } = req.body;

    if (
      !book_id || !book_title || !member_id || !member_name ||
      !loan_date || !due_date || !isValidStatus(status)
    ) {
      return res.status(400).json({
        message: "Data peminjaman belum lengkap atau status tidak valid"
      });
    }

    if (due_date < loan_date) {
      return res.status(400).json({
        message: "Tanggal jatuh tempo tidak boleh sebelum tanggal pinjam"
      });
    }

    if (status === "Dikembalikan" && !return_date) {
      return res.status(400).json({
        message: "Tanggal pengembalian wajib diisi"
      });
    }

    res.status(201).json(await Loan.createLoan({
      book_id, book_title, member_id, member_name,
      loan_date, due_date, return_date, status
    }));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function editLoan(req, res) {
  try {
    const { status, return_date, due_date } = req.body;

    if (status !== undefined && !isValidStatus(status)) {
      return res.status(400).json({ message: "Status tidak valid" });
    }

    if (
      status === "Dikembalikan" &&
      return_date === undefined
    ) {
      return res.status(400).json({
        message: "Sertakan return_date saat mengembalikan buku"
      });
    }

    res.json(await Loan.updateLoan(req.params.id, {
      ...(status !== undefined && { status }),
      ...(return_date !== undefined && { return_date }),
      ...(due_date !== undefined && { due_date })
    }));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function removeLoan(req, res) {
  try {
    res.json(await Loan.deleteLoan(req.params.id));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}