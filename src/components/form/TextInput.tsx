"use client";
import { useState } from "react";

type Props = {
    name: string;
    label: string;
    value?: string;
    placeholder?: string;
    error?: string[];
    // onChange: (value: string) => void;
};
export default function TextInput({ name, label, value, placeholder, error }: Props)
{
    const [input, setInput] = useState(value || "");
    return <div className="form-control w-full max-w-xs">
        <label className="label">
            <span className="label-text capitalize">{label}</span>
        </label>
        <input type="text" name={name} placeholder={label || placeholder} className={error?.length ? "input input-bordered w-full max-w-xs input-error" : "input input-bordered w-full max-w-xs"} onChange={(e) => setInput(e.target.value)} value={input} />
        {error?.length && <p className="text-error my-2">{error?.at(0)}</p>}
    </div>;
}