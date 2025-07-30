import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  matcher: [
    "/((?!_next|static|.*\\..*).*)",
    "/", // root route
  ],
  runtime: 'nodejs', // Keep this line for successful deployment
};
