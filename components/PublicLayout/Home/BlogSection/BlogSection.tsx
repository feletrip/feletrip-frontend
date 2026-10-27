import SectionTitle from "../../Typography";
import { Container } from "../../Shared/Container";
import BlogCard from "./BlogPostCard";
import { getBlogs } from "@/Server/Blogs/blogs.service";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import AnimatedArrow from "../TrendingHotels/AnimatedArrow";

export default async function BlogSection() {
  const blogs = await getBlogs();

  const postsToShow = blogs.slice(0, 3);

  if (!postsToShow.length) {
    return null;
  }

  return (
    <section className="py-16">
      <Container>
        {/* Section Title */}
        <SectionTitle
          title="NEWS & BLOG"
          subtitle="Discover the latest updates and insights from our hotel"
          className="text-center mb-12"
          divClassName="justify-center"
          subtitleClassName="max-w-3xl mx-auto"
        />

        {/* Blog Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {postsToShow.map((post, idx) => (
            <BlogCard key={post.id} post={post} idx={idx} />
          ))}
        </div>

        {/* View All Blogs Button */}
        <Link href="/blogs" className="flex justify-center mt-12">
          <Button size={"lg"}>
            <span>View All Blogs</span>
            <AnimatedArrow />
          </Button>
        </Link>
      </Container>
    </section>
  );
}
