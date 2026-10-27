"use client";

import {
  getAllPendingBlogs,
  ApproveBlog,
  RejectBlog,
} from "@/Server/Admin/blogs.admin";
import { useState, useEffect, useRef } from "react";
import BlogsTable from "./components/BlogsTable";
import StatsCard from "@/components/Reuseable/admin/DashboardStatsCard";
import { Clock, FileText, Check, AlertCircle } from "lucide-react";

type Blog = {
  id: string;
  title: string;
  slug: string;
  description: string;
  status: "published" | "pending" | "rejected";
  createdBy: string;
  vendorId: string | null;
  publishedAt: string;
};

const Page = () => {
  const [loading, setLoading] = useState(false);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const hasFetched = useRef(false);

  const fetchPendingBlogs = async () => {
    try {
      setLoading(true);
      const res = await getAllPendingBlogs();
      const data = res?.data?.data || [];
      setBlogs(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: string) => {
    try {
      const res = await ApproveBlog(id);
      if (res.success) {
        fetchPendingBlogs();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleReject = async (id: string) => {
    try {
      const res = await RejectBlog(id);
      if (res.success) {
        fetchPendingBlogs();
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true;
      fetchPendingBlogs();
    }
  }, []);

  const totalPending = blogs.filter((b) => b.status === "pending").length;
  const published = blogs.filter((b) => b.status === "published").length;
  const rejected = blogs.filter((b) => b.status === "rejected").length;
  const total = blogs.length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-primary/5 via-primary/10 to-primary/5 p-8 border border-primary/20">
        <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent" />
        <div className="relative">
          <div className="space-y-2">
            <h1 className="text-5xl font-bold bg-linear-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
              Pending Blogs
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Manage and moderate blog submissions with ease
            </p>
          </div>
        </div>
      </div>

      {/* Analytics Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Total Reviews"
            subtitle="Summary"
            value={total}
            animationIndex={0}
            icon={FileText}
            bgGlow="from-blue-500/25 via-blue-500/5 to-transparent"
            iconStyle="bg-blue-500 text-white"
          />

          <StatsCard
            title="Published Blogs"
            subtitle="Approved"
            value={published}
            animationIndex={1}
            icon={Check}
            bgGlow="from-emerald-500/25 via-emerald-500/5 to-transparent"
            iconStyle="bg-emerald-500 text-white"
          />

          <StatsCard
            title="Waiting For Approval"
            subtitle="Pending"
            value={totalPending}
            animationIndex={2}
            icon={Clock}
            bgGlow="from-amber-500/25 via-amber-500/5 to-transparent"
            iconStyle="bg-amber-500 text-white"
          />

          <StatsCard
            title="Rejected Blogs"
            subtitle="Declined"
            value={rejected}
            animationIndex={3}
            icon={AlertCircle}
            bgGlow="from-rose-500/25 via-rose-500/5 to-transparent"
            iconStyle="bg-rose-500 text-white"
          />
        </div>

      {/* Table */}
      <BlogsTable
        blogs={blogs}
        loading={loading}
        onApprove={handleApprove}
        onReject={handleReject}
      />
    </div>
  );
};

export default Page;
