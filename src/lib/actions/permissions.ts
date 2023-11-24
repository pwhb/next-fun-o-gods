"use server";
import { redirect } from "next/navigation";
import Collections from "../consts/db";
import { create, update } from "./wildcard";
import { Permission } from "../models/permissions";

export async function createOne(prevState: any, formData: FormData)
{
    const validated = Permission.safeParse(Object.fromEntries(formData));
    if (!validated.success)
    {
        console.log("validated.error", validated.error.flatten().fieldErrors);
        return validated.error.flatten().fieldErrors;
    }

    const res = await create(Collections.Permission, validated.data);
    if (res.insertedId)
    {
        redirect(`/admin/${Collections.Permission}`);
    }
}

export async function updateOne(prevState: any, formData: FormData)
{

    const id = formData.get("id") as string;
    if (!id)
    {
        return;
    }

    const validated = Permission.safeParse(Object.fromEntries(formData));
    if (!validated.success)
    {
        console.log("validated.error", validated.error.flatten().fieldErrors);
        return validated.error.flatten().fieldErrors;
    }

    const res = await update(Collections.Permission, id, validated.data);
    if (res?._id)
    {
        redirect(`/admin/${Collections.Permission}`);
    }
}

