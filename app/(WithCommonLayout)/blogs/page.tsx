import BlogWrapper from "@/app/(WithCommonLayout)/blogs/_components/BlogWrapper";
import { getBlogs } from "@/Server/Blogs/blogs.service";

export default async function BlogsPage() {
  const blogs = await getBlogs();
  return (
    <main className="min-h-auto">
      <BlogWrapper blogs={blogs} />
    </main>
  );
} 