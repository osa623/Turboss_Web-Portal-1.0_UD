'use client';

import Footer from "./footer/page";
import "./globals.css";
import { useState, useEffect } from "react";
import Loading from "./components/loading/page.tsx"; // Import the loading component

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
    }, 2000); // Adjust the duration as needed

    return () => clearTimeout(timer);
  }, []);

  return (
    <html lang="en">
      <body>
        {isLoading ? (
          <Loading /> // Show the loading screen when loading
        ) : (
          <>
            <main>{children}</main>
            <Footer /> {/* Render footer only when loading is complete */}
          </>
        )}
      </body>
    </html>
  );
}
