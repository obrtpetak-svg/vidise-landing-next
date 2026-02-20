"use client";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "./motion";
import { Clock, MapPin, FileCheck, Truck, Activity } from "lucide-react";

interface FeedItem {
    icon: React.ReactNode;
    color: string;
    text: string;
    time: string;
}

const templates: (() => FeedItem)[] = [
    () => {
        const names = ["Marko H.", "Ivan P.", "Ana K.", "Pero M.", "Josip R.", "Luka B.", "Davor S.", "Marin T."];
        const hrs = [6, 7, 8, 9, 10];
        const projects = ["Arena Zagreb", "Most Pelješac", "Hotel Marjan", "Stambeni Dubrava", "Centar Vukovar"];
        return {
            icon: <Clock size={15} />, color: "text-blue-400",
            text: `${names[Math.floor(Math.random() * names.length)]} evidentirao ${hrs[Math.floor(Math.random() * hrs.length)]}h na projektu ${projects[Math.floor(Math.random() * projects.length)]}`,
            time: `${Math.floor(Math.random() * 5) + 1} min`,
        };
    },
    () => {
        const locations = ["Gradilište Žitnjak", "Skladište Jankomir", "Centar Zagreb", "Lokacija Split", "Baza Osijek"];
        const names = ["Gordan V.", "Darko J.", "Matej L.", "Alen H.", "Boris P."];
        return {
            icon: <MapPin size={15} />, color: "text-emerald-400",
            text: `${names[Math.floor(Math.random() * names.length)]} check-in na ${locations[Math.floor(Math.random() * locations.length)]}`,
            time: `${Math.floor(Math.random() * 10) + 1} min`,
        };
    },
    () => {
        const docs = ["Otpremnica #2847", "Otpremnica #2848", "Račun #1205", "Račun #1206", "Dnevnik #892"];
        return {
            icon: <FileCheck size={15} />, color: "text-amber-400",
            text: `${docs[Math.floor(Math.random() * docs.length)]} automatski generiran i potpisan`,
            time: `${Math.floor(Math.random() * 15) + 1} min`,
        };
    },
    () => {
        const vehicles = ["Kombi MAN", "Kamion Iveco", "Combo Peugeot", "Pickup Toyota", "Sprinter Mercedes"];
        const km = [12, 28, 45, 67, 134];
        return {
            icon: <Truck size={15} />, color: "text-purple-400",
            text: `${vehicles[Math.floor(Math.random() * vehicles.length)]} — ${km[Math.floor(Math.random() * km.length)]}km danas`,
            time: `${Math.floor(Math.random() * 30) + 1} min`,
        };
    },
    () => ({
        icon: <Activity size={15} />, color: "text-accent",
        text: `AI agent: "Na projektu Arena Zagreb ovaj tjedan ukupno 287 radnih sati"`,
        time: `${Math.floor(Math.random() * 3) + 1} min`,
    }),
];

export function LiveFeed() {
    const [items, setItems] = useState<(FeedItem & { id: number })[]>([]);
    const counter = useRef(0);

    useEffect(() => {
        // Seed with a few items
        const initial = Array.from({ length: 4 }, () => {
            counter.current++;
            const template = templates[Math.floor(Math.random() * templates.length)];
            return { ...template(), id: counter.current };
        });
        setItems(initial);

        const interval = setInterval(() => {
            counter.current++;
            const template = templates[Math.floor(Math.random() * templates.length)];
            const newItem = { ...template(), id: counter.current };
            setItems((prev) => [newItem, ...prev.slice(0, 5)]);
        }, 3500);

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="py-24 border-t border-white/[0.04]">
            <div className="max-w-[1200px] mx-auto px-6">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <Reveal>
                        <div className="section-tag mb-4">Uživo</div>
                        <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight mb-4">
                            Sve se događa<br /><span className="gradient-text">u realnom vremenu.</span>
                        </h2>
                        <p className="text-slate-400 leading-relaxed mb-6">
                            Svaka evidencija, svaki check-in, svaka otpremnica — vidiš odmah.
                            Nema čekanja. Nema Excel tablica na email-u sutra ujutro.
                        </p>
                        <div className="flex items-center gap-3 text-xs text-slate-500">
                            <span className="flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                Simulirani prikaz
                            </span>
                            <span>•</span>
                            <span>Podaci se generiraju svake 3.5 sekunde</span>
                        </div>
                    </Reveal>

                    <Reveal delay={0.15}>
                        <div className="card-base p-1 relative overflow-hidden">
                            {/* Header */}
                            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06]">
                                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                <span className="text-xs font-bold text-slate-400">LIVE AKTIVNOST</span>
                                <span className="ml-auto text-[10px] text-slate-600">{items.length} događaja</span>
                            </div>
                            {/* Feed */}
                            <div className="p-2 space-y-1 min-h-[280px]">
                                <AnimatePresence mode="popLayout">
                                    {items.map((item) => (
                                        <motion.div key={item.id}
                                            initial={{ opacity: 0, height: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, height: "auto", scale: 1 }}
                                            exit={{ opacity: 0, height: 0, scale: 0.95 }}
                                            transition={{ type: "spring", damping: 25, stiffness: 400 }}
                                            className="flex items-start gap-3 px-3 py-2.5 rounded-xl hover:bg-white/[0.03] transition-colors"
                                        >
                                            <span className={`mt-0.5 ${item.color}`}>{item.icon}</span>
                                            <span className="text-xs text-slate-400 leading-relaxed flex-1">{item.text}</span>
                                            <span className="text-[10px] text-slate-600 flex-shrink-0 mt-0.5">prije {item.time}</span>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}
