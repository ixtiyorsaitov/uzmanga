import type { Metadata } from "next";
import { Exo_2 } from "next/font/google";
import "./globals.css";
import Providers from "@/components/providers";
import { cn } from "@/lib/utils";

const fontExo2 = Exo_2({ subsets: ["latin"], variable: "--font-exo-2" });

export const metadata: Metadata = {
  title: "UzManga - Eng yangi mangalar",
  description: "UzManga - Eng yangi mangalar",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      suppressHydrationWarning
      lang="en"
      className={cn(
        fontExo2.variable,
        fontExo2.className,
        "scrollbar-thin scrollbar-thumb-primary scrollbar-track-background",
      )}
    >
      <body
        suppressHydrationWarning
        className="antialiased selection:bg-primary selection:text-white"
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
