import Editor from "@/components/editors/Editor";
import { createMenu } from "@/lib/actions/menus";
import { IColumn, getSchema } from "@/lib/helpers/form";
import { Menu } from "@/lib/models/menus";

export default function Page()
{
    const schema: IColumn[] = getSchema(Menu.shape);

    return <>
        <Editor schema={schema} action={createMenu} />
    </>;
}