"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "./motion";

const faqItems = [
    { q: "Koliko košta Vi-Di-Sef?", a: "Vi-Di-Sef nudi besplatni probni period. Kontaktiraj nas na info@vi-di.me za detaljne informacije o cijenama prilagođenim tvojim potrebama." },
    { q: "Trebam li instalirati nešto?", a: "Ne. Vi-Di-Sef je web aplikacija — otvori u pregledniku s mobitela ili računala i koristi odmah. Nema instalacije, nema kompliciranih postavki." },
    { q: "Kako radnici unose sate?", a: "Radnici otvaraju app na mobitelu, odaberu projekt, unesu dolazak/odlazak i pošalju. Admin odobrava jednim klikom. Alternativno, mogu koristiti QR Check-in za automatski unos." },
    { q: "Jesu li moji podaci sigurni?", a: "Apsolutno. Koristimo SHA-256 enkripciju, rate limiting, HTTPS i audit log svih akcija. Tvoji podaci su zaštićeni industrijskim standardima." },
    { q: "Mogu li koristiti Vi-Di-Sef na mobitelu?", a: "Da! Aplikacija je potpuno responzivna i optimizirana za mobilne uređaje. Radnici na terenu koriste mobitel kao primarni uređaj." },
    { q: "Koliko radnika podržavate?", a: "Vi-Di-Sef skalira od malih ekipa (5-10 radnika) do velikih tvrtki (100+ radnika). Nema limita na broj radnika, projekata ili unosa." },
    { q: "Mogu li izvesti podatke?", a: "Da. Svi izvještaji se mogu izvesti u PDF i Excel formatu. Dnevnici, sati, računi, otpremnice — sve s jednim klikom." },
    { q: "Koje module uključuje platforma?", a: "Vi-Di-Sef uključuje 17+ modula: Radni sati, Projekti, Računi, Otpremnice, Vozila, GPS Nadzor, QR Check-in, Dnevnik radova, Kalendar, Obavijesti i još mnogo toga." },
];

export function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    return (
        <div className="space-y-3">
            {faqItems.map((item, i) => (
                <Reveal key={i} delay={i * 0.05}>
                    <div className="card-base overflow-hidden">
                        <button onClick={() => setOpenIndex(openIndex === i ? null : i)}
                            className="w-full flex items-center justify-between px-6 py-4 text-left group">
                            <span className="font-semibold text-sm pr-4">{item.q}</span>
                            <motion.span animate={{ rotate: openIndex === i ? 45 : 0 }}
                                className="text-accent text-xl flex-shrink-0 font-light">+</motion.span>
                        </button>
                        <AnimatePresence>
                            {openIndex === i && (
                                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}>
                                    <div className="px-6 pb-4 text-sm text-slate-400 leading-relaxed">{item.a}</div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </Reveal>
            ))}
        </div>
    );
}
