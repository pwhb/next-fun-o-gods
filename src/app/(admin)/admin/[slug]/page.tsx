
import Table from "@/components/tables/Table";
import { getMany } from "@/lib/actions/wildcard";
import { getSchema } from "@/lib/helpers/form";
import { serialize } from "@/lib/helpers/structures";
import { WildCard } from "@/lib/models/wildcard";


export default async function Page({ params }: { params: { slug: string; }; })
{
    const schema = getSchema(WildCard.shape);
    const data = await getMany(params.slug, {});
    const docs = serialize(data);
    // console.log(docs);
    return <>
        <Table schema={schema} docs={docs} collection={params.slug} />
    </>;
}