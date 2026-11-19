/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    // Legacy flat routes → /app console (permanent, keeps old links & README working)
    return [
      { source: '/dashboard', destination: '/app/analytics', permanent: true },
      { source: '/compliance', destination: '/app/compliance', permanent: true },
      { source: '/roi', destination: '/app/roi', permanent: true },
      { source: '/shipments', destination: '/app/shipments', permanent: true },
      { source: '/shipments/:id', destination: '/app/shipments/:id', permanent: true },
    ];
  },
};

export default nextConfig;
