import Editor from "@/components/editors/Editor";
import { updateOne } from "@/lib/actions/users";

import { getOne } from "@/lib/api/db";
import Collections from "@/lib/consts/db";
import { getSchema } from "@/lib/helpers/form";
import { serialize } from "@/lib/helpers/structures";
import { User } from "@/lib/models/users";
import { ObjectId } from "mongodb";

export default async function Page({ params }: { params: { id: string; }; })
{
    const doc = await getOne(Collections.User, { _id: new ObjectId(params.id) });
    const schema = getSchema(User.shape);

    return <>
        <Editor schema={schema} action={updateOne} doc={serialize(doc)} />
    </>;
}