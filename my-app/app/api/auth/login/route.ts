import { prisma } from "@/app/lib/prisma";
import { signToken } from "@/app/lib/auth";

export async function POST(request: Request) {
    const { email, password } = await request.json();

    const user = await prisma.user.findUnique({
        where: { email }
    });

    if (!user) {
        return Response.json({ error: "User not found" }, { status: 404 });
    }

    if (user.password !== password) {
        return Response.json({ error: "Invalid password" }, { status: 401 });
    }

    const token = await signToken({ email: user.email, id: user.id });

    return Response.json({ token });
}
