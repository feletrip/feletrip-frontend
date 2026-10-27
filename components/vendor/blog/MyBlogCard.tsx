import { Blog } from "@/types/vendor/blog";
import Image from "next/image";
import { BlogDetails } from "./BlogDetails";
import { DeleteBlog } from "./DeleteBlog";
import { EditBlogPage } from "./EditBlogPage";

interface Props {
  blog: Blog;
}

const blogStatus: Record<string, string> = {
  published: "capitalize text-muted bg-success border border-success",
  pending: "capitalize text-muted bg-warning border border-warning",
  rejected: "capitalize text-muted bg-destructive border border-destructive",
  default: "capitalize text-muted bg-primary border border-primary",
};

export default function MyBlogCard({ blog }: Props) {
  return (
    <div className="group flex flex-col justify-between h-full overflow-hidden rounded-3xl border bg-card shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div>
        <div className="relative h-56">
          <Image
            src={blog?.image}
            alt={blog?.title}
            loading="eager"
            fill
            className="object-cover transition duration-500 group-hover:scale-105 "
          />

          <div
            className={`absolute right-3 top-3 rounded-full px-3 py-1 text-xs ${blogStatus[blog?.status] ?? blogStatus.default}`}
          >
            {blog?.status}
          </div>
        </div>

        <div className="p-5">
          <h2 className="line-clamp-2 text-xl font-bold">{blog?.title}</h2>

          <p className="mt-3 line-clamp-3 text-sm text-muted-foreground">
            {blog?.description}
          </p>

          <div className="mt-5 flex justify-between text-xs text-muted-foreground">
            <span>{new Date(blog?.createdAt).toLocaleDateString()}</span>

            <span>{blog?.blogImages.length} Images</span>
          </div>
        </div>
      </div>
      <div className="p-5 flex flex-wrap items-center gap-2  w-full">
        <BlogDetails slug={blog?.slug}></BlogDetails>
        <EditBlogPage blog={blog}></EditBlogPage>
        <DeleteBlog blogTitle={blog?.title} id={blog?.id}></DeleteBlog>
      </div>
    </div>
  );
}
