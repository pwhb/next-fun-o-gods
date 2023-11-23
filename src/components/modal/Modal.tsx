import React from "react";

type Props = {
    modalName: string;
    title?: string;
    body?: string;
    children: React.ReactNode;
};

export function openModal(modalName: string)
{
    if (document)
    {
        const modal: any = document.getElementById(modalName);
        modal.showModal();
    }
}

export function closeModal(modalName: string)
{
    if (document)
    {
        const modal: any = document.getElementById(modalName);
        modal.close();
    }
}
export default function Modal({ modalName, title, body, children }: Props)
{
    const onClose = () =>
    {
        closeModal(modalName);
    };
    return <>
        <dialog id={modalName} className="modal">
            <div className="modal-box text-left">
                <h3 className="font-bold text-lg">{title}</h3>
                <p className="py-4">{body}</p>
                <div className="flex flex-row justify-end gap-5">
                    {children}
                    <button className="btn btn-neutral btn-xs" onClick={onClose}>Close</button>
                </div>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    </>;
};