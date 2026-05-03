import { Helmet } from "react-helmet-async";

interface SEOHeadProps {
  title?: string;
  description?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogType?: string;
  canonical?: string;
}

/**
 * Per-page SEO head tags.
 * Wraps react-helmet-async to manage <title> and <meta> per route.
 */
const SEOHead = ({
  title = "Tichuka — Crafted Cocktails. Global Flavours. After Dark.",
  description = "Tichuka is a premium late-night dining and cocktail bar. Signature cocktails, Asian-inspired cuisine, and an unforgettable nightlife experience.",
  ogTitle,
  ogDescription,
  ogType = "website",
  canonical,
}: SEOHeadProps) => (
  <Helmet>
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta property="og:title" content={ogTitle ?? title} />
    <meta property="og:description" content={ogDescription ?? description} />
    <meta property="og:type" content={ogType} />
    {canonical && <link rel="canonical" href={canonical} />}
  </Helmet>
);

export default SEOHead;
