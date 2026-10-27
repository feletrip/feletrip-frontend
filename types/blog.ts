export interface IAuthor {
  id?: string;
  name?: string;
  avatar?: string;
  image?: string;
}

export interface IBlogs {
  id: string;
  title: string;
  slug: string;
  description: string;
  image: string | null;
  status: string;
  createdBy?: string;
  vendorId?: string | null;
  publishedAt?: string;
  createdAt?: string;
  updatedAt?: string;
  blogImages?: {
    id: string;
    image: string;
  }[];

  author?: IAuthor;
  authorName?: string;
  avatar?: string;
}
