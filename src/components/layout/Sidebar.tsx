import { getMenuTree } from "@/app/api/v1/(mongo)/menus/route";
import MenuItem from "./MenuItem";

export default async function Sidebar()
{
    const menus = await getMenuTree() as [];
  
    return <div className="w-56 shadow-sm rounded-md bg-base-100 sidebar" id="sidebar-menus">

        <ul className="menu">
            {menus.map((menu: any) => <MenuItem key={menu._id} item={menu} />)}
        </ul>
    </div>;
}
