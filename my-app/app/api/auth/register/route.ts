const users: {email: string, password: string}[] = [];

export async function POST(request: Request) {
    const body = await request.json();
    const { email, password } = body;

    const existingUser = users.find((user) => user.email === email);
    if (existingUser) {
        return new Response(JSON.stringify({ error: "User already exists" }), {
            status: 400,
        });
    }

    const newUser = { email, password };
    users.push(newUser);

    return new Response(JSON.stringify({ message: "User created successfully" }), {
        status: 201,
    });
}