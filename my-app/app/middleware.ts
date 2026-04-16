import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyAuth } from "./lib/auth";


export async function middleware(request: NextRequest) {
    const url = request.nextUrl;
    const pathname = url.pathname;
    const method = request.method;

    const token = request.headers.get("Authorization")?.split(" ")[1];
    const verifiedToken = token && await verifyAuth(token).catch(console.error);

    if (pathname.startsWith("/api/auth")) {
        return verifiedToken
            ? NextResponse.redirect(new URL("/Home", request.url))
            : NextResponse.next();
    }

    if (pathname.includes("/api/auth/register")) {
        return NextResponse.next();
    }

    if (!verifiedToken) {
        return NextResponse.redirect(new URL("/auth/login", request.url));
    }
}