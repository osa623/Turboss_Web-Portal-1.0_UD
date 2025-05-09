'use client';

import Footer from "./footer/page";
import "./globals.css";
import { useState, useEffect } from "react";
import Loading from "./components/loading/page.tsx"; // Import the loading component
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();
  
  // Check if the current path is the registration page
  // The usePathname() hook returns the current path starting with "/"
  const isRegistrationPage = pathname === "/auth/registerpage" || 
                             pathname?.startsWith("/auth/registerpage/");

  const isLoginPage = pathname === "/auth/loginpage" ||
                      pathname?.startsWith("/auth/loginpage/");

  // For debugging
  useEffect(() => {
    console.log("Current pathname:", pathname);
    console.log("Is registration page:", isRegistrationPage);
  }, [pathname, isRegistrationPage]);

  useEffect(() => {
    // Simulate loading time (e.g., fetching data or assets)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 10000); // Adjust the duration as needed

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
            {!isRegistrationPage && !isLoginPage &&  <Footer />} {/* Render footer only when not on registration page */}
          </>
        )}
      </body>
    </html>
  );
}