'use client';
import { Icon } from "@iconify/react";

// export function SidebarToggle()
// {
//     return <div className="drawer-content">
//         <label htmlFor="my-drawer" className="btn btn-ghost drawer-button">
//             <Icon icon="solar:hamburger-menu-outline" width={24} />
//         </label>
//     </div>;
// }

export function SidebarToggle()
{
    return <div className="">
        <button className="btn btn-ghost" onClick={() =>
        {
            console.log("toggle");
            const sidebarEl = document.getElementById("sidebar-menus");

            if (sidebarEl?.classList.contains("hide"))
            {
                sidebarEl.classList.remove("hide");
            } else
            {
                sidebarEl?.classList.add("hide");
            };
        }}>
            <Icon icon="solar:hamburger-menu-outline" width={24} />
        </button>
    </div>;
}