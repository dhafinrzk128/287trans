import { Helmet } from "react-helmet-async";

export const SITE_URL = "https://287trans.id";
export const SITE_NAME = "287 Trans";
const DEFAULT_IMAGE = `${SITE_URL}/logo.png`;

/**
 * Per-page <head> tags: title, description, canonical, robots, OpenGraph,
 * Twitter Card, and optional JSON-LD. `path` must start with "/" and is
 * joined to SITE_URL for the canonical + og:url — pass the real route path,
 * not the full URL. `jsonLd`, if given, is one schema object or an array of
 * them (see src/utils/schema.js), rendered as a single <script> tag.
 */
export default function Seo({ title, description, path, image = DEFAULT_IMAGE, noindex = false, jsonLd }) {
  const url = `${SITE_URL}${path}`;
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large"} />

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="id_ID" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:image" content={image} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(Array.isArray(jsonLd) ? jsonLd : [jsonLd])}
        </script>
      )}
    </Helmet>
  );
}
