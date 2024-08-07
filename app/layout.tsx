import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import NextTopLoader from "nextjs-toploader";
import { AuthProvider } from "@/utils/AuthProvider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "News App",
  description: "Share your news with the world",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning suppressContentEditableWarning>
      <body className={poppins.variable}>
        <NextTopLoader
          color="#F6F8FD"
          initialPosition={0.08}
          crawlSpeed={200}
          height={2}
          crawl={true}
          // showSpinner={true}
          easing="ease"
          speed={200}
          shadow="0 0 5px #2299DD,0 0 5px #2299DD"
        />
        <AuthProvider>{children}</AuthProvider>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
