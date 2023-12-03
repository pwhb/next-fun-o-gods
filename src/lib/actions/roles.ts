"use server";
import { redirect } from "next/navigation";
import Collections from "../consts/db";
import { create, update } from "../api/roles";
import { ObjectId } from "mongodb";

export async function createOne(prevState: any, formData: FormData)
{
    const { success, data } = await create(Object.fromEntries(formData));
    if (!success)
    {
        return data;
    }
    redirect(`/admin/${Collections.Role}`);

}

export async function updateOne(id: string, prevState: any, formData: FormData)
{
    if (!id || !ObjectId.isValid(id))
    {
        return;
    }

    const { success, data } = await update(id, Object.fromEntries(formData));

    console.log({ success, data });

    if (!success)
    {
        return data;
    }
    redirect(`/admin/${Collections.Role}`);
}

