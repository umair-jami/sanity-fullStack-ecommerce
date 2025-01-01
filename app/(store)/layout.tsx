import type { Metadata } from "next";
import "../globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/Header";
import { SanityLive } from "@/sanity/lib/live";
import { draftMode } from "next/headers";
import DisableDraftMode from "@/components/ui/DisableDraftMode";
import { VisualEditing } from "next-sanity";

const icon ="/Screenshot 2025-01-01 110103.png"

export const metadata: Metadata = {
  title: "Shop.co",
  description: "Buy Anything You Want",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider dynamic>
      <html lang="en">
        <head>
          <link rel="icon" href={icon} />
        </head>
        <body>
          {(await draftMode()).isEnabled && (
            <>
              <DisableDraftMode />
              <VisualEditing/>
            </>
          )}
          <main>
            <Header />
            {children}
            <SanityLive />
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
