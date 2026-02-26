import { Reveal } from "@/components/motion";
import { Sparkles, Bug, Wrench, Zap } from "lucide-react";

const changes = [
    {
        version: "2.4.0",
        date: "Veljača 2026",
        items: [
            { type: "feature", text: "AI Asistent — pitaj bilo što o svojim podacima" },
            { type: "feature", text: "GPS praćenje radnika u realnom vremenu" },
            { type: "improvement", text: "Redizajniran dashboard s novim KPI karticama" },
        ],
    },
    {
        version: "2.3.0",
        date: "Siječanj 2026",
        items: [
            { type: "feature", text: "QR check-in za radnike na gradilištu" },
            { type: "feature", text: "Automatski Excel/PDF export izvještaja" },
            { type: "fix", text: "Popravljen prikaz grafova u tamnom modu" },
            { type: "improvement", text: "Brži load time — 45% optimizacija" },
        ],
    },
    {
        version: "2.2.0",
        date: "Prosinac 2025",
        items: [
            { type: "feature", text: "Panel za radnike — mobilni pristup s PIN-om" },
            { type: "feature", text: "Modul za upravljanje vozilima" },
            { type: "improvement", text: "Novo sučelje za planiranje smjena" },
            { type: "fix", text: "Ispravljena validacija email adresa" },
        ],
    },
    {
        version: "2.1.0",
        date: "Studeni 2025",
        items: [
            { type: "feature", text: "Digitalne otpremnice s potpisom" },
            { type: "feature", text: "ROI kalkulator na stranici" },
            { type: "improvement", text: "Poboljšana responzivnost na mobilnim uređajima" },
        ],
    },
    {
        version: "2.0.0",
        date: "Listopad 2025",
        items: [
            { type: "feature", text: "Kompletni redizajn platforme" },
            { type: "feature", text: "17 modula za upravljanje svim aspektima poslovanja" },
            { type: "feature", text: "Dark/Light mode podrška" },
            { type: "improvement", text: "Nova arhitektura — Next.js 16" },
        ],
    },
];

const typeConfig: Record<string, { icon: React.ReactNode; label: string; color: string }> = {
    feature: { icon: <Sparkles size={14} />, label: "Novo", color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
    fix: { icon: <Bug size={14} />, label: "Popravak", color: "bg-red-400/10 text-red-400 border-red-400/20" },
    improvement: { icon: <Wrench size={14} />, label: "Poboljšanje", color: "bg-blue-400/10 text-blue-400 border-blue-400/20" },
};

export default function NovostiPage() {
    return (
        <>
            <section className="relative pt-36 pb-20 md:pt-44 md:pb-28 overflow-hidden">
                <div className="spotlight" />
                <div className="max-w-[700px] mx-auto px-6">
                    <Reveal>
                        <div className="text-center mb-16">
                            <div className="section-tag mb-4">Changelog</div>
                            <h1 className="text-4xl md:text-6xl font-black tracking-[-2px] leading-[1.1]">
                                Što je <span className="gradient-text">novo?</span>
                            </h1>
                            <p className="text-[var(--text-muted)] mt-4 text-lg">
                                Pratite sve nadogradnje, popravke i nove funkcionalnosti Vi-Di-Sef platforme.
                            </p>
                        </div>
                    </Reveal>

                    <div className="relative">
                        {/* Timeline line */}
                        <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-accent/40 via-accent/10 to-transparent hidden md:block" />

                        <div className="space-y-10">
                            {changes.map((release, ri) => (
                                <Reveal key={ri} delay={ri * 0.08}>
                                    <div className="md:pl-16 relative">
                                        {/* Timeline dot */}
                                        <div className="absolute left-4 top-2 w-5 h-5 rounded-full bg-accent/20 border-2 border-accent flex items-center justify-center hidden md:flex">
                                            <div className="w-2 h-2 rounded-full bg-accent" />
                                        </div>

                                        <div className="card-base p-6 md:p-8">
                                            <div className="flex items-center gap-3 mb-5">
                                                <div className="px-3 py-1 rounded-lg bg-accent/10 text-accent text-xs font-bold flex items-center gap-1.5">
                                                    <Zap size={12} /> v{release.version}
                                                </div>
                                                <span className="text-sm text-[var(--text-muted)]">{release.date}</span>
                                            </div>
                                            <div className="space-y-3">
                                                {release.items.map((item, ii) => {
                                                    const config = typeConfig[item.type];
                                                    return (
                                                        <div key={ii} className="flex items-start gap-3">
                                                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold border flex-shrink-0 mt-0.5 ${config.color}`}>
                                                                {config.icon} {config.label}
                                                            </span>
                                                            <span className="text-sm text-[var(--text-secondary)] leading-relaxed">{item.text}</span>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
