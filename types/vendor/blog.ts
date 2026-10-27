import z from "zod";

export const MAX_GALLERY_IMAGES = 20;

export const createBlogFormSchema = (hasExistingImage: boolean) =>
  z.object({
    title: z.string().min(5, "Title must be at least 5 characters"),
    slug: z.string().min(3, "Slug is required"),
    description: z
      .string()
      .min(20, "Description must be at least 20 characters"),
    image: z
      .any()
      .refine(
        (files) => hasExistingImage || (files && files.length === 1),
        "Thumbnail image is required",
      ),
    images: z
      .any()
      .optional()
      .refine(
        (files) => !files || files.length <= MAX_GALLERY_IMAGES,
        `You can upload a maximum of ${MAX_GALLERY_IMAGES} gallery images`,
      ),
  });

export type BlogFormValues = z.infer<ReturnType<typeof createBlogFormSchema>>;

export const GALLERY_IMAGE_LIMIT = MAX_GALLERY_IMAGES;

export interface BlogImage {
  id: string;
  image: string;
}

export interface Blog {
  id: string;
  title: string;
  slug: string;
  description: string;
  image: string;
  status: string;
  createdBy: string;
  vendorId: string;
  publishedAt: string | undefined;
  createdAt: string;
  updatedAt: string;
  blogImages: BlogImage[];
}

export interface BlogMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

export interface MyBlogResponse {
  success: boolean;
  message: string;
  data: {
    statusCode: number;
    message: string;
    meta: BlogMeta;
    data: Blog[];
  };
}

export interface BlogDetailsResponse {
  success: boolean;
  message: string;
  data: Blog;
}

export interface DeleteApiResponse<T = null> {
  success: boolean;
  message: string;
  data: T;
}
