import { getMany } from "@/app/api/v1/(mongo)/menus/route";
import Table from "@/components/tables/Table";
import { getSchema } from "@/lib/helpers/form";
import { serialize } from "@/lib/helpers/structures";
import { Menu } from "@/lib/models/menus";


export default async function Page()
{
    const schema = getSchema(Menu.shape);
    const data = await getMany({});
    const docs = serialize(data);
    // console.log(docs);
    return <>
        <Table schema={schema} docs={docs} collection="menus" />
    </>;
}