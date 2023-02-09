/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ['randomuser.me', 'lh3.googleusercontent.com', 'avatars.githubusercontent.com'],
  },
  env: {
    NEXT_PUBLIC_API_KEY_FIREBASE: process.env.API_KEY_FIREBASE,
  },
}

module.exports = nextConfig