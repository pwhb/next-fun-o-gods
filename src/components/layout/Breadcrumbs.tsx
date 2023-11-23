'use client';
import { Icon } from "@iconify/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Breadcrumbs()
{
    const pathname = usePathname();
    const split = pathname?.split("/");
    split.shift();
    return <div className="text-sm breadcrumbs mx-4">
        <ul>
            {split.map((v, i) => <li key={`breadcrumb-${i}`}>
                <Link href={`/${split.slice(0, i + 1).join("/")}`} className="capitalize" >
                    {v}
                </Link>
            </li>)}
        </ul>
    </div>;
}