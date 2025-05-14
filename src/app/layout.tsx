'use client';

import Footer from "./footer/page";
import "./globals.css";
import { useState, useEffect } from "react";
import Loading from "./components/loading/page.tsx"; // Import the loading component
import { usePathname, useRouter } from "next/navigation";
import { AuthProvider } from './context/AuthContext';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();
  
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

  // Redirect to registration page if it's the first visit
  useEffect(() => {
    // Only perform the redirect when not loading and on the root path
    if (!isLoading && (pathname === "/" || pathname === "")) {
      // Directly redirect to registration page without checking localStorage
      router.replace('/auth/registerpage');
    }
  }, [pathname, isLoading, router]);

  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {isLoading ? (
            <Loading /> // Show the loading screen when loading
          ) : (
            <>
              <main>{children}</main>
              {!isRegistrationPage && !isLoginPage &&  <Footer />} {/* Render footer only when not on registration page */}
            </>
          )}
        </AuthProvider>
      </body>
    </html>
  );
}