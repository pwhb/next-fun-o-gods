import Table from "@/components/tables/Table";
import { getMany } from "@/lib/api/db";
import Collections from "@/lib/consts/db";
import { getSchema } from "@/lib/helpers/form";
import { serialize } from "@/lib/helpers/structures";
import { User } from "@/lib/models/users";


export default async function Page()
{
    const schema = getSchema(User.shape);
    const data = await getMany(Collections.User, {});
    const docs = serialize(data);

    return <>
        <Table schema={schema} docs={docs} collection="menus" />
    </>;
}