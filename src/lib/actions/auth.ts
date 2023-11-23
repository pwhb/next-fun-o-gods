'use server';

import { signIn } from '../helpers/auth';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { AuthInput } from '../models/users';



function setCookies(user: any, token: string)
{
    cookies().set("user", JSON.stringify(user));
    cookies().set("token", token);
}

export async function getCookies()
{
    const user = cookies().get("user")?.value;
    const token = cookies().get("token")?.value;
    return {
        user: user && JSON.parse(user),
        token: token
    };
}
export async function login(prevState: any, formData: FormData)
{
    try
    {
        const validated = AuthInput
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

export async function logout()
{
    try
    {
        cookies().delete("user");
        cookies().delete("token");
    } catch (e: any)
    {
        console.error(e);
    }
    return redirect("/");
}