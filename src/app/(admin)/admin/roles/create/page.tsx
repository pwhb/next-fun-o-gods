import Editor from "@/components/editors/Editor";
import { createOne } from "@/lib/actions/roles";
import { ColumnType, getSchema } from "@/lib/helpers/form";
import { Role } from "@/lib/models/roles";

export default async function Page()
{
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
    return <>
        <Editor schema={schema} action={createOne} />
    </>;
}