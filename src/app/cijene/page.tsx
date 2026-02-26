"use client";
import { Reveal, MagneticButton } from "@/components/motion";
import { Check, Sparkles, Zap, Crown } from "lucide-react";

const plans = [
    {
        name: "Starter",
        icon: <Zap size={22} />,
        desc: "Za male ekipe i obrte",
        features: [
            "Do 10 radnika",
            "Evidencija radnog vremena",
            "3 projekta",
            "PDF izvještaji",
            "Email podrška",
        ],
        missing: ["AI Asistent", "GPS praćenje", "QR check-in", "Prioritetna podrška"],
        cta: "Kontaktiraj nas",
        popular: false,
    },
    {
        name: "Professional",
        icon: <Sparkles size={22} />,
        desc: "Za građevinske tvrtke",
        features: [
            "Do 50 radnika",
            "Svi moduli uključeni",
            "Neograničeni projekti",
            "PDF + Excel izvještaji",
            "AI Asistent",
            "GPS praćenje",
            "QR check-in",
            "Prioritetna podrška",
        ],
        missing: ["Dedicated account manager", "Custom integracije"],
        cta: "Kontaktiraj nas",
        popular: true,
    },
    {
        name: "Enterprise",
        icon: <Crown size={22} />,
        desc: "Za veće organizacije",
        features: [
            "Neograničeno radnika",
            "Svi moduli + custom",
            "Neograničeni projekti",
            "Svi izvještaji",
            "AI Asistent Pro",
            "GPS praćenje",
            "QR check-in",
            "Dedicated account manager",
            "Custom integracije",
            "SLA & onboarding",
        ],
        missing: [],
        cta: "Kontaktiraj nas",
        popular: false,
    },
];

export default function CijenePage() {
    return (
        <>
            <section className="relative pt-36 pb-20 md:pt-44 md:pb-28 overflow-hidden">
                <div className="spotlight" />
                <div className="max-w-[1200px] mx-auto px-6">
                    <Reveal>
                        <div className="text-center mb-16">
                            <div className="section-tag mb-4">Cijene</div>
                            <h1 className="text-4xl md:text-6xl font-black tracking-[-2px] leading-[1.1]">
                                Jednostavne <span className="gradient-text">cijene</span>
                            </h1>
                            <p className="text-[var(--text-muted)] mt-4 text-lg max-w-lg mx-auto">
                                Bez skrivenih troškova. Bez ugovora. Otkaži kad hoćeš.
                            </p>
                        </div>
                    </Reveal>

                    {/* Plans */}
                    <div className="grid md:grid-cols-3 gap-6">
                        {plans.map((plan, i) => (
                            <Reveal key={i} delay={i * 0.1}>
                                <div className={`card-base p-8 h-full flex flex-col relative ${plan.popular ? "ring-2 ring-accent/40 shadow-2xl shadow-accent/10" : ""}`}>
                                    {plan.popular && (
                                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-accent text-white text-xs font-bold shadow-lg shadow-accent/30">
                                            Najpopularniji ⭐
                                        </div>
                                    )}
                                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent mb-4">
                                        {plan.icon}
                                    </div>
                                    <h3 className="text-xl font-black mb-1">{plan.name}</h3>
                                    <p className="text-sm text-[var(--text-muted)] mb-6">{plan.desc}</p>
                                    <div className="mb-6">
                                        <div className="text-2xl font-black">Po dogovoru</div>
                                    </div>
                                    <div className="space-y-3 flex-1 mb-8">
                                        {plan.features.map((f, fi) => (
                                            <div key={fi} className="flex items-start gap-2.5 text-sm">
                                                <Check size={16} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                                                <span>{f}</span>
                                            </div>
                                        ))}
                                        {plan.missing.map((f, fi) => (
                                            <div key={fi} className="flex items-start gap-2.5 text-sm text-[var(--text-muted)] line-through opacity-40">
                                                <Check size={16} className="flex-shrink-0 mt-0.5" />
                                                <span>{f}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <MagneticButton>
                                        <a
                                            href="/kontakt"
                                            className={`w-full flex items-center justify-center py-3.5 rounded-xl text-sm font-bold transition-all ${plan.popular
                                                ? "bg-accent hover:bg-accent-hover text-white hover:shadow-lg hover:shadow-accent/20"
                                                : "bg-white/[0.04] border border-[var(--border-color)] hover:border-accent/30 text-[var(--text-primary)]"
                                                }`}
                                        >
                                            {plan.cta}
                                        </a>
                                    </MagneticButton>
                                </div>
                            </Reveal>
                        ))}
                    </div>

                    {/* Bottom note */}
                    <Reveal delay={0.3}>
                        <div className="text-center mt-12 text-sm text-[var(--text-muted)]">
                            Kontaktirajte nas za detaljnu ponudu prilagođenu vašim potrebama.
                        </div>
                    </Reveal>
                </div>
            </section>
        </>
    );
}
