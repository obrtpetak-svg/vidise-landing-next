import type { MetadataRoute } from 'next';

const BASE_URL = 'https://vi-di-sef.com';

const routes = [
    '', '/radni-sati', '/projekti', '/racuni', '/otpremnice', '/vozila',
    '/panel-za-radnike', '/smjestaj', '/obaveze', '/izvjestaji', '/sigurnost',
    '/dnevnik', '/vrijeme', '/gps-nadzor', '/qr-checkin', '/odmori',
    '/kalendar', '/obavijesti',
    '/kontakt', '/novosti', '/cijene', '/integracije', '/blog',
];

export default function sitemap(): MetadataRoute.Sitemap {
    return routes.map((route) => ({
        url: `${BASE_URL}${route}`,
        lastModified: new Date('2026-02-20'),
        changeFrequency: route === '' ? 'weekly' : 'monthly',
        priority: route === '' ? 1.0 : 0.8,
    }));
}
