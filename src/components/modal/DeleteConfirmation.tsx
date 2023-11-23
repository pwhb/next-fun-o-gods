"use client";
import { useState } from "react";
import Modal, { closeModal } from "./Modal";
import { useRouter } from "next/navigation";


type Props = {
    collection: string;
    ids: string[];
};

export default function DeleteConfirmation({ collection, ids }: Props)
{
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const onDelete = async () =>
    {
        setIsLoading(true);
        const res = await fetch(`/api/v1/${collection}?ids=${ids.join(",")}`, {
            method: "DELETE",
        });
        const data = await res.json();

        if (data.data)
        {

            closeModal(`delete-${collection}-confirmation-modal`);
            router.refresh();
        }
        setIsLoading(false);
    };
    return <>
        <Modal modalName={`delete-${collection}-confirmation-modal`} title="Are you sure?" body={`You are about to delete the following ${ids.join(", ")}.`} >

            <button onClick={onDelete} disabled={isLoading} className="btn btn-error btn-xs">{isLoading ? "Loading" : "Delete"}</button>

        </Modal>
    </>;
};