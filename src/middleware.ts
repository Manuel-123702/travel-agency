import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/", "/about", "/services", "/contact", "/blog", "/pricing", "/api/(.*)"],
});

export const config = {
  matcher: [
    // protect admin and dashboard routes
    "/dashboard/:path*",
    "/admin/:path*",
    "/studio/:path*",
  ],
};
