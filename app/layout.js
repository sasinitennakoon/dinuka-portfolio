// app/layout.js
import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import { Noto_Sans_Sinhala } from "next/font/google";
import Script from "next/script";
import FontLoader from "./data/FontLoader.js";

// Fonts
const notoSinhala = Noto_Sans_Sinhala({
  variable: "--font-noto-sinhala",
  subsets: ["sinhala"],
  weight: ["400", "500", "600", "700"],
  display: "optional",
  preload: true,
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// SEO Metadata
export const metadata = {
  title: "Dinuka Gunawardana | Creative Visual Artist",
  description:
    "I'm Dinuka Gunawardana — a Creative Visual Artist. Explore my portfolio, creative works, and design case studies.",
  keywords: [
    "Dinuka Gunawardana",
    "Creative Visual Artist",
    "Photographer",
    "Portfolio",
    "Sri Lanka",
    "Graphic Designer",
    "Videographer",
  ],
  openGraph: {
    title: "Dinuka Gunawardana | Creative Visual Artist",
    description:
      "Explore Dinuka Gunawardana’s work in creative visual arts. Discover projects, case studies, and more.",
    url: "https://www.dinukagunawardana.we.lk",
    siteName: "Dinuka Gunawardana",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Dinuka Gunawardana Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico", // Recommended for Google
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="si"
      className={`${notoSinhala.variable} ${geistSans.variable} ${geistMono.variable} font-loading`}
    >
      <body className="antialiased">
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-Y42QBFZZPQ');
          `}
        </Script>

        {/* Preload Sinhala Font */}
        <link
          rel="preload"
          href="https://fonts.gstatic.com/s/notosanssinhala/v25/7AujH9_SW0UO7sz9VLFh1MiQhq6u6OR5SeMj4.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />

        <FontLoader />
        {children}
      </body>
    </html>
  );
}
