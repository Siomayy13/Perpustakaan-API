export const loanStatuses = [
  "Dipinjam",
  "Dikembalikan",
  "Terlambat"
];

export function isValidStatus(status) {
  return loanStatuses.includes(status);
}