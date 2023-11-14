import { login } from "@/lib/helpers/auth";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest)
{
    try
    {
        const { username, password } = await request.json();
        const { status, body } = await login({ username, password }) as any;
        return Response.json(body, { status: status });
    } catch (err)
    {
        console.error(err);
        return Response.json({ success: false, error: err }, { status: 400 });
    }
};