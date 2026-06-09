import { SITE_METADATA } from "@/constants";

export function JsonLd() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE_METADATA.ownerName,
    jobTitle: SITE_METADATA.tagline,
    ...(SITE_METADATA.siteUrl ? { url: SITE_METADATA.siteUrl } : {}),
    address: {
      "@type": "PostalAddress",
      addressCountry: "PH",
    },
    knowsAbout: [
      "Software Development",
      "Web Development",
      "Databases",
      "TypeScript",
      "React",
      "Next.js",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
