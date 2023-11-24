import Editor from "@/components/editors/Editor";
import { updateOne } from "@/lib/actions/options";
import { getOne } from "@/lib/actions/wildcard";
import Collections from "@/lib/consts/db";
import { getSchema } from "@/lib/helpers/form";
import { serialize } from "@/lib/helpers/structures";
import { Option } from "@/lib/models/options";
import { ObjectId } from "mongodb";

export default async function Page({ params }: { params: { id: string; }; })
{
    const doc = await getOne(Collections.Option, { _id: new ObjectId(params.id) });
    const schema = getSchema(Option.shape);

    return <>
        <Editor schema={schema} action={updateOne} doc={serialize(doc)} />
    </>;
}