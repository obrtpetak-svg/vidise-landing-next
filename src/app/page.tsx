"use client";
import Image from "next/image";
import { toast } from "sonner";
import { Reveal, MagneticButton, CountUp } from "@/components/motion";
import { AiDemo } from "@/components/ai-demo";
import { FAQ } from "@/components/faq";
import { ComparisonTable } from "@/components/comparison-table";
import { LiveFeed } from "@/components/live-feed";
import { RoiCalculator } from "@/components/roi-calculator";
import { PersonaTabs } from "@/components/persona-tabs";
import { FeatureShowcase } from "@/components/feature-showcase";
import { TestimonialCarousel } from "@/components/testimonial-carousel";
import { BentoGrid } from "@/components/bento-grid";
import { HeroParticles } from "@/components/hero-particles";
import { ProductTour } from "@/components/product-tour";
import { IndustryMorph } from "@/components/industry-morph";
import {
  ArrowRight, Play, Clock, Users, Check,
  BarChart3, Zap, Lock, FileCheck, Smartphone, Shield
} from "lucide-react";


export default function Home() {
  return (
    <>
      {/* ━━━ HERO ━━━ */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="spotlight" />
        <div className="hero-glow absolute top-0 -right-40" />
        <HeroParticles />
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/[0.08] border border-accent/20 text-accent text-xs font-bold mb-8 animate-pulse">
              <Zap size={14} />
              Novo: AI Asistent & GPS Praćenje
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.95] mb-6">
              Upravljaj radnom<br />snagom <span className="gradient-text">bez kompromisa.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto mb-10 leading-relaxed">
              Evidencija sati, projekti, računi, otpremnice, GPS praćenje —{" "}
              <strong className="text-[var(--text-primary)]">sve na jednom mjestu</strong>, u realnom vremenu.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <MagneticButton>
                <a href="https://vi-di-sef.app" target="_blank" rel="noopener"
                  onClick={() => toast.success("Preusmjeravamo te na Vi-Di-Sef app...")}
                  className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white px-8 py-4 rounded-2xl text-base font-bold transition-all hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(217,93,8,0.4)]">
                  Otvorite aplikaciju
                  <ArrowRight size={18} />
                </a>
              </MagneticButton>
              <a href="#showcase"
                onClick={() => toast("Scrollamo do showcase sekcije...", { icon: "🎬" })}
                className="inline-flex items-center gap-2 px-6 py-4 rounded-2xl text-sm font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-color)] hover:border-accent/20 transition-all">
                <Play size={16} className="text-accent" />
                Pogledaj mogućnosti
              </a>
            </div>
          </Reveal>

          {/* Hero images */}
          <Reveal delay={0.4}>
            <div className="mt-16 flex justify-center gap-6">
              <div className="relative max-w-[540px] w-full">
                {/* Tablet device frame */}
                <div className="bg-[#1a1a1f] rounded-[24px] p-[10px] shadow-2xl shadow-black/60 border border-white/[0.08] hover:-translate-y-2 transition-transform duration-500">
                  {/* Camera dot */}
                  <div className="flex justify-center mb-1.5">
                    <div className="w-2 h-2 rounded-full bg-white/10" />
                  </div>
                  {/* Screen */}
                  <div className="rounded-[14px] overflow-hidden">
                    <Image src="/hero-dashboard.png" alt="Vi-Di-Sef Dashboard" width={800} height={500} className="w-full block" />
                  </div>
                  {/* Home bar */}
                  <div className="flex justify-center mt-2">
                    <div className="w-20 h-1 rounded-full bg-white/10" />
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ━━━ INDUSTRY MORPH ━━━ */}
      <section className="py-12 border-y border-[var(--border-color)] overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <IndustryMorph />
        </div>
      </section>

      {/* ━━━ STATS ━━━ */}
      <section className="py-20 bg-[var(--bg-primary)]">
        <div className="max-w-[900px] mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { val: 500, suffix: "+", label: "Registriranih radnika", icon: <Users size={20} className="text-blue-400" /> },
            { val: 12000, suffix: "+", label: "Evidentiranih sati", icon: <Clock size={20} className="text-emerald-400" /> },
            { val: 100, suffix: "%", label: "Zadovoljstvo korisnika", icon: <Zap size={20} className="text-amber-400" /> },
            { val: 75, suffix: "%", label: "Manje administracije", icon: <BarChart3 size={20} className="text-purple-400" /> },
          ].map((s, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="card-base p-5 text-center">
                <div className="flex justify-center mb-2">{s.icon}</div>
                <div className="text-3xl md:text-4xl font-black">
                  <CountUp target={s.val} suffix={s.suffix} />
                </div>
                <div className="text-xs text-[var(--text-muted)] mt-1">{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ━━━ PERSONA TABS ━━━ */}
      <PersonaTabs />

      {/* ━━━ FEATURE SHOWCASE (pinned scroll) ━━━ */}
      <div id="showcase">
        <FeatureShowcase />
      </div>

      {/* ━━━ BENTO FEATURES GRID ━━━ */}
      <BentoGrid />

      {/* ━━━ COMPARISON TABLE ━━━ */}
      <ComparisonTable />

      {/* ━━━ INTERACTIVE PRODUCT TOUR ━━━ */}
      <ProductTour />

      {/* ━━━ AI DEMO ━━━ */}
      <section id="ai" className="py-24 border-t border-[var(--border-color)]">
        <div className="max-w-[1200px] mx-auto px-6">
          <Reveal>
            <div className="text-center mb-12">
              <div className="section-tag mb-4">AI Asistent</div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight">
                Pitaj — <span className="gradient-text">ne skitaj!</span>
              </h2>
              <p className="text-[var(--text-secondary)] mt-4 max-w-lg mx-auto">
                Naš AI analizira tvoje podatke i daje konkretne odgovore — ne generičke savjete.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="flex justify-center mb-12">
              <div className="card-base card-glow p-2 max-w-[320px] w-full hover:-translate-y-2 transition-transform duration-500 rounded-2xl overflow-hidden">
                <Image src="/chatbot-screenshot.png" alt="Vi-Di-Sef AI Chatbot" width={400} height={500} className="rounded-xl w-full" />
              </div>
            </div>
          </Reveal>
          <AiDemo />
        </div>
      </section>

      {/* ━━━ LIVE ACTIVITY FEED ━━━ */}
      <LiveFeed />

      {/* ━━━ ROI CALCULATOR ━━━ */}
      <RoiCalculator />

      {/* ━━━ HOW IT WORKS ━━━ */}
      <section id="how" className="py-24 border-t border-[var(--border-color)]">
        <div className="max-w-[900px] mx-auto px-6">
          <Reveal>
            <div className="text-center mb-16">
              <div className="section-tag mb-4">4 koraka</div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight">
                Od nule do <span className="gradient-text">produktivnosti</span>
              </h2>
            </div>
          </Reveal>
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              { step: "01", icon: <Smartphone size={24} />, title: "Otvori app", desc: "Registriraj se besplatno. Nema instalacije, nema kreditne kartice." },
              { step: "02", icon: <Users size={24} />, title: "Dodaj radnike", desc: "Unesi tim — svaki radnik dobije svoj PIN pristup na mobitelu." },
              { step: "03", icon: <Clock size={24} />, title: "Evidentiraj sate", desc: "Radnici unose. Ti odobriš jednim klikom. Gotovo." },
              { step: "04", icon: <FileCheck size={24} />, title: "Generiraj izvještaje", desc: "PDF, Excel, AI analiza — sve automatski, u realnom vremenu." },
            ].map((s, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="card-base p-6 relative overflow-hidden group">
                  <div className="absolute -top-2 -right-2 text-[80px] font-black text-accent/[0.04] leading-none group-hover:text-accent/[0.08] transition-colors">{s.step}</div>
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent mb-4 icon-hover-float">{s.icon}</div>
                  <h3 className="font-bold text-lg mb-2">{s.title}</h3>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ TESTIMONIALS CAROUSEL ━━━ */}
      <TestimonialCarousel />

      {/* ━━━ SECURITY ━━━ */}
      <section className="py-24 border-t border-[var(--border-color)]">
        <div className="max-w-[900px] mx-auto px-6">
          <Reveal>
            <div className="text-center mb-12">
              <div className="section-tag mb-4">Sigurnost</div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight">
                Tvoji podaci su <span className="gradient-text">zaštićeni.</span>
              </h2>
            </div>
          </Reveal>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: <Shield size={22} />, label: "SHA-256 enkripcija" },
              { icon: <Lock size={22} />, label: "HTTPS + Rate limiting" },
              { icon: <FileCheck size={22} />, label: "Audit log svih akcija" },
              { icon: <Users size={22} />, label: "Role-based pristup" },
            ].map((s, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="card-base p-5 text-center">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 mx-auto mb-3 icon-hover-pulse">{s.icon}</div>
                  <div className="text-xs font-bold">{s.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ PRICING ━━━ */}
      <section id="cijene" className="py-24 border-t border-[var(--border-color)]">
        <div className="max-w-[1100px] mx-auto px-6">
          <Reveal>
            <div className="text-center mb-12">
              <div className="section-tag mb-4">Cijene</div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight">
                Jednostavne <span className="gradient-text">cijene</span>
              </h2>
              <p className="text-[var(--text-secondary)] mt-4 max-w-lg mx-auto">Bez skrivenih troškova. Bez ugovora.</p>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Starter", desc: "Za male ekipe i obrte", features: ["Do 10 radnika", "Evidencija sati", "3 projekta", "PDF izvještaji"], popular: false },
              { name: "Professional", desc: "Za građevinske tvrtke", features: ["Do 50 radnika", "Svi moduli", "AI Asistent", "GPS praćenje", "QR check-in"], popular: true },
              { name: "Enterprise", desc: "Za veće organizacije", features: ["Neograničeno radnika", "Svi moduli + custom", "SLA & onboarding", "Dedicated manager"], popular: false },
            ].map((plan, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className={`card-base p-6 h-full flex flex-col relative ${plan.popular ? "ring-2 ring-accent/40 shadow-xl shadow-accent/10" : ""}`}>
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-accent text-white text-[10px] font-bold shadow-lg shadow-accent/30">
                      Najpopularniji
                    </div>
                  )}
                  <h3 className="text-lg font-black mb-1">{plan.name}</h3>
                  <p className="text-xs text-[var(--text-muted)] mb-4">{plan.desc}</p>
                  <div className="text-2xl font-black mb-4">Po dogovoru</div>
                  <div className="space-y-2 flex-1 mb-6">
                    {plan.features.map((f, fi) => (
                      <div key={fi} className="flex items-center gap-2 text-sm">
                        <Check size={14} className="text-emerald-400 flex-shrink-0" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                  <a href="/kontakt"
                    className={`w-full flex items-center justify-center py-3 rounded-xl text-sm font-bold transition-all ${plan.popular
                      ? "bg-accent hover:bg-accent-hover text-white"
                      : "bg-white/[0.04] border border-[var(--border-color)] hover:border-accent/30 text-[var(--text-primary)]"
                      }`}>
                    Kontaktiraj nas
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ FAQ ━━━ */}
      <section id="faq" className="py-24 border-t border-[var(--border-color)]">
        <div className="max-w-[700px] mx-auto px-6">
          <Reveal>
            <div className="text-center mb-12">
              <div className="section-tag mb-4">FAQ</div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight">
                Česta <span className="gradient-text">pitanja</span>
              </h2>
              <p className="text-[var(--text-secondary)] mt-4">Sve što trebaš znati prije nego kreneš.</p>
            </div>
          </Reveal>
          <FAQ />
        </div>
      </section>

      {/* ━━━ CTA ━━━ */}
      <section className="py-24 border-t border-[var(--border-color)]">
        <div className="max-w-[700px] mx-auto px-6 text-center relative">
          <div className="hero-glow absolute -top-32 left-1/2 -translate-x-1/2" />
          <Reveal>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-6 relative z-10">
              Spreman za <span className="gradient-text">promjenu?</span>
            </h2>
            <p className="text-[var(--text-secondary)] mb-8 relative z-10">
              Otvorite aplikaciju. Bez kreditne kartice. Bez obveza.
            </p>
            <MagneticButton>
              <a href="https://vi-di-sef.app" target="_blank" rel="noopener"
                onClick={() => toast.success("Dobrodošao u Vi-Di-Sef! 🚀")}
                className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white px-10 py-5 rounded-2xl text-lg font-bold transition-all hover:-translate-y-1 hover:shadow-[0_16px_50px_rgba(217,93,8,0.4)] relative z-10">
                Otvori Vi-Di-Sef <ArrowRight size={20} />
              </a>
            </MagneticButton>
          </Reveal>
        </div>
      </section>
    </>
  );
}
