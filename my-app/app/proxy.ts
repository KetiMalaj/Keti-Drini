import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyAuth } from "./lib/auth";


export async function proxy(request: NextRequest) {
    const url = request.nextUrl;
    const pathname = url.pathname;
    // const method = request.method;

    const token = request.headers.get("Authorization")?.split(" ")[1];
    const verifiedToken = token && (await verifyAuth(token).catch(console.error));

    if (pathname.startsWith("/api/auth/register")) {
        return NextResponse.next();
    }

    if (pathname.startsWith("/api/auth")) {
        if (verifiedToken) {
            return NextResponse.redirect(new URL("/home", request.url));
        }
        return NextResponse.next();
    }

    if (!verifiedToken) {
        return NextResponse.redirect(new URL("/auth/login", request.url));
    }
}