import { supabase } from "../config/supabaseClient.js";

export async function getAllLoans(status) {
  let query = supabase
    .from("loans")
    .select("*")
    .order("created_at", { ascending: false });

  if (status) query = query.eq("status", status);

  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function getLoanById(id) {
  const { data, error } = await supabase
    .from("loans")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;
  if (!data) throw new Error("Transaksi tidak ditemukan");
  return data;
}

export async function createLoan(loan) {
  const { data, error } = await supabase
    .from("loans")
    .insert([loan])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateLoan(id, loan) {
  const { data, error } = await supabase
    .from("loans")
    .update(loan)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteLoan(id) {
  const { data, error } = await supabase
    .from("loans")
    .delete()
    .eq("id", id)
    .select()
    .maybeSingle();

  if (error) throw error;
  if (!data) throw new Error("Transaksi tidak ditemukan");
  return data;
}