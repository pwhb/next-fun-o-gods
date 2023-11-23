"use client";
import { useState } from "react";

type Props = {
    name: string;
    label: string;
    value?: boolean;
    error?: string[];
};
export default function Toggle({ name, label, value, error }: Props)
{
    const [input, setInput] = useState(value);
    return <div className="form-control w-full max-w-xs mt-5">
        <label className="label cursor-pointer">
            <span className="label-text capitalize">{label}</span>
            <input name={name} type="checkbox" className={error?.length ? "toggle toggle-error" : "toggle"} checked={input} onChange={(e) => setInput(e.target.checked)} />
        </label>
        {error?.length && <p className="text-error my-2">{error?.at(0)}</p>}
    </div>;
}