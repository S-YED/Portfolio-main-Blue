import type { Metadata } from "next";
import "@/app/globals.css";
import { Footer } from "@/app/ui/universal/Footer";
import { Navbar } from "@/app/ui/universal/Navbar";
import { CursorLight } from "../ui/components/cursor-light";
import { MotionProvider } from "../ui/components/MotionProvider";
import metaDataImg from "@/public/assets/metadata/landing.png";
import CloudBackground from "@/app/ui/components/CloudBackground";

const siteUrl = process.env.SITE_URL ?? "https://syedkm.com";
const siteName = process.env.SITE_NAME ?? "syedkm.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Syed Khaja Moinuddin | Portfolio",
  description:
    "Portfolio of Syed Khaja Moinuddin - Full Stack Developer, Cloud & DevOps enthusiast based in Bengaluru, India.",
  keywords: [
    "portfolio",
    "full stack developer",
    "backend developer",
    "DevOps",
    "cloud",
    "software developer",
    "Syed Khaja Moinuddin",
  ],
  authors: { name: "Syed Khaja Moinuddin", url: siteName },
  robots: "index, follow",
  openGraph: {
    title: "Syed Khaja Moinuddin | Portfolio",
    description:
      "Portfolio of Syed Khaja Moinuddin - Full Stack Developer, Cloud & DevOps enthusiast based in Bengaluru, India.",
    url: siteUrl,
    type: "profile",
    locale: "en_US",
    siteName: siteName,
    images: metaDataImg.src,
  },
  twitter: {
    // landing.png is 1200x630, so the large card is the right variant.
    card: "summary_large_image",
    title: "Syed Khaja Moinuddin | Portfolio",
    description:
      "Portfolio of Syed Khaja Moinuddin - Full Stack Developer, Cloud & DevOps enthusiast based in Bengaluru, India.",
    creator: "@skm_ahmed1",
    site: siteName,
    images: metaDataImg.src,
  },
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <MotionProvider>
      <CursorLight />
      <div className="wrapper flex w-full h-fit relative overflow-hidden">
        <CloudBackground />
        <div className="gradient-blurred fixed w-full h-dvh -z-10 bg-transparent bg-gradient-to-br top-0 left-0 from-[var(--gradient-from)] dark:to-[#282c33] to-[var(--sky-light)] to-45% opacity-15 blur-md"></div>
        <div className="contents-wrapper relative flex flex-col w-full h-fit gap-10 z-10">
          <section className="navbar w-full h-fit relative z-30">
            <Navbar />
          </section>
          <section className="w-full h-full page-contents relative z-20">
            {children}
          </section>
          <section className="footer-and-gpt w-full h-fit flex items-center justify-center z-20">
            <Footer />
          </section>
        </div>
      </div>
    </MotionProvider>
  );
}
