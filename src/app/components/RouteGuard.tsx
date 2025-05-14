'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import Loading from './loading/page.tsx';

interface RouteGuardProps {
  children: React.ReactNode;
}

export default function RouteGuard({ children }: RouteGuardProps) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    // Auth check function
    const authCheck = () => {
      // Public paths that don't require authentication
      const publicPaths = ['/auth/loginpage', '/auth/registerpage'];
      const isPublicPath = publicPaths.some(path => 
        pathname === path || pathname?.startsWith(path + '/')
      );

      if (!loading) {
        if (!user && !isPublicPath) {
          // Not logged in and trying to access a protected route
          setAuthorized(false);
          router.push('/auth/loginpage');
        } else {
          // Either logged in or accessing a public path
          setAuthorized(true);
        }
      }
    };

    // Call auth check when route changes or auth state changes
    authCheck();
  }, [user, loading, pathname, router]);

  // Show loading screen while checking authentication
  if (loading || !authorized) {
    return <Loading />;
  }

  // Render children if authorized
  return <>{children}</>;
}
