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
    // Simulate loading time (e.g., fetching data or assets)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 10000); // Adjust the duration as needed

    return () => clearTimeout(timer);
  }, []);

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;700&display=swap" rel="stylesheet" />
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