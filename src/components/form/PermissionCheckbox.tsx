
export default function PermissionCheckbox({ doc, onChange, isMenu }: { doc: any; onChange: (e: any) => void; isMenu?: boolean; })
{
    return <>
        <li className="gap-2 flex flex-col">
            <div className="flex flex-row gap-3 items-center">
                <input type="checkbox" className="checkbox" id={isMenu ? `menu-${doc._id}` : `permission-${doc._id}`} onChange={onChange} />
                <span className="capitalize">{doc.name}</span>
            </div>

            {doc.subMenus &&
                <ul className="left-8 relative flex flex-col gap-3">
                    {doc.subMenus.map((subMenu: any) =>
                        <PermissionCheckbox key={`permission-${subMenu._id}`} doc={subMenu} onChange={onChange} isMenu />
                    )}
                </ul>
            }

            {doc.permissions &&
                <ul className="left-8 relative flex flex-col gap-3">
                    {doc.permissions.map((perm: any) =>
                        <PermissionCheckbox key={`permission-${perm._id}`} doc={perm} onChange={onChange} />
                    )}
                </ul>
            }
        </li>
    </>;
}