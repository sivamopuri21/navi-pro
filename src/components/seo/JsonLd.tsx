export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "NaviPro Projects Private Limited",
    url: "https://naviproprojectprivatelimited.com",
    logo: "https://naviproprojectprivatelimited.com/logo.png",
    description:
      "Specialized healthcare infrastructure — radiation oncology vaults, diagnostic suites, and turnkey hospital construction across India.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "#G-6, Aastha Meadows, Lalamma Gardens, Puppalaguda, Manikonda",
      addressLocality: "Hyderabad",
      addressRegion: "Telangana",
      addressCountry: "IN",
    },
    email: "navipro89@gmail.com",
    sameAs: [],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function LocalBusinessJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "NaviPro Projects Private Limited",
    image: "https://naviproprojectprivatelimited.com/logo.png",
    url: "https://naviproprojectprivatelimited.com",
    email: "navipro89@gmail.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "#G-6, Aastha Meadows, Lalamma Gardens, Puppalaguda, Manikonda",
      addressLocality: "Hyderabad",
      addressRegion: "Telangana",
      postalCode: "500089",
      addressCountry: "IN",
    },
    priceRange: "$$",
    openingHours: "Mo-Sa 09:00-18:00",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
