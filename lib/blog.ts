// import { travelBlogs } from "@/data/blogs";
// import { Blog } from "@/types/blog";

// export const getAllBlogs = (): Blog[] => {
//   return travelBlogs;
// };

// export const getBlogBySlug = (slug: string) => {
//   if (!slug) return undefined;

//   return travelBlogs.find(
//     (blog) => blog.slug?.toLowerCase() === slug.toLowerCase()
//   );
// };

// export const getRelatedBlogs = (slug: string) => {
//   if (!slug) return [];

//   return travelBlogs.filter(
//     (blog) => blog.slug?.toLowerCase() !== slug.toLowerCase()
//   );
// };