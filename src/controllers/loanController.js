
import { LoanModel } from "../models/loanModel.js";

const validStatuses = [
  "Dipinjam",
  "Dikembalikan",
  "Terlambat"
];

const allowedFields = [
  "book_id",
  "book_title",
  "member_id",
  "member_name",
  "loan_date",
  "due_date",
  "return_date",
  "status"
];

const requiredFields = [
  "book_id",
  "book_title",
  "member_id",
  "member_name",
  "loan_date",
  "due_date",
  "status"
];

function getPayload(body, isUpdate = false) {
  const payload = {};

  for (const field of allowedFields) {
    if (Object.hasOwn(body, field)) {
      payload[field] = body[field];
    }
  }

  if (!isUpdate) {
    for (const field of requiredFields) {
      if (
        payload[field] === undefined ||
        payload[field] === null ||
        payload[field] === ""
      ) {
        throw new Error(`Field ${field} wajib diisi`);
      }
    }
  }

  if (
    payload.status !== undefined &&
    !validStatuses.includes(payload.status)
  ) {
    throw new Error("Status peminjaman tidak valid");
  }

  return payload;
}

function sendError(res, err) {
  const message = err.message || "Terjadi kesalahan";

  if (
    message.includes("PGRST116") ||
    message.includes("0 rows")
  ) {
    return res.status(404).json({ error: "Data tidak ditemukan" });
  }

  return res.status(400).json({ error: message });
}

export const LoanController = {
  async getAll(req, res) {
    try {
      const { status } = req.query;

      if (status && !validStatuses.includes(status)) {
        return res.status(400).json({
          error: "Status harus Dipinjam, Dikembalikan, atau Terlambat"
        });
      }

      const loans = await LoanModel.getAll(status);
      return res.json(loans);
    } catch (err) {
      return sendError(res, err);
    }
  },

  async getById(req, res) {
    try {
      const loan = await LoanModel.getById(req.params.id);
      return res.json(loan);
    } catch (err) {
      return sendError(res, err);
    }
  },

  async create(req, res) {
    try {
      const payload = getPayload(req.body);
      const loan = await LoanModel.create(payload);
      return res.status(201).json(loan);
    } catch (err) {
      return sendError(res, err);
    }
  },

  async update(req, res) {
    try {
      const payload = getPayload(req.body, true);

      if (Object.keys(payload).length === 0) {
        return res.status(400).json({
          error: "Minimal satu field harus diisi untuk diubah"
        });
      }

      const loan = await LoanModel.update(
        req.params.id,
        payload
      );

      return res.json(loan);
    } catch (err) {
      return sendError(res, err);
    }
  },

  async remove(req, res) {
    try {
      const result = await LoanModel.remove(req.params.id);
      return res.json(result);
    } catch (err) {
      return sendError(res, err);
    }
  }
};
