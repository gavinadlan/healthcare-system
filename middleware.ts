import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { routeMatchers } from "./lib/routes";
import { NextResponse, routeMatchers } from "next/server";

const checkRoleAndRedirect = (
  req: NextApiRequest,
  role: string | underfined,
  allowedRole: keyof typeof routeMatchers
): NextResponse | underfined => {
  if (routeMatchers[allowedRole](req) && role !== allowedRole) {
    const url = new URL("/", req.url);
    console.log("Unauthorized access, redirecting to:", url);
    return NextResponse.redirect(url);
  }
};

export default clerkMiddleware((auth, req) => {
  const { userId, sessionClaims } = await auth();

  const role = (sessionClaims?.metadata as { role?: string })?.role;

  // Role checks
  const response =
    checkRoleAndRedirect(req, role, "admin") ||
    checkRoleAndRedirect(req, role, "doctor");

  if (response) return response;
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
