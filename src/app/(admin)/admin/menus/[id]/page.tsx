import { getOne } from "@/app/api/v1/(mongo)/menus/route";
import Editor from "@/components/editors/Editor";
import { updateMenu } from "@/lib/actions/menus";
import { IColumn, getSchema } from "@/lib/helpers/form";
import { serialize } from "@/lib/helpers/structures";
import { Menu } from "@/lib/models/menus";
import { ObjectId } from "mongodb";

export default async function Page({ params }: { params: { id: string; }; })
{
    const doc = await getOne({ _id: new ObjectId(params.id) });
    const schema: IColumn[] = getSchema(Menu.shape);

    return <>
        <Editor schema={schema} action={updateMenu} doc={serialize(doc)} />
    </>;
}