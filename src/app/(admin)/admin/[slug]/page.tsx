
import Table from "@/components/tables/Table";
import { getManyViaAPI } from "@/lib/api/api";
import { getMany } from "@/lib/api/db";
import { getSchema } from "@/lib/helpers/form";
import { serialize } from "@/lib/helpers/structures";
import { WildCard } from "@/lib/models/wildcard";


export default async function Page({ params }: { params: { slug: string; }; })
{
    const schema = getSchema(WildCard.shape);
    const { data, count } = await getManyViaAPI(params.slug);
    console.log(data);
    return <>
        <Table schema={schema} docs={data} collection={params.slug} />
    </>;
}