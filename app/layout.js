import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from '@vercel/speed-insights/next';
import { AuthProvider } from "./Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Bitlinks - Your trusted URL shortener",
  description: "Bitlinks helps you shorten your Urls easily",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-purple-50`}
      >
        {/* Wrap the ENTIRE visual app in the AuthProvider */}
        <AuthProvider>
          <Navbar />
          <main>{children}</main>
        </AuthProvider>
         
        {/* Analytics tools can sit quietly at the bottom of the body */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}