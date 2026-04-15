import { prisma } from "@/app/lib/prisma";
import {jwtVerify} from 'jose'

export async function POST(request: Request) {
    const { email, password } = await request.json();


const user = await prisma.user.findUnique({
    where: { email }
  });

  if (!user) {
    return new Response("User not found", { status: 404 });
  }

  if (user.password !== password) {
    return new Response("Invalid password", { status: 401 });
  }

  return new Response("Login successful", { status: 200 });

  
}
