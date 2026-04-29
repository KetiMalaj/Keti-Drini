import { prisma } from "@/app/lib/prisma";

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return new Response(JSON.stringify({ error: "Email and password are required" }), {
                status: 400,
            });
        }

        const existingUser = await prisma.user.findUnique({
            where: { email },
        });
        if (existingUser) {
            return new Response(JSON.stringify({ error: "User already exists" }), {
                status: 400,
            });
        }
        await prisma.user.create({
            data: {
                email,
                password,
            },
        });
        return new Response(JSON.stringify({ message: "User created successfully" }), {
            status: 201,
        });
    } catch (error) {
        console.error("Registration error:", error);
        return new Response(JSON.stringify({ error: "Internal server error" }), {
            status: 500,
        });
    }
}