import { getOne } from "@/app/api/v1/(mongo)/menus/route";
import Editor from "@/components/editors/Editor";
import { updateOne } from "@/lib/actions/menus";
import { getMany } from "@/lib/api/db";
import Collections from "@/lib/consts/db";
import { ColumnType, IColumn, getSchema } from "@/lib/helpers/form";
import { serialize } from "@/lib/helpers/structures";
import { Menu } from "@/lib/models/menus";
import { ObjectId } from "mongodb";

export default async function Page({ params }: { params: { id: string; }; })
{
    const doc = await getOne({ _id: new ObjectId(params.id) });
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
        <Editor schema={schema} action={updateOne} doc={serialize(doc)} />
    </>;
}