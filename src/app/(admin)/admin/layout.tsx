import Breadcrumbs from "@/components/layout/Breadcrumbs";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";

import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Management',
    description: 'Management',
};

export default function Layout({ children }: { children: React.ReactNode; })
{

    return <div className="bg-base-300 min-h-screen">
        <Navbar />
        <div className="flex flex-row gap-3 p-3">
            <Sidebar />
            <div className="overflow-x-auto w-full bg-base-100 rounded-md text-center shadow-sm p-3">
                <Breadcrumbs />
                {children}
            </div>
        </div>
    </div>;
}