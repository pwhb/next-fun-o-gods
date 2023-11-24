import { z } from 'zod';

export interface IOption extends z.infer<typeof Option>
{
    subMenus?: IOption[];
};


export const Option = z.object({
    name: z.string().min(1, "Name is required."),
    label: z.string().min(1, "Label is required."),
    value: z.string().min(1, "Value is required."),
    active: z.coerce.boolean(),
});




