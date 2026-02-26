"use client";
import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { Reveal, TiltCard } from "./motion";
import { features } from "@/lib/features-data";
import {
    ArrowRight, Clock, FolderKanban, Receipt, Truck, Car, Users,
    Building, ListChecks, BarChart3, Shield, BookOpen, CloudSun, MapPin,
    QrCode, Palmtree, Calendar, Bell, Zap, TrendingUp, CheckCircle, Activity
} from "lucide-react";

const featureIcons: Record<string, React.ReactNode> = {
    "⏱️": <Clock size={22} />, "📋": <FolderKanban size={22} />, "🧾": <Receipt size={22} />,
    "📦": <Truck size={22} />, "🚗": <Car size={22} />, "👷": <Users size={22} />,
    "🏠": <Building size={22} />, "✅": <ListChecks size={22} />, "📊": <BarChart3 size={22} />,
    "🔐": <Shield size={22} />, "📒": <BookOpen size={22} />, "🌤️": <CloudSun size={22} />,
    "📍": <MapPin size={22} />, "📲": <QrCode size={22} />, "🏖️": <Palmtree size={22} />,
    "📅": <Calendar size={22} />, "🔔": <Bell size={22} />, "📂": <FolderKanban size={22} />,
    "📷": <QrCode size={22} />, "☀️": <CloudSun size={22} />, "📡": <MapPin size={22} />,
    "🔒": <Shield size={22} />,
};

/* ─── Animated Mini Line Chart ─── */
function SparklineChart() {
    const ref = useRef<SVGSVGElement>(null);
    const inView = useInView(ref, { once: true, margin: "-40px" });
    const data = [32, 45, 38, 62, 55, 78, 71];
    const days = ["Pon", "Uto", "Sri", "Čet", "Pet", "Sub", "Ned"];
    const max = Math.max(...data);
    const w = 320, h = 140, px = 20, py = 20;
    const points = data.map((v, i) => ({
        x: px + (i / (data.length - 1)) * (w - 2 * px),
        y: py + (1 - v / max) * (h - 2 * py),
    }));
    const pathD = points.map((p, i) => {
        if (i === 0) return `M ${p.x} ${p.y}`;
        const prev = points[i - 1];
        const cpx1 = prev.x + (p.x - prev.x) * 0.4;
        const cpx2 = p.x - (p.x - prev.x) * 0.4;
        return `C ${cpx1} ${prev.y}, ${cpx2} ${p.y}, ${p.x} ${p.y}`;
    }).join(" ");
    const areaD = `${pathD} L ${points[points.length - 1].x} ${h} L ${points[0].x} ${h} Z`;

    return (
        <svg ref={ref} viewBox={`0 0 ${w} ${h}`} className="w-full h-full" preserveAspectRatio="xMidYMid meet">
            {/* Grid lines */}
            {[0.25, 0.5, 0.75].map((t) => (
                <line key={t} x1={px} x2={w - px} y1={py + t * (h - 2 * py)} y2={py + t * (h - 2 * py)}
                    stroke="var(--border-color)" strokeWidth="0.5" />
            ))}
            {/* Area fill */}
            <motion.path d={areaD} fill="url(#sparkGradient)" opacity={0.15}
                initial={{ opacity: 0 }} animate={inView ? { opacity: 0.15 } : {}} transition={{ duration: 1, delay: 0.5 }} />
            {/* Line */}
            <motion.path d={pathD} fill="none" stroke="#D95D08" strokeWidth="2.5" strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }} animate={inView ? { pathLength: 1, opacity: 1 } : {}}
                transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }} />
            {/* Dots */}
            {points.map((p, i) => (
                <motion.circle key={i} cx={p.x} cy={p.y} r="4" fill="#D95D08" stroke="var(--bg-primary)" strokeWidth="2"
                    initial={{ scale: 0, opacity: 0 }} animate={inView ? { scale: 1, opacity: 1 } : {}}
                    transition={{ delay: 0.3 + i * 0.1, type: "spring", stiffness: 400 }} />
            ))}
            {/* Day labels */}
            {points.map((p, i) => (
                <text key={`label-${i}`} x={p.x} y={h - 4} textAnchor="middle" fontSize="9"
                    fill="var(--text-muted)" fontWeight="600">{days[i]}</text>
            ))}
            {/* Value labels */}
            {points.map((p, i) => (
                <motion.text key={`val-${i}`} x={p.x} y={p.y - 10} textAnchor="middle" fontSize="9"
                    fill="var(--text-secondary)" fontWeight="700"
                    initial={{ opacity: 0, y: 5 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.5 + i * 0.1 }}>{data[i]}h</motion.text>
            ))}
            <defs>
                <linearGradient id="sparkGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#D95D08" />
                    <stop offset="100%" stopColor="#D95D08" stopOpacity="0" />
                </linearGradient>
            </defs>
        </svg>
    );
}

/* ─── Animated Circular Progress ─── */
function CircleProgress({ value, label, color }: { value: number; label: string; color: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-40px" });
    const r = 44, C = 2 * Math.PI * r;
    const offset = C - (value / 100) * C;
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!inView) return;
        let current = 0;
        const step = Math.ceil(value / 40);
        const timer = setInterval(() => {
            current += step;
            if (current >= value) { current = value; clearInterval(timer); }
            setCount(current);
        }, 25);
        return () => clearInterval(timer);
    }, [inView, value]);

    return (
        <div ref={ref} className="flex flex-col items-center justify-center gap-3">
            <div className="relative w-28 h-28">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r={r} fill="none" stroke="var(--border-color)" strokeWidth="6" />
                    <motion.circle cx="50" cy="50" r={r} fill="none" stroke={color} strokeWidth="6"
                        strokeLinecap="round" strokeDasharray={C}
                        initial={{ strokeDashoffset: C }} animate={inView ? { strokeDashoffset: offset } : {}}
                        transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }} />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-black">{count}<span className="text-sm">%</span></span>
                </div>
            </div>
            <span className="text-xs text-[var(--text-muted)] font-semibold text-center">{label}</span>
        </div>
    );
}

/* ─── Animated Horizontal Bar Chart ─── */
function BarProgress({ items }: { items: { label: string; value: number; color: string }[] }) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-40px" });
    const max = Math.max(...items.map(i => i.value));

    return (
        <div ref={ref} className="space-y-3 w-full">
            {items.map((item, i) => (
                <div key={i} className="space-y-1">
                    <div className="flex justify-between text-xs">
                        <span className="text-[var(--text-secondary)] font-medium">{item.label}</span>
                        <span className="font-bold text-[var(--text-primary)]">{item.value}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-[var(--border-color)] overflow-hidden">
                        <motion.div className="h-full rounded-full" style={{ background: item.color }}
                            initial={{ width: 0 }} animate={inView ? { width: `${(item.value / max) * 100}%` } : {}}
                            transition={{ duration: 1, delay: 0.3 + i * 0.15, ease: "easeOut" }} />
                    </div>
                </div>
            ))}
        </div>
    );
}

/* ─── Live Metric Pulse ─── */
function LiveMetric({ icon, value, label, delay = 0 }: { icon: React.ReactNode; value: string; label: string; delay?: number }) {
    return (
        <Reveal delay={delay}>
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent flex-shrink-0">
                    {icon}
                </div>
                <div>
                    <div className="text-lg font-black leading-none">{value}</div>
                    <div className="text-[10px] text-[var(--text-muted)] mt-0.5">{label}</div>
                </div>
            </div>
        </Reveal>
    );
}

/* ─── Small Feature Card ─── */
function SmallFeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
    const iconAnimClasses = [
        "icon-hover-bounce", "icon-hover-rotate", "icon-hover-pulse", "icon-hover-float",
    ];
    const animClass = iconAnimClasses[index % iconAnimClasses.length];

    return (
        <Reveal delay={index * 0.04}>
            <TiltCard>
                <Link href={feature.href} className="bento-card bento-card-glow p-5 block h-full group">
                    <div className={`w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent mb-3 group-hover:scale-110 transition-transform ${animClass}`}>
                        {featureIcons[feature.icon] || <Zap size={22} />}
                    </div>
                    <h3 className="font-bold text-sm mb-1 group-hover:text-accent transition-colors">{feature.title}</h3>
                    <p className="text-[11px] text-[var(--text-muted)] leading-relaxed line-clamp-2">{feature.desc}</p>
                    <div className="mt-2 flex items-center gap-1 text-[10px] text-accent font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                        Saznaj više <ArrowRight size={10} />
                    </div>
                </Link>
            </TiltCard>
        </Reveal>
    );
}

/* ─── Main Bento Grid Export ─── */
export function BentoGrid() {
    // Split features: first few get special treatment, rest go into small cards
    const smallFeatures = features;

    return (
        <section id="features" className="py-24 border-t border-[var(--border-color)]">
            <div className="max-w-[1200px] mx-auto px-6">
                <Reveal>
                    <div className="text-center mb-16">
                        <div className="section-tag mb-4">Svi moduli</div>
                        <h2 className="text-4xl md:text-5xl font-black tracking-tight">
                            17+ modula.<br /><span className="gradient-text">Jedna platforma.</span>
                        </h2>
                    </div>
                </Reveal>

                {/* Bento Grid — Hero Cards */}
                <div className="bento-layout mb-6">
                    {/* Large Card: Dashboard Chart */}
                    <Reveal delay={0.05}>
                        <div className="bento-card bento-card-glow bento-large p-6 md:p-8 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-[200px] h-[200px] rounded-full bg-accent/[0.04] blur-[60px] pointer-events-none" />
                            <div className="flex items-center gap-3 mb-4 relative z-10">
                                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                                    <Activity size={20} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-sm">Dashboard — Tjedni pregled</h3>
                                    <p className="text-[10px] text-[var(--text-muted)]">Evidentirani sati po danu</p>
                                </div>
                                <div className="ml-auto flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                    <span className="text-[10px] text-emerald-400 font-semibold">LIVE</span>
                                </div>
                            </div>
                            <div className="relative z-10 h-[160px] md:h-[180px]">
                                <SparklineChart />
                            </div>
                            <div className="flex items-center justify-between mt-4 relative z-10">
                                <div className="flex items-center gap-2">
                                    <TrendingUp size={14} className="text-emerald-400" />
                                    <span className="text-xs font-semibold text-emerald-400">+12% od prošlog tjedna</span>
                                </div>
                                <span className="text-xs text-[var(--text-muted)]">Ukupno: <strong className="text-[var(--text-primary)]">381h</strong></span>
                            </div>
                        </div>
                    </Reveal>

                    {/* Medium Card: Satisfaction */}
                    <Reveal delay={0.15}>
                        <div className="bento-card bento-card-glow bento-medium p-6 flex flex-col items-center justify-center">
                            <CircleProgress value={98} label="Zadovoljstvo korisnika" color="#D95D08" />
                            <div className="flex items-center gap-1 mt-3">
                                <CheckCircle size={12} className="text-emerald-400" />
                                <span className="text-[10px] text-emerald-400 font-semibold">Top ocjena u regiji</span>
                            </div>
                        </div>
                    </Reveal>

                    {/* Medium Card: Efficiency Bars */}
                    <Reveal delay={0.2}>
                        <div className="bento-card bento-card-glow bento-medium p-6 flex flex-col justify-center">
                            <div className="flex items-center gap-2 mb-4">
                                <BarChart3 size={16} className="text-accent" />
                                <h3 className="font-bold text-sm">Učinkovitost</h3>
                            </div>
                            <BarProgress items={[
                                { label: "Manje administracije", value: 75, color: "#D95D08" },
                                { label: "Brži izvještaji", value: 90, color: "#10B981" },
                                { label: "Manje grešaka", value: 85, color: "#6366F1" },
                            ]} />
                        </div>
                    </Reveal>

                    {/* Live Metrics Card */}
                    <Reveal delay={0.25}>
                        <div className="bento-card bento-card-glow bento-stats p-6">
                            <div className="grid grid-cols-2 gap-4 h-full">
                                <LiveMetric icon={<Users size={18} />} value="500+" label="Registriranih radnika" delay={0.3} />
                                <LiveMetric icon={<Clock size={18} />} value="12.000+" label="Evidentiranih sati" delay={0.35} />
                                <LiveMetric icon={<FolderKanban size={18} />} value="150+" label="Aktivnih projekata" delay={0.4} />
                                <LiveMetric icon={<Zap size={18} />} value="<30s" label="Vrijeme unosa sati" delay={0.45} />
                            </div>
                        </div>
                    </Reveal>
                </div>

                {/* Small Feature Cards Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                    {smallFeatures.map((f, i) => (
                        <SmallFeatureCard key={i} feature={f} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}
