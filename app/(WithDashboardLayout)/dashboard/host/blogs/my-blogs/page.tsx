"use client";

import { Motion } from "@/components/Reuseable/common/Framermotion";
import Pagination from "@/components/Reuseable/common/Pagination";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import MyBlogCard from "@/components/vendor/blog/MyBlogCard";
import MyBlogHeader from "@/components/vendor/blog/MyBlogHeader";
import MyBlogSort from "@/components/vendor/blog/MyBlogSort";
import { getVendorBlogs } from "@/Server/Vendor/blog.action";
import { Blog } from "@/types/vendor/blog";
import { useEffect, useState } from "react";

export default function MyBlogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [totalBlogs, setTotalBlogs] = useState<number>();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sort, setSort] = useState<"asc" | "desc">("desc");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        setLoading(true);

        const res = await getVendorBlogs({
          page,
          limit: 10,
          sortOrder: sort,
        });

        setTotalBlogs(res?.data?.meta?.total);

        const blogList = res?.data?.data ?? [];
        setBlogs(Array.isArray(blogList) ? blogList : []);

        setTotalPages(res?.data?.meta?.totalPage ?? 1);
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    }

    fetchBlogs();
  }, [page, sort]);

  return (
    <div className="space-y-6">
      <MyBlogHeader></MyBlogHeader>

      <Motion animationType="slideDown" delay={0.2}>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
          <div>
            <h1>
              Total Blogs:{" "}
              <span className="text-primary font-bold">{totalBlogs}</span>
            </h1>
          </div>
          <MyBlogSort
            value={sort}
            onChange={(value) => {
              setPage(1);
              setSort(value);
            }}
          />
        </div>
      </Motion>

      {loading ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="w-full">
              <CardHeader>
                <Skeleton className="" />
                <Skeleton className="" />
              </CardHeader>
              <CardContent>
                <Skeleton className="aspect-video w-full bg-muted/20 border-none" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : blogs.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog, ind) => (
            <Motion key={blog.id} animationType="slideDown" delay={ind * 0.1}>
              <MyBlogCard blog={blog} />
            </Motion>
          ))}
        </div>
      ) : (
        <div className="py-20 text-center text-muted-foreground">
          No blogs found.
        </div>
      )}

      {totalPages > 1 && (
        <Motion animationType="slideDown" delay={0.2}>
          <div className="flex justify-center pt-5">
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              setCurrentPage={setPage}
            />
          </div>
        </Motion>
      )}
    </div>
  );
}
