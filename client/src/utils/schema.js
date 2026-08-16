import { SITE_URL, SITE_NAME } from "../components/Seo";

// Business data confirmed by the owner for this JSON-LD (address, hours);
// lat/long deliberately omitted — not provided. Update alongside the
// CompanyProfile admin record if these ever change, they aren't linked.
export const AUTORENTAL_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "AutoRental",
  name: SITE_NAME,
  image: `${SITE_URL}/logo.png`,
  url: SITE_URL,
  telephone: "+62811144287",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Jl. Lembang Baru II, RT003/RW009, Ciledug",
    addressLocality: "Kota Tangerang",
    addressRegion: "Banten",
    postalCode: "15151",
    addressCountry: "ID",
  },
  areaServed: ["Tangerang", "Tangerang Selatan", "Jakarta", "Bekasi", "Depok", "Bogor"].map((name) => ({
    "@type": "City",
    name,
  })),
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: "08:00",
    closes: "21:00",
  },
  sameAs: ["https://instagram.com/287trans.id", "https://tiktok.com/@287trans"],
};

export const WEBSITE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
};

// null when there's nothing to render, so callers can drop it from a jsonLd
// array without shipping an FAQPage schema that doesn't match visible content.
export function faqPageSchema(faqList) {
  if (!faqList?.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqList.map((item) => ({
      "@type": "Question",
      name: item.pertanyaan,
      acceptedAnswer: { "@type": "Answer", text: item.jawaban },
    })),
  };
}

function absoluteUrl(url) {
  return url.startsWith("http") ? url : `${SITE_URL}${url}`;
}

export function productSchema(mobil) {
  const images = mobil.fotos?.length ? mobil.fotos.map((f) => absoluteUrl(f.urlFoto)) : undefined;
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: mobil.namaMobil,
    ...(images && { image: images }),
    description: mobil.deskripsi,
    offers: {
      "@type": "Offer",
      url: `${SITE_URL}/katalog/${mobil.idMobil}`,
      priceCurrency: "IDR",
      price: mobil.hargaPerHari,
      availability: mobil.status === "tersedia" ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
    },
  };
}

export function breadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}
