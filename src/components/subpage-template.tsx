"use client";
import Link from "next/link";
import { Reveal, MagneticButton } from "./motion";
import { BreadcrumbJsonLd } from "./json-ld";

interface SubpageProps {
    icon: string;
    title: string;
    heroTitle: string;
    heroHighlight: string;
    subtitle: string;
    howTitle: string;
    howDesc: string;
    checks: string[];
    benefits: { icon: string; title: string; desc: string }[];
    ctaTitle: string;
    ctaDesc: string;
}

export function SubpageTemplate(props: SubpageProps) {
    const slug = props.title.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "i");
    return (
        <>
            <BreadcrumbJsonLd pageName={props.title} pageUrl={`/${slug}`} />
            <section className="relative pt-36 pb-20 md:pt-44 md:pb-28 overflow-hidden">
                <div className="spotlight" />
                <div className="max-w-[1200px] mx-auto px-6">
                    <Reveal>
                        <div className="flex items-center gap-2 text-sm text-slate-500 mb-8">
                            <Link href="/" className="hover:text-accent transition-colors">Početna</Link>
                            <span>›</span>
                            <Link href="/#features" className="hover:text-accent transition-colors">Mogućnosti</Link>
                            <span>›</span>
                            <span className="text-accent">{props.title}</span>
                        </div>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center text-3xl">{props.icon}</div>
                            <h1 className="text-4xl md:text-6xl font-black tracking-[-2px] leading-[1.1]">
                                {props.heroTitle}<br /><span className="gradient-text">{props.heroHighlight}</span>
                            </h1>
                        </div>
                        <p className="text-lg text-slate-400 leading-relaxed max-w-2xl">{props.subtitle}</p>
                    </Reveal>
                </div>
            </section>

            {/* How it works */}
            <section className="py-20">
                <div className="max-w-[1200px] mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-16 items-start">
                        <Reveal>
                            <div className="section-tag mb-4">Kako funkcionira</div>
                            <h2 className="text-3xl md:text-4xl font-black tracking-tight leading-tight mb-4">{props.howTitle}</h2>
                            <p className="text-slate-400 leading-relaxed mb-8">{props.howDesc}</p>
                            <ul className="space-y-3">
                                {props.checks.map((c, i) => (
                                    <li key={i} className="flex items-start gap-3 text-slate-400 text-sm">
                                        <span className="w-6 h-6 rounded-md bg-accent/15 flex items-center justify-center text-accent text-xs flex-shrink-0 mt-0.5">✓</span>
                                        {c}
                                    </li>
                                ))}
                            </ul>
                        </Reveal>
                        <Reveal delay={0.15}>
                            <div className="grid gap-4">
                                {props.benefits.map((b, i) => (
                                    <div key={i} className="card-base p-5 flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-xl flex-shrink-0">{b.icon}</div>
                                        <div>
                                            <div className="font-bold text-sm mb-1">{b.title}</div>
                                            <div className="text-xs text-slate-500 leading-relaxed">{b.desc}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 border-t border-white/[0.04]">
                <div className="max-w-[700px] mx-auto px-6">
                    <Reveal>
                        <div className="card-base p-12 text-center relative overflow-hidden">
                            <div className="hero-glow absolute -top-20 left-1/2 -translate-x-1/2 w-[400px] h-[300px]" />
                            <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4 relative whitespace-pre-line">{props.ctaTitle}</h2>
                            <p className="text-slate-400 mb-8 relative">{props.ctaDesc}</p>
                            <MagneticButton>
                                <a href="https://vi-di-sef.app" target="_blank" rel="noopener"
                                    className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white px-10 py-4 rounded-2xl text-lg font-bold transition-all hover:shadow-[0_12px_40px_rgba(217,93,8,0.4)] relative">
                                    Započni besplatno →
                                </a>
                            </MagneticButton>
                            <div className="mt-5 text-sm text-slate-600 relative">
                                <a href="https://www.vi-di.me" className="text-accent font-semibold hover:underline">www.vi-di.me</a>
                                &nbsp;•&nbsp; info@vi-di.me
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>
        </>
    );
}
