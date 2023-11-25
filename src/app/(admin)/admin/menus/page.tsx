import Table from "@/components/tables/Table";
import { getManyViaAPI } from "@/lib/api/api";
import { readMany } from "@/lib/api/menus";
import Collections from "@/lib/consts/db";
import { getSchema } from "@/lib/helpers/form";
import { serialize } from "@/lib/helpers/structures";
import { Menu } from "@/lib/models/menus";


export default async function Page()
{
    const schema = getSchema(Menu.shape);
    const { data, count } = await readMany({});
    const docs = serialize(data);
    return <>
        <Table schema={schema} docs={docs} collection="menus" />
    </>;
}