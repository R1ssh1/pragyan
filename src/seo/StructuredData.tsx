import React from "react";
import { Helmet } from "react-helmet-async";
import type { Product } from "../data/products/types";
import { companyInfo } from "../data/company";

const SITE_URL = "https://pragyan-nine.vercel.app";

// ── Organization Schema ───────────────────────────────────────────────────────

/**
 * OrganizationSchema — site-wide JSON-LD. Include on every page via App.tsx.
 */
export const OrganizationSchema: React.FC = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: companyInfo.name,
    url: `https://${companyInfo.website}`,
    logo: `${SITE_URL}/logo/Pragyan-logo.webp`,
    foundingDate: String(companyInfo.founded),
    description:
      "Manufacturer and supplier of high-performance pipes, tubes, fittings, and flanges for nuclear, defence, aerospace, petrochemical, and pharmaceutical industries. Est. 1994.",
    address: [
      {
        "@type": "PostalAddress",
        streetAddress: companyInfo.registeredOffice.address,
        addressLocality: companyInfo.registeredOffice.city,
        addressRegion: companyInfo.registeredOffice.state,
        postalCode: companyInfo.registeredOffice.pincode,
        addressCountry: "IN",
      },
      {
        "@type": "PostalAddress",
        streetAddress: companyInfo.factory.address,
        addressLocality: companyInfo.factory.area,
        addressRegion: companyInfo.factory.state,
        postalCode: companyInfo.factory.pincode,
        addressCountry: "IN",
      },
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: companyInfo.phone,
      email: companyInfo.email,
      contactType: "customer service",
      availableLanguage: ["English", "Hindi"],
    },
    sameAs: [`https://${companyInfo.website}`],
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

// ── LocalBusiness Schema ───────────────────────────────────────────────────

/**
 * LocalBusinessSchema — targets local search / Google Maps / Knowledge Panel.
 * Include on the Home and Contact pages via App.tsx or individual page files.
 */
export const LocalBusinessSchema: React.FC = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ManufacturingBusiness",
    name: companyInfo.name,
    url: SITE_URL,
    logo: `${SITE_URL}/logo-white.webp`,
    image: `${SITE_URL}/logo-white.webp`,
    description:
      "Manufacturer and supplier of stainless steel pipes, tubes, fittings, and flanges for nuclear, defence, aerospace, and petrochemical industries. ISO 9001:2015 certified. Est. 1994.",
    foundingDate: String(companyInfo.founded),
    telephone: companyInfo.phone,
    email: companyInfo.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: companyInfo.registeredOffice.address,
      addressLocality: companyInfo.registeredOffice.city,
      addressRegion: companyInfo.registeredOffice.state,
      postalCode: companyInfo.registeredOffice.pincode,
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 19.4589,
      longitude: 72.8106,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "18:00",
    },
    hasMap: "https://maps.google.com/?q=Virar,Palghar,Maharashtra",
    areaServed: {
      "@type": "Country",
      name: "India",
    },
    sameAs: [`https://${companyInfo.website}`],
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

// ── BreadcrumbList Schema ─────────────────────────────────────────────────────

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[];
}

/**
 * BreadcrumbSchema — for division and product detail pages.
 */
export const BreadcrumbSchema: React.FC<BreadcrumbSchemaProps> = ({ items }) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url}`,
    })),
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

// ── Product Schema ────────────────────────────────────────────────────────────

interface ProductSchemaProps {
  product: Product;
}

/**
 * ProductSchema — for individual product detail pages.
 * Data is pulled directly from the Product record — no duplication.
 */
export const ProductSchema: React.FC<ProductSchemaProps> = ({ product }) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: `${SITE_URL}/src/assets/images/${product.image}`,
    brand: {
      "@type": "Brand",
      name: companyInfo.name,
    },
    manufacturer: {
      "@type": "Organization",
      name: companyInfo.name,
      url: `https://${companyInfo.website}`,
    },
    material: product.materials.join(", "),
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: companyInfo.name,
      },
    },
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

// ── FAQPage Schema ────────────────────────────────────────────────────────────

interface FAQSchemaProps {
  faqs?: { question: string; answer: string }[];
}

/**
 * FAQSchema — generates FAQPage JSON-LD for rich results in Google Search.
 */
export const FAQSchema: React.FC<FAQSchemaProps> = ({ faqs }) => {
  if (!faqs || faqs.length === 0) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};
