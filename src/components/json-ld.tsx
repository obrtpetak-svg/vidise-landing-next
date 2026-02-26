export function JsonLd() {
    const orgSchema = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Vi-Di-Sef",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "Web, Android, iOS",
        "description": "Vi-Di-Sef je moderna platforma za upravljanje radnom snagom u građevinarstvu. Evidencija radnog vremena, projekti, računi, otpremnice — sve na jednom mjestu.",
        "url": "https://vi-di-sef.com",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "EUR",
            "description": "Besplatni probni period"
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "5",
            "ratingCount": "3",
            "bestRating": "5",
            "worstRating": "1"
        },
        "author": {
            "@type": "Organization",
            "name": "Vi-Di.me",
            "url": "https://www.vi-di.me"
        },
        "featureList": [
            "Evidencija radnog vremena",
            "Upravljanje projektima",
            "Digitalni računi",
            "Digitalne otpremnice",
            "GPS praćenje",
            "QR Check-in",
            "Građevinski dnevnik",
            "Vremenska prognoza po gradilištu",
            "Upravljanje vozilima",
            "Kalendar i obavijesti",
            "AI Asistent",
            "Izvještaji i analize"
        ]
    };

    const orgEntity = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Vi-Di-Sef",
        "url": "https://vi-di-sef.com",
        "logo": "https://vi-di-sef.com/logo.png",
        "sameAs": ["https://www.vi-di.me"],
        "contactPoint": {
            "@type": "ContactPoint",
            "email": "info@vi-di.me",
            "contactType": "customer support",
            "availableLanguage": ["Croatian", "English"]
        }
    };

    const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Vi-Di-Sef",
        "url": "https://vi-di-sef.com",
        "description": "Platforma za upravljanje radnom snagom u građevinarstvu",
        "inLanguage": "hr"
    };

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            { "@type": "Question", "name": "Koliko košta Vi-Di-Sef?", "acceptedAnswer": { "@type": "Answer", "text": "Vi-Di-Sef nudi besplatni probni period. Kontaktiraj nas na info@vi-di.me za detaljne informacije o cijenama prilagođenim tvojim potrebama." } },
            { "@type": "Question", "name": "Trebam li instalirati nešto?", "acceptedAnswer": { "@type": "Answer", "text": "Ne. Vi-Di-Sef je web aplikacija — otvori u pregledniku s mobitela ili računala i koristi odmah. Nema instalacije, nema kompliciranih postavki." } },
            { "@type": "Question", "name": "Kako radnici unose sate?", "acceptedAnswer": { "@type": "Answer", "text": "Radnici otvaraju app na mobitelu, odaberu projekt, unesu dolazak/odlazak i pošalju. Admin odobrava jednim klikom. Alternativno, mogu koristiti QR Check-in za automatski unos." } },
            { "@type": "Question", "name": "Jesu li moji podaci sigurni?", "acceptedAnswer": { "@type": "Answer", "text": "Apsolutno. Koristimo SHA-256 enkripciju, rate limiting, HTTPS i audit log svih akcija. Tvoji podaci su zaštićeni industrijskim standardima." } },
            { "@type": "Question", "name": "Mogu li koristiti Vi-Di-Sef na mobitelu?", "acceptedAnswer": { "@type": "Answer", "text": "Da! Aplikacija je potpuno responzivna i optimizirana za mobilne uređaje. Radnici na terenu koriste mobitel kao primarni uređaj." } },
            { "@type": "Question", "name": "Koliko radnika podržavate?", "acceptedAnswer": { "@type": "Answer", "text": "Vi-Di-Sef skalira od malih ekipa (5-10 radnika) do velikih tvrtki (100+ radnika). Nema limita na broj radnika, projekata ili unosa." } },
            { "@type": "Question", "name": "Mogu li izvesti podatke?", "acceptedAnswer": { "@type": "Answer", "text": "Da. Svi izvještaji se mogu izvesti u PDF i Excel formatu. Dnevnici, sati, računi, otpremnice — sve s jednim klikom." } },
            { "@type": "Question", "name": "Koje module uključuje platforma?", "acceptedAnswer": { "@type": "Answer", "text": "Vi-Di-Sef uključuje 17+ modula: Radni sati, Projekti, Računi, Otpremnice, Vozila, GPS Nadzor, QR Check-in, Dnevnik radova, Kalendar, Obavijesti i još mnogo toga." } },
        ]
    };

    const howToSchema = {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": "Kako početi koristiti Vi-Di-Sef",
        "description": "Od registracije do produktivnosti u 4 jednostavna koraka.",
        "step": [
            { "@type": "HowToStep", "position": 1, "name": "Otvori app", "text": "Registriraj se besplatno. Nema instalacije, nema kreditne kartice.", "url": "https://vi-di-sef.com/#how" },
            { "@type": "HowToStep", "position": 2, "name": "Dodaj radnike", "text": "Unesi tim — svaki radnik dobije svoj PIN pristup na mobitelu.", "url": "https://vi-di-sef.com/#how" },
            { "@type": "HowToStep", "position": 3, "name": "Evidentiraj sate", "text": "Radnici unose. Ti odobriš jednim klikom. Gotovo.", "url": "https://vi-di-sef.com/#how" },
            { "@type": "HowToStep", "position": 4, "name": "Generiraj izvještaje", "text": "PDF, Excel, AI analiza — sve automatski, u realnom vremenu.", "url": "https://vi-di-sef.com/#how" },
        ]
    };

    const localBusinessSchema = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "Vi-Di-Sef",
        "description": "Moderna platforma za upravljanje radnom snagom u građevinarstvu.",
        "url": "https://vi-di-sef.com",
        "logo": "https://vi-di-sef.com/logo.png",
        "image": "https://vi-di-sef.com/og-image.png",
        "telephone": "+385-xx-xxx-xxxx",
        "email": "info@vi-di.me",
        "address": {
            "@type": "PostalAddress",
            "addressCountry": "HR",
            "addressLocality": "Zagreb"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": "45.815",
            "longitude": "15.982"
        },
        "priceRange": "€€",
        "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "opens": "08:00",
            "closes": "17:00"
        }
    };

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Početna", "item": "https://vi-di-sef.com" }
        ]
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgEntity) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
        </>
    );
}

export function BreadcrumbJsonLd({ pageName, pageUrl }: { pageName: string; pageUrl: string }) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Početna", "item": "https://vi-di-sef.com" },
            { "@type": "ListItem", "position": 2, "name": pageName, "item": `https://vi-di-sef.com${pageUrl}` },
        ]
    };
    return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}
