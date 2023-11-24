"use client";
import { useState } from "react";

type Props = {
    name: string;
    label: string;
    value?: string;
    error?: string[];
    options: { value: string; label: string; }[];
    // onChange: (value: string) => void;
};
export default function Select({ name, label, value, options, error }: Props)
{
    const [input, setInput] = useState(value || "");
    return <div className="form-control w-full max-w-xs">
        <label className="label">
            <span className="label-text capitalize">{label}</span>
        </label>
        {/* <input type="text" name={name} placeholder={label || placeholder} className={error?.length ? "input input-bordered w-full max-w-xs input-error" : "input input-bordered w-full max-w-xs"} onChange={(e) => setInput(e.target.value)} value={input} /> */}

        <select className={error?.length ? "select select-bordered w-full max-w-xs select-error" : "select select-bordered w-full max-w-xs"} name={name} value={input} onChange={(e) => setInput(e.target.value)}>
            <option selected value={""}>Choose {name}</option>
            {options.map((v, idx) => <option key={`${name}-option-${idx}`} value={v.value}>{v.label}</option>)}
            {/* <option>Han Solo</option>
            <option>Greedo</option> */}
        </select>
        {error?.length && <p className="text-error my-2">{error?.at(0)}</p>}
    </div>;
}