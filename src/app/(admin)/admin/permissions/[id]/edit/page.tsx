
import Editor from "@/components/editors/Editor";
import { updateOne } from "@/lib/actions/permissions";
import { getMany, getOne } from "@/lib/api/db";

import Collections from "@/lib/consts/db";
import { ColumnType, IColumn, getSchema } from "@/lib/helpers/form";
import { serialize } from "@/lib/helpers/structures";
import { Permission } from "@/lib/models/permissions";
import { ObjectId } from "mongodb";

export default async function Page({ params }: { params: { id: string; }; })
{
    const menus = await getMany(Collections.Menu, {});
    const actions = await getMany(Collections.Option, { name: "actions" });

    const schema = getSchema(Permission.shape, [
        {
            type: ColumnType.Skip,
            name: "name",
        },
        {
            type: ColumnType.Option,
            name: "menu",
            options: menus.map((menu: any) => ({
                value: menu._id.toString(),
                label: menu.name
            }))
        },
        {
            type: ColumnType.Option,
            name: "action",
            options: actions.map((menu: any) => ({
                value: menu.value,
                label: menu.label
            }))
        }
    ]);
    const doc = await getOne(Collections.Permission, { _id: new ObjectId(params.id) });

    const updateOneWithId = updateOne.bind(null, doc!._id.toString());

    return <>
        <Editor schema={schema} action={updateOneWithId} doc={serialize(doc)} />
    </>;
}