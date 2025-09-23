import { Geist, Open_Sans} from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const openSans = Open_Sans({ 
  subsets: ['latin'], weight: ['400', '600', '700'],
  variable: "--font-open-sans",
});

export const metadata = {
  title: "Harsh's Portfolio",
  description: "Welcome to Harshs Portfolio - Showcasing My Projects and Skills",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${openSans.variable} ${openSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
