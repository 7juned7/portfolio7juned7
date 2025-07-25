import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import BallGame from "@/components/BallGame";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* Prevent Flash of Incorrect Theme */}
        <Script id="theme-switcher" strategy="beforeInteractive">
          {`
            document.documentElement.classList.toggle(
              "dark",
              localStorage.theme === "dark" ||
                (!("theme" in localStorage) &&
                  window.matchMedia("(prefers-color-scheme: dark)").matches)
            );
          `}
        </Script>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
  
      </body>
    </html>
  );
}

