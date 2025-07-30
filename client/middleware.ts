import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Public routes that don't need auth
  if (pathname === '/') {
    return NextResponse.next()
  }
  
  // Check for Clerk session cookie
  const sessionCookie = request.cookies.get('__session') || request.cookies.get('__clerk_db_jwt')
  
  if (!sessionCookie) {
    // Redirect to sign-in if no session
    return NextResponse.redirect(new URL('/sign-in', request.url))
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}