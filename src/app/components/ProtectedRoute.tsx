'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/auth/loginpage');
    }
  }, [user, loading, router]);

  // Show nothing while loading or if not authenticated
  if (loading || !user) {
    return null;
  }

  // If authenticated, show the protected content
  return <>{children}</>;
};

export default ProtectedRoute;
