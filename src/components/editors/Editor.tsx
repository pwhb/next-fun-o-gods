"use client";
import { ColumnType, IColumn } from "@/lib/helpers/form";
import TextInput from "../form/TextInput";
import Toggle from "../form/Toggle";
import { useFormState, useFormStatus } from "react-dom";

type Props = {
    schema: IColumn[];
    doc?: any;
    action: any;
};

function FormInput({ col, error, value }: { col: IColumn; error?: string[]; value?: any; })
{
    if (col.value !== "_id")
    {
        switch (col.type)
        {
            case ColumnType.Icon:
            case ColumnType.Text: {
                return <TextInput name={col.value} label={col.label || col.value} error={error} value={value} />;
            }
            case ColumnType.Boolean: {
                return <Toggle name={col.value} label={col.label || col.value} error={error} value={value} />;
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
export default function Editor({ schema, action, doc }: Props)
{
    const [state, formAction] = useFormState(action, undefined);
    const isEditing = doc && Object.keys(doc).length;

    return <form action={formAction}>

        <p className="text-3xl font-bold my-5">{isEditing ? "Edit" : "Create"}</p>
        <div className="grid md:grid-cols-2 grid-cols-1 place-items-center mx-3">
            <input type="text" hidden name="id" defaultValue={doc?._id} />
            {schema.map((col, i) => <FormInput key={`form-input-${i}`} col={col} error={state?.[col.value]} value={doc?.[col.value]} />)}
        </div>
        <SubmitButton />
    </form>;
}

