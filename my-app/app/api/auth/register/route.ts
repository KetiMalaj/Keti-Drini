import { prisma } from "@/app/lib/prisma";

export async function POST(request: Request) {
    const { email, password } = await request.json();

    const existingUser = await prisma.user.findUnique({
        where: {
            email: email,
        },
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
}