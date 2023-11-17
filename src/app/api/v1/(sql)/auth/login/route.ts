
import { signIn } from "@/lib/helpers/auth";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest)
{
    try
    {
        const { username, password } = await request.json();
        const { error, data } = await signIn({ username, password });
        if (error)
        {
            return Response.json({ error }, { status: 400 });
        }
        return Response.json({ data }, { status: 200 });
    } catch (e: any)
    {
        console.error(e);
        return Response.json({ error: e, message: e.message }, { status: 400 });
    }
};