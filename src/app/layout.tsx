'use client';

import Footer from "./footer/page";
import "./globals.css";
import { useState, useEffect } from "react";
import Loading from "./components/loading/page";
import { 
  poppins, russoOne, kdamThmorPro, londrinaSolid, bebasNeue, 
  kanit, dmSans, alfaSlabOne, bubblerOne 
} from './fonts';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 10000); 

    return () => clearTimeout(timer);
  }, []);

  // Combine all font variables for the body class
  const fontClasses = [
    poppins.variable,
    russoOne.variable,
    kdamThmorPro.variable,
    londrinaSolid.variable,
    bebasNeue.variable,
    kanit.variable,
    dmSans.variable,
    alfaSlabOne.variable,
    bubblerOne.variable,
  ].join(' ');

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body className={fontClasses}>
          {isLoading ? (
            <Loading />
          ) : (
            <>
              <main>{children}</main>
              <Footer />
            </>
          )}
      </body>
    </html>
  );
}