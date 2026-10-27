"use client";

import { useState } from "react";
import BlogBanner from "./BlogBanner";
import BlogContent from "./blogContent";
import BlogSearch from "./BlogSearch";
import Pagination from "../../../../components/Reuseable/common/Pagination";
import { Container } from "../../../../components/PublicLayout/Shared/Container";
import { IBlogs } from "@/types/blog";
import Image from "next/image";
import Link from "next/link";

interface BlogWrapperProps {
  blogs: IBlogs[];
}

export default function BlogWrapper(blogs: BlogWrapperProps) {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  // Filter blogs
  const filteredBlogs = blogs.blogs.filter((blog) =>
    blog.title.toLowerCase().includes(query.toLowerCase())
  );

  // Pagination logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredBlogs.length / postsPerPage);

  return (
    <div className="mx-auto pb-8 space-y-5">
      {/* Banner */}
      <BlogBanner/>

      {/* Main Layout */}
      <Container>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* LEFT COLUMN */}
          <div className="flex min-h-full flex-col lg:col-span-8">
            <div className="mb-6 lg:hidden">
              <BlogSearch query={query} setQuery={setQuery} tag={tag} setTag={setTag} />
            </div>

            <div className="grow">
              <BlogContent blogs={currentBlogs} />
            </div>

            {filteredBlogs.length > 0 && (
              <div className="mt-auto pt-10">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  setCurrentPage={setCurrentPage}
                />
              </div>
            )}
          </div>

          {/* RIGHT SIDEBAR */}
          <aside className="lg:sticky lg:top-24 lg:col-span-4 lg:self-start">
            <div className="flex flex-col gap-8">
              {/* Search Desktop */}
              <div className="hidden lg:block">
                <BlogSearch query={query} setQuery={setQuery} tag={tag} setTag={setTag} />
              </div>

              {/* Recent Stories */}
              {blogs.blogs.length > 0 && (
                <div className="rounded-2xl bg-background p-6">
                  <span
                    className="mb-5 block text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
                    Recent Stories
                  </span>
                  <div className="flex flex-col gap-5">
                    {blogs.blogs.slice(0, 4).map((blog) => (
                      <Link
                        key={blog.slug}
                        href={`/blogs/${blog.slug}`}
                        className="group flex items-center gap-3"
                      >
                        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-[#16343A]">
                          {blog.image && (
                            <Image
                              src={blog.image}
                              alt={blog.title}
                              fill
                              unoptimized
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          )}
                        </div>
                        <h4
                          className="line-clamp-2 text-sm leading-snug text-muted-foreground transition-colors group-hover:text-primary"
                        >
                          {blog.title}
                        </h4>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>
      </Container>
    </div>
  );
}
