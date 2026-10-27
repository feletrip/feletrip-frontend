export interface ICategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  backgroundImage?: string | null;
  icon?: string | null;
  _count?: {
    hotels?: number;
  };
}
