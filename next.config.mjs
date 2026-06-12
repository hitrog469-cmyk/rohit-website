/** @type {import('next').NextConfig} */

// Static-site security headers: the site has no auth, no API, no user data —
// these lock down the few browser-level vectors that exist for a public site.
const securityHeaders = [
  // Disallow embedding in iframes — prevents clickjacking overlays
  { key: "X-Frame-Options", value: "DENY" },
  // Browsers must respect declared content types — blocks MIME sniffing
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Don't leak full URLs to third-party sites
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // This site never needs these browser APIs
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
];

const nextConfig = {
  // No remote images are used anywhere — leaving the image optimizer closed
  // (a wildcard remotePatterns would let strangers proxy arbitrary images
  // through this deployment's optimizer and burn bandwidth).
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
  webpack: (config) => {
    // Required for Three.js
    config.externals = config.externals || [];
    return config;
  },
};

export default nextConfig;
