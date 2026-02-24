import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

// Routes that require authentication
const isProtectedRoute = createRouteMatcher([
  // (pages) protected routes
  '/feed(.*)',
  '/profile(.*)',
  '/setting(.*)',
  '/community(.*)',
  '/learn(.*)',
  // (platform) routes — all protected
  '/accommodation(.*)',
  '/ads(.*)',
  '/ai(.*)',
  '/communities(.*)',
  '/enroll(.*)',
  '/events(.*)',
  '/groups(.*)',
  '/map(.*)',
  '/marketplace(.*)',
  '/messages(.*)',
  '/opportunities(.*)',
  '/schools(.*)',
  '/universities(.*)',
  '/watch(.*)',
]);

// Auth pages that signed-in users should not access
const isAuthRoute = createRouteMatcher([
  '/auth/signin(.*)',
  '/auth/signup(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
  // Redirect authenticated users away from auth pages
  if (isAuthRoute(req)) {
    const { userId } = await auth();
    if (userId) {
      return NextResponse.redirect(new URL('/feed', req.url));
    }
  }

  // Protect routes that require authentication
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
