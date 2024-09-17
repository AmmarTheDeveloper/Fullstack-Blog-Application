import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import StoreProvider from "@/app/StoreProvider";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@/app/theme-provider";
import Navbar from "@/components/Navbar/navbar";
import { ComponentLoader } from "@/helper/loader/ComponentLoader";
import Footer from "@/components/Footer/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BlogByte",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={
          "bg-[url('https://pagedone.io/asset/uploads/1691055810.png')] bg-center bg-cover " +
          inter.className
        }
      >
        <StoreProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ComponentLoader />
            <Navbar />
            <div className="pt-[100px]">{children}</div>
            <Footer />
            <Toaster />
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
