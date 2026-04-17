import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyAuth } from "@/app/lib/auth";


export async function proxy(request: NextRequest) {
    const url = request.nextUrl;
    const pathname = url.pathname;
    // const method = request.method;

    if (
        pathname.startsWith("/_next") ||
        pathname.startsWith("/favicon") ||
        pathname.includes(".")
    ) {
        return NextResponse.next();
    }

    const token = request.cookies.get("token")?.value;
    const verifiedToken = token && (await verifyAuth(token).catch(console.error));

    if (pathname.startsWith("/auth")) {
        return verifiedToken
            ? NextResponse.redirect(new URL("/Home", request.url))
            : NextResponse.next();
    }

    if (pathname.startsWith("/api/auth/register")) {
        return NextResponse.next();
    }

    if (pathname.startsWith("/api/auth")) {
        return verifiedToken
            ? NextResponse.redirect(new URL("/Home", request.url))
            : NextResponse.next();
    }

    if (!verifiedToken) {
        return NextResponse.redirect(new URL("/auth/login", request.url));
    }
}