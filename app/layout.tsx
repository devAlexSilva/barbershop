import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer";
import AuthProvider from "./providers/auth";
import { Toaster } from "./components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Barbershop",
  description: "Encontre todas as baberbarias e agende um serviço próximo a você.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} dark`}>
        <AuthProvider>
          {children}
          <Toaster />
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
