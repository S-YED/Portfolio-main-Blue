import "@/app/globals.css";
import { ThemeProvider } from "next-themes";
import { Metadata, Viewport } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";

export const viewport: Viewport = {
  themeColor: "#38b6ff",
};

// Favicon served from /public (bypasses the catch-all @svgr/webpack rule in
// next.config.mjs, which would otherwise break the app/icon.svg convention).
export const metadata: Metadata = {
  icons: { icon: "/icon.svg" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        style={{
          overflowX: "hidden",
          overflowY: "auto",
        }}
        className={`antialiased dark:bg-[#282c33] bg-[var(--sky-light)] scroll-smooth`}
      >
        <ThemeProvider attribute="class" defaultTheme="light">
          {children}
          {process.env.G_ANALYTICS_ID && (
            <GoogleAnalytics
              gaId={process.env.G_ANALYTICS_ID}
              debugMode={false}
            />
          )}
        </ThemeProvider>
      </body>
    </html>
  );
}
