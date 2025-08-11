import { supabase } from "@/lib/supabase";

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { title, description, type, options, allowView, expireAt } = req.body;

  const linkCode = Math.random().toString(36).substring(2, 8); // kode random 6 char

  const { data, error } = await supabase
    .from("polls")
    .insert({
      title,
      description,
      type,
      options,
      allow_view: allowView,
      link_code: linkCode,
      expire_at: expireAt,
    })
    .select()
    .single();

  if (error) return res.status(400).json({ error });
  res.status(200).json({ link: `/poll/${linkCode}`, poll: data });
}
