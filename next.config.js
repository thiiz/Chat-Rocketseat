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
    NEXT_PUBLIC_AUTH_DOMAIN: process.env.AUTH_DOMAIN,
    NEXT_PUBLIC_PROJECT_ID: process.env.PROJECT_ID,
    NEXT_PUBLIC_STORAGE_BUCKET: process.env.STORAGE_BUCKET,
    NEXT_PUBLIC_APP_ID: process.env.APP_ID,
  },
}

module.exports = nextConfig