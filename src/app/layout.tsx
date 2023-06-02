import { Inter } from "next/font/google";

import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata = {
  title: "Mini Shop",
  description: "Mini Shop",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} min-h-screen flex flex-col justify-between`}
      >
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
