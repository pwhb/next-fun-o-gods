'use client';
import { Icon } from "@iconify/react";

export function SidebarToggle()
{
    return <div className="drawer-content">
        <label htmlFor="my-drawer" className="btn btn-ghost drawer-button">
            <Icon icon="solar:hamburger-menu-outline" width={24} />
        </label>
    </div>;
}