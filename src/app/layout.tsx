import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "YieldScout - DeFi Yield Aggregator Dashboard",
    template: "%s | YieldScout",
  },
  description:
    "Compare DeFi yield opportunities across chains and protocols with clean pool discovery, APY/TVL insights, and modern analytics UI.",
  keywords: [
    "DeFi yield aggregator",
    "crypto yield dashboard",
    "liquidity pool comparison",
    "APR APY tracker",
    "TVL analytics",
    "multi-chain DeFi analytics",
    "Uniswap yield tracker",
    "SushiSwap pools",
    "Web3 analytics dashboard",
    "Next.js DeFi project",
  ],
  authors: [{ name: "Khalil Ahmed", url: "https://www.khalilahmed.dev" }],
  creator: "Khalil Ahmed",
  metadataBase: new URL("https://defi-yield-aggregator-dashboard.vercel.app/"),
  openGraph: {
    title: "YieldScout - DeFi Yield Aggregator Dashboard",
    description:
      "Analyze and compare DeFi pools with APY and TVL insights across multiple protocols and chains.",
    url: "https://defi-yield-aggregator-dashboard.vercel.app/",
    siteName: "YieldScout",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "YieldScout DeFi Yield Dashboard",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "YieldScout - DeFi Yield Aggregator Dashboard",
    description:
      "Compare DeFi pool yields, APY, and TVL across chains in a clean and fast dashboard.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
