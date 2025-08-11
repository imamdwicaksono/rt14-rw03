import { supabase } from "@/lib/supabase";

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { linkCode, answer, userToken } = req.body;

  // Ambil polling
  const { data: poll } = await supabase
    .from("polls")
    .select("*")
    .eq("link_code", linkCode)
    .single();

  if (!poll) return res.status(404).json({ error: "Polling tidak ditemukan" });

  // Cek apakah user sudah vote
  const { count } = await supabase
    .from("votes")
    .select("*", { count: "exact", head: true })
    .eq("poll_id", poll.id)
    .eq("user_token", userToken);

  if ((count ?? 0) > 0) return res.status(400).json({ error: "Sudah pernah vote" });

  // Simpan vote
  const { error } = await supabase
    .from("votes")
    .insert({ poll_id: poll.id, answer, user_token: userToken });

  if (error) return res.status(400).json({ error });
  res.status(200).json({ message: "Vote berhasil" });
}
