import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getBlogBySlug } from "@/Server/Blogs/blogs.service";
import { Container } from "@/components/PublicLayout/Shared/Container";

interface BlogDetailsPageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogDetailsPageProps) {
    const { slug } = await params;
    const blog = await getBlogBySlug(slug);

    if (!blog) {
        return { title: "Blog not found" };
    }

    return {
        title: blog.title,
        description: blog.description,
        openGraph: {
            title: blog.title,
            description: blog.description,
            images: blog.image ? [blog.image] : [],
        },
    };
}

function formatPostmark(dateString?: string | null) {
    if (!dateString) return { day: "—", month: "TBD", year: "" };
    const date = new Date(dateString);
    return {
        day: date.getDate().toString().padStart(2, "0"),
        month: date.toLocaleString("en-US", { month: "short" }).toUpperCase(),
        year: date.getFullYear().toString(),
    };
}

export default async function BlogDetailsPage({ params }: BlogDetailsPageProps) {
    const { slug } = await params;
    const blog = await getBlogBySlug(slug);

    if (!blog) {
        notFound();
    }

    const { day, month, year } = formatPostmark(blog.publishedAt);

    return (
        <main className="min-h-screen bg-background py-16">
            {/* Hero */}
            <header className="relative h-[60vh] min-h-100 w-full overflow-hidden bg-[#16343A]">
                {blog.image && (
                    <Image
                        src={blog.image}
                        alt={blog.title}
                        fill
                        priority
                        unoptimized
                        className="object-cover"
                        sizes="100vw"
                    />
                )}
                <div className="absolute inset-0 bg-linear-to-t from-[#16343A] via-[#16343A]/50 to-[#16343A]/20" />

                <Container>
                    <div className="relative z-10 pt-8">
                        <Link
                            href="/blogs"
                            className="inline-flex items-center gap-2 text-sm text-primary/80 transition-colors hover:text-primary"
                        >
                            ← Back to stories
                        </Link>
                    </div>
                </Container>

                {/* Postmark */}
                <div className="absolute right-6 top-6 flex h-16 w-16 -rotate-6 flex-col items-center justify-center rounded-full border-2 border-dashed border-white/80 bg-[#16343A]/40 backdrop-blur-sm md:right-10 md:top-10">
                    <span
                        className="text-xl font-semibold leading-none text-white">
                        {day}
                    </span>
                    <span
                        className="mt-0.5 text-[9px] tracking-[0.15em] text-white/80">
                        {month} {year}
                    </span>
                </div>

                <Container>
                    <div className="absolute bottom-10 left-0 right-0 z-10 max-w-7xl mx-auto">
                        <span
                            className="mb-4 inline-block text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
                            Destination Guide
                        </span>
                        <h1
                            className="max-w-4xl text-4xl leading-tight text-white md:text-6xl">
                            {blog.title}
                        </h1>
                    </div>
                </Container>
            </header>

            {/* Content */}
            <Container>
                <article className="mx-auto max-w-3xl px-4 py-16">
                    {/* Perforated divider under hero */}
                    <div className="relative mb-10">
                        <div className="absolute -left-1 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-primary" />
                        <div className="absolute -right-1 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-primary" />
                        <div className="border-t-2 border-dashed border-primary/50" />
                    </div>

                    {/* Lead description */}
                    <p
                        className="mb-10 text-xl leading-relaxed text-primary/80">
                        {blog.description}
                    </p>

                    {"content" in blog && (blog as { content?: string }).content && (
                        <div
                            className="prose prose-lg max-w-none text-muted-foreground"
                            dangerouslySetInnerHTML={{
                                __html: (blog as { content?: string }).content as string,
                            }}
                        />
                    )}

                    {/* Gallery */}
                    {blog.blogImages && blog.blogImages.length > 0 && (
                        <section className="mt-16">
                            <span
                                className="mb-4 block text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground"
                                style={{ fontFamily: "'Jost', sans-serif" }}
                            >
                                More from this story __
                            </span>
                            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                                {blog.blogImages.map((img) => (
                                    <div
                                        key={img.id}
                                        className="relative aspect-square overflow-hidden rounded-xl bg-[#16343A]"
                                    >
                                        <Image
                                            src={img.image}
                                            alt={blog.title}
                                            fill
                                            unoptimized
                                            className="object-cover transition-transform duration-500 hover:scale-105"
                                            sizes="(max-width: 768px) 50vw, 33vw"
                                        />
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </article>
            </Container>
        </main>
    );
}