export interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  is_archived: boolean;
  created_at: Date;
  updated_at: Date;
}
