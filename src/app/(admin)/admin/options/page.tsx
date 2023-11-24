import Table from "@/components/tables/Table";
import { getMany } from "@/lib/actions/wildcard";
import Collections from "@/lib/consts/db";
import { getSchema } from "@/lib/helpers/form";
import { serialize } from "@/lib/helpers/structures";
import { Option } from "@/lib/models/options";


export default async function Page()
{
    const schema = getSchema(Option.shape);
    const data = await getMany(Collections.Option, {});
    const docs = serialize(data);

    return <>
        <Table schema={schema} docs={docs} collection="menus" />
    </>;
}