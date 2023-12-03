import Editor from "@/components/editors/Editor";
import { createOne } from "@/lib/actions/permissions";
import { getMany } from "@/lib/api/db";
import Collections from "@/lib/consts/db";
import { ColumnType, getSchema } from "@/lib/helpers/form";
import { Permission } from "@/lib/models/permissions";

export default async function Page()
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

    return <>
        <Editor schema={schema} action={createOne} />
    </>;
}