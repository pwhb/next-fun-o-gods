import { SidebarToggle } from "./SidebarToggle";

export default function Navbar()
{
    return <div className="navbar bg-base-100">
        <div className="navbar-start">
            <SidebarToggle />

        </div>
        <div className="navbar-center">
            <a className="btn btn-ghost normal-case text-xl" href="/">fun-o-gods</a>
        </div>
        <div className="navbar-end">
    
        </div>
    </div>;
}