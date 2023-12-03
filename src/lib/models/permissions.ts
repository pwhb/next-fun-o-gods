import { z } from 'zod';
import { ColumnType, getSchema } from '../helpers/form';

export interface IPermission extends z.infer<typeof Permission>
{
    subMenus?: IPermission[];
};



export const Permission = z.object({
    name: z.string(),
    description: z.string(),
    menu: z.string(),
    action: z.string(),
    active: z.coerce.boolean(),
});


export const CreatePermission = Permission.omit({ name: true });