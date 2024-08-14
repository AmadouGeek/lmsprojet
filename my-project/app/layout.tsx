import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/app/context/authcontext"; // Assurez-vous que le chemin est correct

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LMS Formation",
  description: "Plateforme de gestion de formation et formateurs",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
