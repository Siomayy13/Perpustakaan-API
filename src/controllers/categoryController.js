import { loanStatuses } from "../models/categoryModel.js";
import { getAllLoans } from "../models/loanModel.js";

export function getCategories(req, res) {
  res.json(loanStatuses);
}

export async function getLoansByCategory(req, res) {
  try {
    const { status } = req.params;

    if (!loanStatuses.includes(status)) {
      return res.status(400).json({
        message: "Status tidak valid",
        availableStatuses: loanStatuses
      });
    }

    res.json(await getAllLoans(status));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}