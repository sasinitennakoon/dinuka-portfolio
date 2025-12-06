// app/layout.js
import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import { Noto_Sans_Sinhala } from "next/font/google";

import FontLoader from './data/FontLoader.js'; // Import your FontLoader component
import Snow from "../components/Snow.js";

import Script from "next/script";



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

// SEO Metadata - OPTIMIZED FOR SEARCH ENGINES
export const metadata = {
  // --- Primary SEO Tags ---
  title: "Dinuka Gunawardana | Visual Artist & Creative Services in Colombo",
  description:
    "Multidisciplinary visual artist & dedicated freelancer (Photography, Videography, Editing, Graphic Design). Founder of IMAGIC CREATION. Let's bring your vision to life.",
  keywords: [
    // Core Keywords
    "dinuka",
    "dinuka gunawardana",
    "Dinuka lst",
    "Dinuka LST",
    "dinuka lst",
    "dinuka lst",
    "Dinuka",
    "Gunawardana",
    "Dinuka Gunawardana",
    "Multidisciplinary visual artist",
    "Creative services Sri Lanka",
    "Freelance photographer Colombo",
    "Videography services Sri Lanka",
    "Graphic designer freelancer",
    "Video editing services",
    "IMAGIC CREATION",
    // Supporting Keywords
    "Storytelling through art",
    "High-quality digital content",
    "Innovative visual solutions",
    "Commercial photography",
    "Cinematic videography",
    "Visual branding",
    "Post-production services",
    "Freelance editing",
  ],
  // --- Open Graph (Social Sharing) ---
  openGraph: {
    title: "Dinuka Gunawardana | Visual Artist & Creative Services",
    description:
      "Multidisciplinary visual artist & dedicated freelancer (Photography, Videography, Editing, Graphic Design). Founder of IMAGIC CREATION. Let's bring your vision to life.",
    url: "https://www.dinukagunawardana.web.lk",
    siteName: "Dinuka Gunawardana",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Dinuka Gunawardana Portfolio and Creative Services",
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
      {/*Google Adsense*/}
        <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4143609489488085"
     crossOrigin="anonymous"></Script>
      <body className="antialiased">
        
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-845JG1EVJR"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-845JG1EVJR');
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
        <Snow />
        {children}
      </body>
    </html>
  );
}