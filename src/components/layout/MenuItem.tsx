"use client";
import { Icon } from "@iconify/react";
import { IMenu } from "@/lib/models/menus";
import Link from "next/link";


export default function MenuItem({ item }: { item: IMenu; })
{
    return item.subMenus?.length ?
        <li><details open={false}>
            <summary>
                {item.icon && <Icon icon={item.icon} />}
                {item.name}
            </summary>
            <ul>
                {item.subMenus.map((subMenu: any) => <MenuItem key={subMenu._id} item={subMenu} />)}
            </ul>
        </details></li>
        :
        <li><Link href={item.route}>
            {item.icon && <Icon icon={item.icon} />}
            {item.name}
        </Link></li>;
}