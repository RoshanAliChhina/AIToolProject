import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, image, url }) => {
    const siteTitle = "AI Tools Hub - Best AI Directory";
    const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
    const metaDesc = description || "Discover the best AI tools for coding, writing, video, and more. Updated daily with free and premium options.";
    const metaImage = image || "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1200&h=630"; // Default OG Image
    const metaUrl = url || window.location.href;

    return (
        <Helmet>
            {/* Standard Meta Tags */}
            <title>{fullTitle}</title>
            <meta name="description" content={metaDesc} />
            <link rel="canonical" href={metaUrl} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={metaUrl} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={metaDesc} />
            <meta property="og:image" content={metaImage} />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={metaUrl} />
            <meta property="twitter:title" content={fullTitle} />
            <meta property="twitter:description" content={metaDesc} />
            <meta property="twitter:image" content={metaImage} />
        </Helmet>
    );
};

export default SEO;
