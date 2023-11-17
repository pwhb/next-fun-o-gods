'use server';
import { z } from 'zod';
import { signIn } from '../helpers/auth';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';



function setCookies(user: any, token: string)
{
    cookies().set("user", JSON.stringify(user));
    cookies().set("token", token);
}
export async function login(prevState: any, formData: FormData)
{
    try
    {
        const validated = z
            .object({
                username: z.string().min(1, "Username is required."),
                password: z.string().min(1, "Password is required."),
            })
            .safeParse(Object.fromEntries(formData));
        if (!validated.success)
        {
            console.log("validated.error", validated.error.flatten().fieldErrors);

            return validated.error.flatten().fieldErrors;
        }
        const { username, password } = validated.data;
        const { error, data } = await signIn({ username, password });

        if (error)
        {
            return error;
        }

        setCookies(data.user, data.token);
    } catch (e: any)
    {
        console.error(e);
    }
    return redirect("/");
}