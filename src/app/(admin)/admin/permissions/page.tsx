
import Table from "@/components/tables/Table";
import { getMany } from "@/lib/api/db";
import Collections from "@/lib/consts/db";
import { ColumnType, getSchema } from "@/lib/helpers/form";
import { serialize } from "@/lib/helpers/structures";
import { Permission } from "@/lib/models/permissions";

export default async function Page()
{
    const menus = await getMany(Collections.Menu, {});
    const actions = await getMany(Collections.Option, { name: "actions" });

    const schema = getSchema(Permission.shape, [
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
    const data = await getMany(Collections.Permission, {});

    // console.log(docs);
    return <>
        <Table schema={schema} docs={serialize(data)} collection="menus" />
    </>;
}