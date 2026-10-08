import type { Metadata, Viewport } from "next";
import { Schibsted_Grotesk } from "next/font/google";
import "./globals.css";

const grotesk = Schibsted_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio.colocweb.com"),
  title: "Harsh Ahuja",
  description:
    "Full-stack engineer and MSE student in Computer Science at Johns Hopkins, interested in ML research. I build and run Coloc, a campus app used by thousands of students.",
  openGraph: {
    title: "Harsh Ahuja",
    description: "Full-stack engineer, interested in ML research. I build and run Coloc, a campus app used by thousands of students.",
    url: "/",
    images: ["/coloc.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#f3f4f6",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={grotesk.className}>{children}</body>
    </html>
  );
}
