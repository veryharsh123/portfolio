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

// Runs before first paint so the page never flashes the wrong theme: the
// visitor's last choice from the lamp, else their system setting.
const themeScript = `try{var t=localStorage.getItem("theme")}catch(e){}if(t!=="light"&&t!=="dark")t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";document.documentElement.dataset.theme=t`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={grotesk.className}>{children}</body>
    </html>
  );
}
