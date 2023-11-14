'use server';
import { redirect } from "next/navigation";
import { login } from "../helpers/auth";
import { cookies } from "next/headers";
import { isRedirectError } from "next/dist/client/components/redirect";



export async function loginUser(prevState: any, formData: FormData)
{
    try
    {
        const username = formData.get("username") as string;
        const password = formData.get("password") as string;
        const { status, body } = await login({ username, password }) as any;
        if (status === 200)
        {
            console.log(body);
            cookies().set("token", body.token);
            cookies().set("user", body.data);
            return redirect('/');
        }
        return body;

    } catch (e)
    {
        console.log(e);
        if (isRedirectError(e))
        {
            return redirect('/');
        }
        return {
            username: {
                value: "",
                error: ""
            },
            password: {
                value: "",
                error: ""
            }
        };
    }
}