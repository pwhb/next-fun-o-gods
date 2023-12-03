import RoleEditor from "@/components/editors/RoleEditor";
import { getOne } from "@/lib/api/db";
import { getMenuTreeWithPermissions } from "@/lib/api/menus";
import Collections from "@/lib/consts/db";
import { serialize } from "@/lib/helpers/structures";
import { ObjectId } from "mongodb";


export default async function Page({ params }: { params: { id: string; }; })
{
    const doc = await getOne(Collections.Role, { _id: new ObjectId(params.id) });
    const menus = await getMenuTreeWithPermissions() as any[];
  


    return <>
        <RoleEditor doc={serialize(doc)} menus={menus} />
    </>;
}