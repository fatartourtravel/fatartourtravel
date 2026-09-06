import type { Metadata } from "next";
import "../../globals.css";

export const metadata: Metadata = {
  title: "Admin harga | FATAR Tour & Travel",
  robots: { index: false, follow: false, nocache: true },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
