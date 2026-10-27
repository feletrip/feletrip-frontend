// "use client";

// import { useState, useEffect, JSX } from "react";
// import BlogCard from "./BlogCard";
// import { Blog } from "@/types/blog";
// import { travelBlogs } from "@/data/blogs";

// interface RelatedBlogSidebarProps {
//   blogs: Blog[];
// }

// export default function RelatedBlogSidebar({
//   blogs,
// }: RelatedBlogSidebarProps): JSX.Element {
//   const [currentGroupIndex, setCurrentGroupIndex] = useState<number>(0);

//   const cardsPerGroup = 3;
//   const cycleInterval = 6000;

//   const totalGroups = Math.ceil(blogs.length / cardsPerGroup);

//   useEffect(() => {
//     if (!travelBlogs || travelBlogs.length <= cardsPerGroup) return;

//     const intervalId = setInterval(() => {
//       setCurrentGroupIndex((prevIndex) => (prevIndex + 1) % totalGroups);
//     }, cycleInterval);

//     return () => clearInterval(intervalId);
//   }, [blogs, totalGroups]);

//   if (!travelBlogs || travelBlogs.length === 0) {
//     return <div className="text-gray-500">No related posts.</div>;
//   }

//   const startIndex = currentGroupIndex * cardsPerGroup;
//   const endIndex = startIndex + cardsPerGroup;
//   const blogsToDisplay = travelBlogs.slice(startIndex, endIndex);

//   return (
//     <div className="space-y-4">
//       <div className="grid grid-cols-1 gap-4">
//         {blogsToDisplay.map((blog: Blog) => (
//           <BlogCard key={blog._id} blog={blog} />
//         ))}
//       </div>
//     </div>
//   );
// }