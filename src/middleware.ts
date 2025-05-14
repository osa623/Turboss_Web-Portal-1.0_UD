import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// List of public routes that don't require authentication
const publicPaths = [
  '/auth/loginpage',
  '/auth/registerpage',
];

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Check if the current path is in the public paths list
  const isPublicPath = publicPaths.some(
    publicPath => path === publicPath || path.startsWith(`${publicPath}/`)
  );
  
  // Allow access to public paths or static files
  if (isPublicPath || 
      path.startsWith('/_next/') || 
      path.includes('/api/') || 
      path.endsWith('.ico')) {
    return NextResponse.next();
  }
  
  // Check for authentication token
  const authToken = request.cookies.get('auth')?.value;
  
  // Redirect to login if no auth token is found
  if (!authToken) {
    const loginUrl = new URL('/auth/loginpage', request.url);
    return NextResponse.redirect(loginUrl);
  }
  
  // Allow access to the protected route
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
