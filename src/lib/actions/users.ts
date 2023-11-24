"use server";
import { redirect } from "next/navigation";
import Collections from "../consts/db";

export async function createOne(prevState: any, formData: FormData)
{
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/${Collections.User}`, {
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(Object.fromEntries(formData)),
        method: "POST",
    });

    const data = await res.json();
    if (data.error)
    {
        return data.error;
    }
    if (data.data)
    {
        redirect(`/admin/${Collections.User}`);
    }
}

export async function updateOne(prevState: any, formData: FormData)
{
    const id = formData.get("id") as string;
    if (!id)
    {
        return;
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/${Collections.User}/${id}`, {
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(Object.fromEntries(formData)),
        method: "PATCH",
    });

    const data = await res.json();
    if (data.error)
    {
        return data.error;
    }
    if (data.data)
    {
        redirect(`/admin/${Collections.User}`);
    }
}

