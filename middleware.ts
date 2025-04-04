import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { routeAccess } from "./lib/routes";
import { NextResponse } from "next/server";

const matchers = Object.keys(routeAccess).map((route) => ({
  matcher: createRouteMatcher([route]),
  allowedRoles: routeAccess[route],
}));

export default clerkMiddleware((auth, request) => {
  const { userId, sessionClaims } = auth();

  const role = (sessionClaims?.metadata as { role?: string })?.role;

  console.log(role);

  for (const { matcher, allowedRoles } of matchers) {
    if (role && userId) {
      if (matcher(request) && !allowedRoles.includes(role)) {
        return NextResponse.redirect(new URL(`/${role}`, request.url));
      }
    }
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
