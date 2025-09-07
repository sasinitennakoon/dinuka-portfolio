// app/layout.js
import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import { Noto_Sans_Sinhala } from "next/font/google";
import FontLoader from './data/FontLoader.js'; // Import your FontLoader component

// Noto Sans Sinhala - use optional display to avoid FOUT/FOIT
const notoSinhala = Noto_Sans_Sinhala({
  variable: "--font-noto-sinhala",
  subsets: ["sinhala"],
  weight: ["400", "500", "600", "700"],
  display: "optional", // Changed to optional to avoid flash
  preload: true, // Ensure it's preloaded
});

// Geist Sans
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// Geist Mono
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Dinuka Gunawardana",
  description: "Portfolio built for Mr.Dinuka Gunawardana",
  icons: {
    icon: '/Favicon.png', // Added forward slash
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="si" className={`${notoSinhala.variable} ${geistSans.variable} ${geistMono.variable} font-loading`}>
      <head>
        {/* Remove the duplicate link tag - metadata.icons already handles this */}
        {/* Preload the Sinhala font */}
        <link
          rel="preload"
          href="https://fonts.gstatic.com/s/notosanssinhala/v25/7AujH9_SW0UO7sz9VLFh1MiQhq6u6OR5SeMj4.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body className="antialiased">
        <FontLoader />
        {children}
      </body>
    </html>
  );
}