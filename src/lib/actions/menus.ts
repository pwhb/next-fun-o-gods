"use server";
import { redirect } from "next/navigation";
import Collections from "../consts/db";
import { createViaAPI, updateViaAPI } from "../api/api";
import { create, update } from "../api/menus";

export async function createOne(prevState: any, formData: FormData)
{
    const { success, data } = await create(Object.fromEntries(formData));
    if (!success)
    {
        return data;
    }
    redirect(`/admin/${Collections.Menu}`);

}

export async function updateOne(prevState: any, formData: FormData)
{
    const id = formData.get("id") as string;
    if (!id)
    {
        return;
    }

    const { success, data } = await update(id, Object.fromEntries(formData));
    if (!success)
    {
        return data;
    }
    redirect(`/admin/${Collections.Menu}`);
}

