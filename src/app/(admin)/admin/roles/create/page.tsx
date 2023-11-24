import Editor from "@/components/editors/Editor";
import { createOne } from "@/lib/actions/options";
import { getSchema } from "@/lib/helpers/form";
import { Option } from "@/lib/models/options";

export default async function Page()
{
    const schema = getSchema(Option.shape);

    return <>
        <Editor schema={schema} action={createOne} />
    </>;
}