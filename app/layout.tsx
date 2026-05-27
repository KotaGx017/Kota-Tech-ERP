import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "KotaTech ERP Online",
  description: "ERP online para assistência técnica"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
