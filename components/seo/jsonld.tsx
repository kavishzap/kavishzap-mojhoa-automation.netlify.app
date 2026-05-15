import type React from "react";

function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function GlobalJsonLd() {
  const baseUrl = "https://mojhoa.com";
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Mojhoa Automations",
          url: baseUrl,
          potentialAction: {
            "@type": "SearchAction",
            target: `${baseUrl}/?q={search_term_string}`,
            "query-input": "required name=search_term_string",
          },
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Mojhoa Automations",
          url: baseUrl,
          email: "mojhoaautomations@gmail.com",
          telephone: "+23059182520",
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Site navigation",
          itemListElement: [
            { "@type": "SiteNavigationElement", name: "Home", url: `${baseUrl}/` },
            { "@type": "SiteNavigationElement", name: "About", url: `${baseUrl}/about` },
            { "@type": "SiteNavigationElement", name: "Solutions", url: `${baseUrl}/solutions` },
            { "@type": "SiteNavigationElement", name: "Projects", url: `${baseUrl}/projects` },
            { "@type": "SiteNavigationElement", name: "Contact", url: `${baseUrl}/contact` },
          ],
        }}
      />
    </>
  );
}

