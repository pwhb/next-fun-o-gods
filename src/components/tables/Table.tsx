'use client';
import { ColumnType, IColumn } from "@/lib/helpers/form";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import DeleteConfirmation from "../modal/DeleteConfirmation";
import { openModal } from "../modal/Modal";
import { deleteMany } from "@/lib/actions/db";

function TableData({ type, data }: { type: ColumnType, data: any; })
{
    switch (type)
    {

        case ColumnType.ObjectId:
            return <td >{data}</td>;
        case ColumnType.Text:
            return <td >{data}</td>;
        case ColumnType.Boolean:
            return data ? <td><div className="badge badge-primary">active</div></td> : <td><div className="badge badge-secondary">inactive</div></td>;
        case ColumnType.Icon:
            return <td><Icon icon={data} width={24} /></td>;
    }
    return <td >{data}</td>;
}

function TableRow({ schema, doc, index, checked, onCheck }: { schema: IColumn[]; doc: any; index: number; checked: boolean; onCheck: () => void; })
{
    const pathname = usePathname();
    const slug = pathname?.split("/")[2];
    return <tr>
        <td >{index + 1}</td>
        {schema.map((col, j) => <TableData key={`td-${index}-${j}`} type={col.type} data={doc[col.value]} />)}
        <td><Link href={`/admin/${slug}/${doc._id}`} className="btn btn-secondary btn-xs">Edit</Link></td>
        <td><input type="checkbox" checked={checked} onChange={onCheck} /></td>
    </tr>;
}
export default function Table({ schema, docs, collection }: { schema: IColumn[]; docs: any[]; collection: string; })
{
    const pathname = usePathname();
    const slug = pathname?.split("/")[2];
    const [selected, setSelected] = useState<boolean[]>(Array.from({ length: docs.length }, () => false));

    useEffect(() =>
    {
        "useEffect";
        setSelected(Array.from({ length: docs.length }, () => false));
    }, [docs]);

    const onDelete = () =>
    {
        openModal(`delete-${collection}-confirmation-modal`);
    };

    return <>
        <DeleteConfirmation collection={collection} ids={docs.filter((_, i) => selected[i]).map(doc => doc._id)} />
        <table className="table">
            {/* head */}
            <thead>
                <tr>
                    <th></th>
                    {schema.map((col, i) =>
                        <th className="capitalize" key={`table-head-${i}`}>{col.label || col.value}</th>
                    )}
                    <td className="gap-2"><Link href={`/admin/${slug}/create`} className="btn btn-primary btn-xs">Create</Link>
                    </td>
                    <td><input type="checkbox" checked={selected.every(v => v)} onChange={() =>
                    {
                        if (selected.some(v => !v))
                        {
                            setSelected(Array.from({ length: docs.length }, () => true));
                        } else
                        {
                            setSelected(Array.from({ length: docs.length }, () => false));
                        }
                    }} /></td>
                </tr>
            </thead>
            <tbody>
                {docs.map((doc, i) =>
                    <TableRow key={`table-row-${i}`} doc={doc} index={i} schema={schema} checked={selected[i]} onCheck={() =>
                    {
                        const copy = [...selected];
                        copy[i] = !copy[i];
                        setSelected(copy);
                    }} />)}
            </tbody>

            <tfoot>
                <tr>
                    <td></td>
                    {schema.map((col, i) =>
                        <td className="capitalize" key={`table-foot-${i}`}></td>
                    )}
                    <td></td>
                    <td> <button className="btn btn-error btn-xs" onClick={onDelete}>Delete</button></td>
                </tr>
            </tfoot>
        </table></>;
}