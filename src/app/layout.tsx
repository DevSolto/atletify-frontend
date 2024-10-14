import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { NextAuthSessionProvider } from "../providers/sessionProvider";

const poppins = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900',],
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: "Atléticas"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={`${poppins.className} w-screen h-screen flex items-center justify-center antialiased`}
      >
        <NextAuthSessionProvider>
          {children}
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}
