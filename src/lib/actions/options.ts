"use server";
import { redirect } from "next/navigation";
import Collections from "../consts/db";

import { Option } from "../models/options";
import { create, update } from "../api/db";


export async function createOne(prevState: any, formData: FormData)
{
    const validated = Option.safeParse(Object.fromEntries(formData));
    if (!validated.success)
    {
        return validated.error.flatten().fieldErrors;
    }

    const res = await create(Collections.Option, validated.data);
    if (res.insertedId)
    {
        redirect(`/admin/${Collections.Option}`);
    }
}

export async function updateOne(prevState: any, formData: FormData)
{

    const id = formData.get("id") as string;
    if (!id)
    {
        return;
    }

    const validated = Option.safeParse(Object.fromEntries(formData));
    if (!validated.success)
    {
        return validated.error.flatten().fieldErrors;
    }

    const res = await update(Collections.Option, id, validated.data);
    if (res?._id)
    {
        redirect(`/admin/${Collections.Option}`);
    }
}

