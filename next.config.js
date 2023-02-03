/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  compiler: {
    styledComponents: true | {
      ssr: true,
    },
  },
  images: {
    domains: ['randomuser.me', 'lh3.googleusercontent.com', 'avatars.githubusercontent.com'],
  }
}

module.exports = nextConfig