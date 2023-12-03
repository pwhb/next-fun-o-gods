"use client";

import { serialize } from "@/lib/helpers/structures";
import { updateOne } from "@/lib/actions/roles";
import PermissionCheckbox from "../form/PermissionCheckbox";
import Editor from "./Editor";
import { ColumnType, IColumn, getSchema } from "@/lib/helpers/form";
import { useEffect, useState } from "react";
import { Role } from "@/lib/models/roles";

type Props = {
    doc?: any;
    menus: any[];
};
export default function RoleEditor({ doc, menus }: Props)
{
    const [menuArray, setMenuArray] = useState([]);
    const [permissionArray, setPermissionArray] = useState([]);

    const schema = getSchema(Role.shape, [
        {
            type: ColumnType.Skip,
            name: "menus",
        },
        {
            type: ColumnType.Skip,
            name: "permissions",
        },
    ]);

    useEffect(() =>
    {
        console.log({
            menuArray,
            permissionArray
        });

    }, [menuArray, permissionArray]);

    const updateOneWithId = updateOne.bind(null, doc!._id.toString());

    return <Editor schema={schema} doc={serialize(doc)} action={updateOneWithId} >
        <div className="col-span-2 mt-10">
            <ul className="flex flex-row gap-10">
                {menus.map((v, idx) => <PermissionCheckbox doc={v} key={`permission-${idx}`} onChange={(e) =>
                {
                    console.log(e.target.checked);
                    const [type, id] = e.target.id.split("-");

                    if (type === "menu")
                    {
                        setMenuArray((v: any) => v.includes(id) ? v.filter((v: any) => v !== id) : [...v, id]);
                    } else
                    {
                        setPermissionArray((v: any) => v.includes(id) ? v.filter((v: any) => v !== id) : [...v, id]);
                    }



                }} isMenu />
                )}
            </ul>
        </div>
    </Editor>;
}