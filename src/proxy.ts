import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Protected routes
const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/admin(.*)",
  "/staff(.*)",
  "/api/protected(.*)",
  "/api/checkout(.*)",
]);
export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and static files
    "/((?!_next|[^?]*\\.(?:html?|css|js|json|jpe?g|png|gif|svg|ico|ttf|woff2?|map)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
