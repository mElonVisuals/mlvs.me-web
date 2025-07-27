import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "MLVS - Digital Creator & Developer",
  description:
    "Creating digital experiences with code, graphics, and cinematics. Explore FiveM development, creative projects, and technical documentation.",
  keywords: ["developer", "FiveM", "web development", "graphics", "cinematics", "digital creator", "MLVS"],
  authors: [{ name: "MLVS" }],
  creator: "MLVS",
  publisher: "MLVS",
  robots: "index, follow",

  // Open Graph / Facebook
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mlvs.me",
    siteName: "MLVS",
    title: "MLVS - Digital Creator & Developer",
    description:
      "Creating digital experiences with code, graphics, and cinematics. Explore FiveM development, creative projects, and technical documentation.",
    images: [
      {
        url: "https://mlvs.me/og-image.png",
        width: 1200,
        height: 630,
        alt: "MLVS - Digital Creator & Developer",
        type: "image/png",
      },
    ],
  },

  // Twitter
  twitter: {
    card: "summary_large_image",
    site: "@mlvs",
    creator: "@mlvs",
    title: "MLVS - Digital Creator & Developer",
    description:
      "Creating digital experiences with code, graphics, and cinematics. Explore FiveM development, creative projects, and technical documentation.",
    images: ["https://mlvs.me/og-image.png"],
  },

  // Additional meta tags
  other: {
    "theme-color": "#8B5CF6",
    "msapplication-TileColor": "#8B5CF6",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
  },

  // Verification (add your actual verification codes if you have them)
  verification: {
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },

  // Manifest
  manifest: "/manifest.json",

  // Icons
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    other: [{ rel: "mask-icon", url: "/safari-pinned-tab.png", color: "#8B5CF6" }],
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        {/* Additional meta tags for better SEO */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="format-detection" content="telephone=no" />
        <link rel="canonical" href="https://mlvs.me" />

        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "MLVS",
              jobTitle: "Digital Creator & Developer",
              description: "Creating digital experiences with code, graphics, and cinematics",
              url: "https://mlvs.me",
              sameAs: [
                // Add your social media URLs here
                // "https://github.com/yourusername",
                // "https://linkedin.com/in/yourusername",
              ],
              knowsAbout: [
                "Web Development",
                "FiveM Development",
                "Graphics Design",
                "Video Production",
                "JavaScript",
                "React",
              ],
            }),
          }}
        />
        <style>{`
html {
  font-family: ${inter.style.fontFamily};
  --font-sans: ${inter.style.fontFamily};
}
        `}</style>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
