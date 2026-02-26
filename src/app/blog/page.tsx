import { Reveal } from "@/components/motion";
import Link from "next/link";
import { blogPosts } from "@/lib/blog-data";
import { ArrowRight, Clock, Tag } from "lucide-react";

export default function BlogPage() {
    return (
        <>
            <section className="relative pt-36 pb-20 md:pt-44 md:pb-28 overflow-hidden">
                <div className="spotlight" />
                <div className="max-w-[900px] mx-auto px-6">
                    <Reveal>
                        <div className="text-center mb-16">
                            <div className="section-tag mb-4">Blog</div>
                            <h1 className="text-4xl md:text-6xl font-black tracking-[-2px] leading-[1.1]">
                                Znanje za <span className="gradient-text">građevinu</span>
                            </h1>
                            <p className="text-[var(--text-muted)] mt-4 text-lg">
                                Savjeti, vodiči i best practice za digitalizaciju građevinskih tvrtki.
                            </p>
                        </div>
                    </Reveal>

                    <div className="space-y-6">
                        {blogPosts.map((post, i) => (
                            <Reveal key={post.slug} delay={i * 0.08}>
                                <Link href={`/blog/${post.slug}`} className="card-base p-6 md:p-8 block group hover:-translate-y-1 transition-all duration-300">
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className="px-2.5 py-0.5 rounded-md bg-accent/10 text-accent text-[10px] font-bold border border-accent/20 flex items-center gap-1">
                                            <Tag size={10} /> {post.category}
                                        </span>
                                        <span className="text-xs text-[var(--text-muted)] flex items-center gap-1">
                                            <Clock size={10} /> {post.readTime}
                                        </span>
                                        <span className="text-xs text-[var(--text-muted)]">{new Date(post.date).toLocaleDateString("hr-HR", { day: "numeric", month: "long", year: "numeric" })}</span>
                                    </div>
                                    <h2 className="text-xl md:text-2xl font-black mb-2 group-hover:text-accent transition-colors">{post.title}</h2>
                                    <p className="text-sm text-[var(--text-muted)] leading-relaxed">{post.excerpt}</p>
                                    <div className="mt-4 flex items-center gap-1 text-xs text-accent font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                                        Pročitaj više <ArrowRight size={12} />
                                    </div>
                                </Link>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
