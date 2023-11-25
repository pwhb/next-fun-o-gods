import Editor from "@/components/editors/Editor";
import { createOne } from "@/lib/actions/menus";
import { getMany } from "@/lib/api/db";
import Collections from "@/lib/consts/db";
import { ColumnType, getSchema } from "@/lib/helpers/form";
import { serialize } from "@/lib/helpers/structures";
import { Menu } from "@/lib/models/menus";

export default async function Page()
{


    const menus = await getMany(Collections.Menu, {});
    const schema = getSchema(Menu.shape, [{
        type: ColumnType.Option,
        name: "parent",
        options: serialize(menus).map((menu: any) => ({
            value: menu._id,
            label: menu.name
        }))
    }]);

    return <>
        <Editor schema={schema} action={createOne} />
    </>;
}