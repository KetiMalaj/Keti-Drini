import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const { email, password } = await request.json();

    const user = await prisma.user.findUnique({
        where: { email },
    });

    if (user && user.password === password) { 
        return new Response(JSON.stringify({ message: 'Login successful' }), {
            status: 200,
        });
    } else {
        return new Response(JSON.stringify({ message: 'Invalid email or password' }), {
            status: 401,
        });
    }
   
}
