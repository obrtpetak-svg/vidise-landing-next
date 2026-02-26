import { blogPosts } from "@/lib/blog-data";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/motion";
import { BreadcrumbJsonLd } from "@/components/json-ld";
import Link from "next/link";
import { ArrowLeft, Clock, Tag, Share2 } from "lucide-react";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
    return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = blogPosts.find(p => p.slug === slug);
    if (!post) return {};
    return {
        title: post.title,
        description: post.excerpt,
        openGraph: {
            title: post.title,
            description: post.excerpt,
            type: "article",
            publishedTime: post.date,
        },
    };
}

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params;
    const post = blogPosts.find(p => p.slug === slug);
    if (!post) notFound();

    const articleSchema = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": post.title,
        "description": post.excerpt,
        "datePublished": post.date,
        "author": { "@type": "Organization", "name": "Vi-Di-Sef" },
        "publisher": { "@type": "Organization", "name": "Vi-Di-Sef", "logo": { "@type": "ImageObject", "url": "https://vi-di-sef.com/logo.png" } },
    };

    // Simple markdown-like renderer for headings/paragraphs/lists/blockquotes
    const renderContent = (content: string) => {
        return content.split("\n\n").map((block, i) => {
            const trimmed = block.trim();
            if (trimmed.startsWith("## ")) {
                return <h2 key={i} className="text-2xl font-black mt-10 mb-4">{trimmed.slice(3)}</h2>;
            }
            if (trimmed.startsWith("### ")) {
                return <h3 key={i} className="text-lg font-bold mt-8 mb-3">{trimmed.slice(4)}</h3>;
            }
            if (trimmed.startsWith("> ")) {
                return (
                    <blockquote key={i} className="border-l-4 border-accent/40 pl-4 py-2 my-6 text-[var(--text-secondary)] italic">
                        {trimmed.slice(2)}
                    </blockquote>
                );
            }
            if (trimmed.startsWith("- ")) {
                const items = trimmed.split("\n").filter(l => l.startsWith("- "));
                return (
                    <ul key={i} className="space-y-2 my-4">
                        {items.map((item, j) => (
                            <li key={j} className="flex items-start gap-2 text-[var(--text-secondary)] text-sm leading-relaxed">
                                <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                                {item.slice(2).replace(/\*\*(.*?)\*\*/g, "$1")}
                            </li>
                        ))}
                    </ul>
                );
            }
            if (/^\d+\./.test(trimmed)) {
                const items = trimmed.split("\n").filter(l => /^\d+\./.test(l.trim()));
                return (
                    <ol key={i} className="space-y-2 my-4 list-decimal list-inside">
                        {items.map((item, j) => (
                            <li key={j} className="text-[var(--text-secondary)] text-sm leading-relaxed">
                                {item.replace(/^\d+\.\s*/, "").replace(/\*\*(.*?)\*\*/g, "$1")}
                            </li>
                        ))}
                    </ol>
                );
            }
            return <p key={i} className="text-[var(--text-secondary)] text-sm leading-relaxed my-4">{trimmed}</p>;
        });
    };

    return (
        <>
            <BreadcrumbJsonLd pageName={post.title} pageUrl={`/blog/${post.slug}`} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

            <section className="relative pt-36 pb-20 md:pt-44 md:pb-28 overflow-hidden">
                <div className="spotlight" />
                <div className="max-w-[700px] mx-auto px-6">
                    <Reveal>
                        <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-accent transition-colors mb-8">
                            <ArrowLeft size={14} /> Svi članci
                        </Link>
                        <div className="flex items-center gap-3 mb-5">
                            <span className="px-2.5 py-0.5 rounded-md bg-accent/10 text-accent text-[10px] font-bold border border-accent/20 flex items-center gap-1">
                                <Tag size={10} /> {post.category}
                            </span>
                            <span className="text-xs text-[var(--text-muted)] flex items-center gap-1">
                                <Clock size={10} /> {post.readTime}
                            </span>
                            <span className="text-xs text-[var(--text-muted)]">{new Date(post.date).toLocaleDateString("hr-HR", { day: "numeric", month: "long", year: "numeric" })}</span>
                        </div>
                        <h1 className="text-3xl md:text-5xl font-black tracking-[-1px] leading-[1.15] mb-6">{post.title}</h1>
                        <p className="text-lg text-[var(--text-muted)] leading-relaxed mb-10">{post.excerpt}</p>
                    </Reveal>

                    <Reveal delay={0.1}>
                        <article className="card-base p-8 md:p-10">
                            {renderContent(post.content)}
                        </article>
                    </Reveal>

                    <Reveal delay={0.2}>
                        <div className="mt-10 card-base p-8 text-center relative overflow-hidden">
                            <div className="hero-glow absolute -top-20 left-1/2 -translate-x-1/2 w-[400px] h-[300px]" />
                            <h3 className="text-xl font-black mb-2 relative">Želite isprobati Vi-Di-Sef?</h3>
                            <p className="text-sm text-[var(--text-muted)] mb-5 relative">14 dana besplatno. Bez kreditne kartice.</p>
                            <a href="https://vi-di-sef.app" target="_blank" rel="noopener"
                                className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white px-8 py-3.5 rounded-xl font-bold transition-all hover:shadow-lg hover:shadow-accent/20 relative">
                                Započni besplatno →
                            </a>
                        </div>
                    </Reveal>
                </div>
            </section>
        </>
    );
}
