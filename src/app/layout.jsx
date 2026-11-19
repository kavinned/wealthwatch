import { Manrope } from "next/font/google";
import "./globals.css";
import AuthProvider from "./providers";
import NavBar from "./(components)/NavBar";
import DemoBanner from "./(components)/DemoBanner";
import Head from "next/head";

const manrope = Manrope({ subsets: ["latin"] });

export const metadata = {
  title: "WealthWatch",
  description:
    "A budget and transaction tracker with stock tracking functionality.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <meta http-equiv="x-ua-compatible" content="ie=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <body className={manrope.className}>
        <AuthProvider>
          <NavBar />
          <DemoBanner />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
