
export async function POST(request: Request) {
    const body = await request.json();
    const { email = 'test@example.com', password = '123' } = body;

    if (email && password ) { 
        return new Response(JSON.stringify({ message: 'Login successful' }), {
            status: 200,
        });
    } else {
        return new Response(JSON.stringify({ message: 'Invalid email or password' }), {
            status: 401,
        });
    }
   
}
