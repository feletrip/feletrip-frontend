import { IBlogs } from "@/types/blog";
import BlogCard from "./BlogCard";


export default function BlogContent({ blogs }: { blogs: IBlogs[] }) {
  if (blogs.length === 0) {
    return (
      <div className="text-center py-30">
        <h3 className="text-xl font-semibold text-accent-foreground mb-2">
          No Blogs Found
        </h3>
        <p className="text-accent-foreground">
          Try adjusting your search or filter to find what you&apos;re looking for.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 my-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {blogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </div> 
  );
}