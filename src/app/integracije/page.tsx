import { Reveal } from "@/components/motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const integrations = [
    {
        name: "Google Calendar",
        icon: "📅",
        desc: "Sinkroniziraj smjene i rokove direktno s Google Kalendarom.",
        status: "Aktivno",
        color: "bg-blue-500/10 border-blue-500/20",
    },
    {
        name: "WhatsApp",
        icon: "💬",
        desc: "Automatske obavijesti radnicima o smjenama i promjenama.",
        status: "Aktivno",
        color: "bg-emerald-500/10 border-emerald-500/20",
    },
    {
        name: "Excel Export",
        icon: "📊",
        desc: "Export svih izvještaja u .xlsx formatu jednim klikom.",
        status: "Aktivno",
        color: "bg-green-500/10 border-green-500/20",
    },
    {
        name: "PDF Generator",
        icon: "📄",
        desc: "Generiraj profesionalne PDF račune, otpremnice i izvještaje.",
        status: "Aktivno",
        color: "bg-red-400/10 border-red-400/20",
    },
    {
        name: "GPS API",
        icon: "📍",
        desc: "Real-time lokacija radnika kroz Google Maps integraciju.",
        status: "Aktivno",
        color: "bg-amber-500/10 border-amber-500/20",
    },
    {
        name: "QR Scanner",
        icon: "📱",
        desc: "Check-in radnika skeniranjem QR koda na gradilištu.",
        status: "Aktivno",
        color: "bg-purple-500/10 border-purple-500/20",
    },
    {
        name: "Slack",
        icon: "💼",
        desc: "Notifikacije o projektima i odobrenjima u Slack kanale.",
        status: "Uskoro",
        color: "bg-violet-500/10 border-violet-500/20",
    },
    {
        name: "Zapier",
        icon: "⚡",
        desc: "Poveži Vi-Di-Sef s 5000+ aplikacija kroz Zapier.",
        status: "Uskoro",
        color: "bg-orange-500/10 border-orange-500/20",
    },
    {
        name: "SAP / ERP",
        icon: "🏢",
        desc: "Enterprise integracija s postojećim ERP sustavima.",
        status: "Enterprise",
        color: "bg-slate-500/10 border-slate-500/20",
    },
];

const statusColors: Record<string, string> = {
    "Aktivno": "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    "Uskoro": "bg-amber-500/10 text-amber-400 border-amber-500/20",
    "Enterprise": "bg-purple-500/10 text-purple-400 border-purple-500/20",
};

export default function IntegracijePage() {
    return (
        <>
            <section className="relative pt-36 pb-20 md:pt-44 md:pb-28 overflow-hidden">
                <div className="spotlight" />
                <div className="max-w-[1200px] mx-auto px-6">
                    <Reveal>
                        <div className="text-center mb-16">
                            <div className="section-tag mb-4">Integracije</div>
                            <h1 className="text-4xl md:text-6xl font-black tracking-[-2px] leading-[1.1]">
                                Povezano sa <span className="gradient-text">svime</span>
                            </h1>
                            <p className="text-[var(--text-muted)] mt-4 text-lg max-w-lg mx-auto">
                                Vi-Di-Sef se integrira s alatima koje već koristite — bez komplikacija.
                            </p>
                        </div>
                    </Reveal>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {integrations.map((int, i) => (
                            <Reveal key={i} delay={i * 0.05}>
                                <div className={`card-base p-6 h-full flex flex-col border ${int.color} group hover:-translate-y-1 transition-all duration-300`}>
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="text-3xl">{int.icon}</div>
                                        <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold border ${statusColors[int.status]}`}>
                                            {int.status}
                                        </span>
                                    </div>
                                    <h3 className="font-bold text-lg mb-2 group-hover:text-accent transition-colors">{int.name}</h3>
                                    <p className="text-sm text-[var(--text-muted)] leading-relaxed flex-1">{int.desc}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>

                    <Reveal delay={0.3}>
                        <div className="mt-16 card-base p-8 md:p-10 text-center relative overflow-hidden">
                            <div className="hero-glow absolute -top-20 left-1/2 -translate-x-1/2 w-[400px] h-[300px]" />
                            <h2 className="text-2xl md:text-3xl font-black mb-3 relative">Treba vam custom integracija?</h2>
                            <p className="text-[var(--text-muted)] mb-6 relative">Javite nam se — razvijamo prilagođena rješenja za vaše poslovne potrebe.</p>
                            <Link href="/kontakt" className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white px-8 py-3.5 rounded-xl font-bold transition-all hover:shadow-lg hover:shadow-accent/20 relative">
                                Kontaktiraj nas <ArrowRight size={16} />
                            </Link>
                        </div>
                    </Reveal>
                </div>
            </section>
        </>
    );
}
