import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/providers/ReduxProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// D:\akmotors\public\apple-touch-icon.png
export const metadata: Metadata = {
  title: "AK MOTORS",
  description: "Bike service and spare parts",
  icons: {
    icon: "/apple-touch-icon.png", // favicon
  },
  openGraph: {
    title: "AK MOTORS",
    description: "Bike service and spare parts",
    url: "https://akmotorspatan.netlify.app/",
    siteName: "AK MOTORS",
    images: [
      {
        url: "/LandingPage/newLogo.png",
        width: 800,
        height: 600,
        alt: "AK MOTORS Logo",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AK MOTORS",
    description: "Bike service and spare parts",
    images: ["/LandingPage/newLogo.png"],
  },
  verification: {
    google: "u2rxMqqfwuZSv8Y-AEIn5qFIuYG5aN5uuTcv_pxgAL4",
  },
};

<meta
  name="google-site-verification"
  content="u2rxMqqfwuZSv8Y-AEIn5qFIuYG5aN5uuTcv_pxgAL4"
/>;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
