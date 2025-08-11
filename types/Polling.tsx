


export type PollType = "single" | "multiple" | "scale";


export type Poll = {
  id: string;
  title: string;
  description?: string;
  type: PollType;
  options: string[];
  allow_view?: boolean;
  link_code: string;
  expire_at?: string | null;
  created_at?: string;
};