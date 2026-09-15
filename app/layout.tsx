import type { Metadata } from "next";
import Script from 'next/script';
// import { Geist, Geist_Mono, Inter } from "next/font/google";
// import { Pixelify_Sans } from "next/font/google";
import {Providers} from './Providers'
import Navigation from './components/Navigation'
import "./globals.css";

// const inter = Inter({ 
//   subsets: ['latin'],
//   variable: '--font-inter', // Creamos una variable CSS
// });

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const pixelify = Pixelify_Sans({
//   variable: "--font-pixelify",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  metadataBase: new URL("https://pixelrun-ten.vercel.app"),
  title: {
    default: "PixelRun | Gana Dinero Jugando y Viendo Anuncios",
    template: "%s | PixelRun",
  },
  description:
    "Juega minijuegos, mira anuncios y acumula puntos para canjear por dinero real en PixelRun. Sube de nivel, completa misiones y retira tu saldo fácilmente.",
  keywords: [
    "PixelRun",
    "PixelRun Ten",
    "ganar dinero jugando",
    "juegos para ganar dinero",
    "ganar puntos viendo anuncios",
    "recompensas por jugar",
    "juegos retro ganar dinero",
    "retirar saldo juegos",
  ],
  authors: [{ name: "PixelRun" }],
  creator: "PixelRun",
  publisher: "PixelRun",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://pixelrun-ten.vercel.app",
    title: "PixelRun | Gana Dinero Jugando y Viendo Anuncios",
    description:
      "Acumula puntos, sube de nivel y canjea tu saldo por dinero real en PixelRun.",
    siteName: "PixelRun",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PixelRun Dashboard - Gana dinero jugando",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PixelRun | Gana Dinero Jugando y Viendo Anuncios",
    description:
      "Acumula puntos, sube de nivel y canjea tu saldo por dinero real en PixelRun.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // <html lang="en" className={`${pixelify.className}`}>
    <html 
    lang="en" className={``}>
    <head>
      <meta name="google-site-verification" content="1_Sf3KSAwHVtz7nXqWKJo8mU7yKPYjPUZ_AUNYwxykI" />
      <meta name="google-adsense-account" content="ca-pub-9158230735641941"></meta>
      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9158230735641941"
      crossOrigin="anonymous"></script>
    </head>
      <body className="scrollTransaction relative overflow-y-auto md:overflow-y-hidden overflow-x-hidden">
        <Providers>
          <Navigation /> {/* Ahora sí funcionará como Server Component */}
          <main className="">{children}</main>
        </Providers>
      </body>
    </html>
  )
}
