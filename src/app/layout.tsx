'use client';

import Footer from "./footer/page";
import "./globals.css";
import { useState, useEffect } from "react";
import Loading from "./components/loading/page";

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



  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Russo+One&family=Kdam+Thmor+Pro&family=Londrina+Solid:wght@100;300;400;900&family=Bebas+Neue&family=Bricolage+Grotesque:opsz,wght@12..96,200..800&family=Kanit:wght@100;200;300;400;500;600;700;800;900&family=DM+Sans:wght@100;200;300;400;500;600;700;800;900&family=Atma:wght@300;400;500;600;700&family=Alfa+Slab+One&family=Bubbler+One&display=swap" rel="stylesheet" />
      </head>
      <body>

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