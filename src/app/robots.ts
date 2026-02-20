import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
            },
        ],
        sitemap: 'https://vi-di-sef.com/sitemap.xml',
        host: 'https://vi-di-sef.com',
    };
}
