import { getCookies, logout } from "@/lib/actions/auth";
import { SidebarToggle } from "./SidebarToggle";

export default async function Navbar()
{
    const { user } = await getCookies();

    return <div className="navbar shadow-sm bg-base-100 md:px-4">
        <div className="navbar-start">
            <SidebarToggle />
        </div>
        <div className="navbar-center">
            <a className="normal-case text-xl" href="/">fun-o-gods</a>
        </div>
        <div className="navbar-end">
            <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar placeholder">
                    <div className="bg-neutral text-neutral-content rounded-full w-24">
                        <span className="text-xl">{user.username[0]}</span>
                    </div>
                </label>
                <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                    <li>
                        <a href="/">{user.username}</a>
                    </li>
                    <form action={logout}>
                        <li>
                            <button type="submit">Logout</button>
                        </li>
                    </form>
                </ul>
            </div>
        </div>
    </div>;
}