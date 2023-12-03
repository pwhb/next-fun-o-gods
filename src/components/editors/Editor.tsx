"use client";
import { ColumnType, IColumn } from "@/lib/helpers/form";
import TextInput from "../form/TextInput";
import Toggle from "../form/Toggle";
import { useFormState, useFormStatus } from "react-dom";
import Select from "../form/Select";

type Props = {
    schema: IColumn[];
    doc?: any;
    action?: any;
    children?: React.ReactNode;
};

function FormInput({ col, error, value, options }: { col: IColumn; error?: string[]; value?: any; options?: { label: string, value: string; }[]; })
{
    if (col.name !== "_id")
    {
        switch (col.type)
        {
            case ColumnType.Icon:
            case ColumnType.Text: {
                return <TextInput name={col.name} label={col.label || col.name} error={error} value={value} />;
            }
            case ColumnType.Option: {
                return <Select name={col.name} label={col.label || col.name} error={error} value={value} options={options!} />;
            }
            case ColumnType.Boolean: {
                return <Toggle name={col.name} label={col.label || col.name} error={error} value={value} />;
            }
            case ColumnType.Skip: {
                return null;
            }
        }
    }
    return null;
}

function SubmitButton()
{
    const { pending } = useFormStatus();
    return <button type="submit" className="btn btn-primary btn-sm my-10">{pending ? "Loading" : "Submit"}</button>;
}
export default function Editor({ schema, action, doc, children }: Props)
{
    const [state, formAction] = useFormState(action, undefined);


    const isEditing = doc && Object.keys(doc).length;

    return <form action={formAction}>
        <p className="text-3xl font-bold my-5">{isEditing ? "Edit" : "Create"}</p>
        <div className="grid md:grid-cols-2 grid-cols-1 place-items-center mx-3">
            {schema.map((col, i) => <FormInput key={`form-input-${i}`} col={col} error={state?.[col.name]} value={doc?.[col.name]} options={col.options} />)}
            {children}
        </div>
        <SubmitButton />
    </form>;
}

