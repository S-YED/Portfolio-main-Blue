/** @type {import('next').NextConfig} */
const nextConfig = {
    compiler: {
        styledComponents: true
    },
    images: {
        // Local, self-authored SVG cover art for projects and blog headers
        dangerouslyAllowSVG: true,
        contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    },
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ["@svgr/webpack"],
        });

        return config;
    },
    reactStrictMode: false,  // Turn off because the world is rendering twice
    // The blog merged into /work (2026-10-30). Permanent redirects keep every old
    // link, share card and search result working.
    async redirects() {
        return [
            { source: "/blog", destination: "/work", permanent: true },
            { source: "/blog/:slug", destination: "/work/notes/:slug", permanent: true },
        ];
    },
};

export default nextConfig;
