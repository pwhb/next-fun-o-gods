"use server";
import { redirect } from "next/navigation";
import Collections from "../consts/db";
import { Menu } from "../models/menus";
import { create, update } from "./db";

export async function createMenu(prevState: any, formData: FormData)
{
    const validated = Menu.safeParse(Object.fromEntries(formData));
    if (!validated.success)
    {
        console.log("validated.error", validated.error.flatten().fieldErrors);
        return validated.error.flatten().fieldErrors;
    }

    const res = await create(Collections.Menu, validated.data);
    if (res.insertedId)
    {
        redirect("/admin/menus");
    }
}

export async function updateMenu(prevState: any, formData: FormData)
{

    const id = formData.get("id") as string;
    console.log("updateMenu", id);
    if (!id)
    {
        return;
    }

    const validated = Menu.safeParse(Object.fromEntries(formData));
    if (!validated.success)
    {
        console.log("validated.error", validated.error.flatten().fieldErrors);
        return validated.error.flatten().fieldErrors;
    }
    console.log("updating");

    const res = await update(Collections.Menu, id, validated.data);
    if (res?._id)
    {
        redirect("/admin/menus");
    }
}

