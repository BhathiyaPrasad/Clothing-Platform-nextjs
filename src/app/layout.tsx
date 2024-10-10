import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import FloatingSocialButton from "@components/common/FloatButton";

const inter = Roboto({
  weight: '400',
  subsets: ['latin']
});

export const metadata: Metadata = {
  title: "Saluni Fashion",
  description: "Created by Interithm",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <div><FloatingSocialButton /></div>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
