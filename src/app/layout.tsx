import type { Metadata } from "next";
import { SensoryProvider } from "@/providers/sensory-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mathe-App",
  description: "Neuroinklusive Mathe-Lern-App fuer Grundschulkinder",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" data-sensory="standard">
      <body className="antialiased min-h-screen bg-background text-foreground">
        <SensoryProvider>
          {children}
        </SensoryProvider>
      </body>
    </html>
  );
}
