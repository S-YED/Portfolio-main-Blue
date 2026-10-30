import { Metadata } from "next"; // Import the Metadata type from Next.js
import metaDataImg from "@/public/assets/metadata/blog.png"; // Import image for OpenGraph and Twitter meta

const siteUrl = process.env.SITE_URL ?? "https://syedkm.com";
const siteName = process.env.SITE_NAME ?? "syedkm.com";

const workDescription =
  "Case studies and notes from real work: QA, test automation, cloud, and lessons learned by shipping.";

// Metadata for /work: case studies plus notes (the former blog, merged 2026-10-30)
export async function generateMetadata(): Promise<Metadata> {
  // Construct metadata object
  return {
    metadataBase: new URL(siteUrl), // Base URL for metadata
    title: `Work - ${siteName}`, // Dynamic title for SEO
    description: workDescription, // Description for SEO
    keywords: ["case study", "QA", "SDET", "test automation", "cloud", "engineering"], // Keywords for SEO
    robots: "index, follow", // Instructions for search engine indexing
    openGraph: {
      title: `Work - ${siteName}`, // OpenGraph title
      description: workDescription, // OpenGraph description
      url: `${siteUrl}/work`, // URL for OpenGraph
      images: [metaDataImg.src], // Image for OpenGraph
      type: "article", // OpenGraph type
      siteName: siteName, // Site name for OpenGraph
      locale: "en_US", // Locale for OpenGraph
    },
    twitter: {
      card: "summary", // Twitter card type
      title: `Work - ${siteName}`, // Twitter title
      description: workDescription, // Twitter description
      images: [metaDataImg.src], // Image for Twitter
      creator: "@skm_ahmed1", // Twitter handle of the content creator
      site: `${siteUrl}/work`,
    },
  };
}

// Layout that wraps every /work page
export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="page-contents relative w-full h-fit flex flex-col items-center justify-center">
      {children} {/* Render children components */}
    </div>
  );
}
