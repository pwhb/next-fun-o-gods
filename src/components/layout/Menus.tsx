import { getMenuTree } from "@/app/api/v1/(mongo)/menus/route";
import MenuItem from "./MenuItem";

export default async function Menus()
{
    const menus = await getMenuTree() as [];
    console.log("fetched menus");
    
    return <ul className="menu">
        {menus.map((menu: any) => <MenuItem key={menu._id} item={menu} />)}
    </ul>;
}