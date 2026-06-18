import { Metadata } from "next"; // Import the Metadata type from Next.js
import metaDataImg from "@/public/assets/metadata/blog.png"; // Import image for OpenGraph and Twitter meta

const siteUrl = process.env.SITE_URL ?? "https://syedkm.com";
const siteName = process.env.SITE_NAME ?? "syedkm.com";

const blogDescription =
  "Notes from real work: QA, cloud infrastructure, and lessons learned by shipping.";

// Generate the metadata for the blogs page
export async function generateMetadata(): Promise<Metadata> {
  // Construct metadata object
  return {
    metadataBase: new URL(siteUrl), // Base URL for metadata
    title: `Blogs - ${siteName}`, // Dynamic title for SEO
    description: blogDescription, // Description for SEO
    keywords: ["blog", "QA", "testing", "cloud", "DevOps", "engineering"], // Keywords for SEO
    robots: "index, follow", // Instructions for search engine indexing
    openGraph: {
      title: `Blogs - ${siteName}`, // OpenGraph title
      description: blogDescription, // OpenGraph description
      url: `${siteUrl}/blog`, // URL for OpenGraph
      images: [metaDataImg.src], // Image for OpenGraph
      type: "article", // OpenGraph type
      siteName: siteName, // Site name for OpenGraph
      locale: "en_US", // Locale for OpenGraph
    },
    twitter: {
      card: "summary", // Twitter card type
      title: `Blogs - ${siteName}`, // Twitter title
      description: blogDescription, // Twitter description
      images: [metaDataImg.src], // Image for Twitter
      creator: "@S_YED_dev", // Twitter handle of the content creator
      site: `${siteUrl}/blog`,
    },
  };
}

// Layout component that wraps the blog page contents
export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="page-contents relative w-full h-fit flex flex-col items-center justify-center">
      {children} {/* Render children components */}
    </div>
  );
}
