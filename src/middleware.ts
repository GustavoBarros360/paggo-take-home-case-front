import { NextResponse, NextRequest } from "next/server";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/firebase/firebase.config";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  if (path === "/") {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  onAuthStateChanged(auth, (user) => {
    if (user) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  });
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
