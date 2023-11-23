import { z } from 'zod';

export interface IMenu extends z.infer<typeof Menu>
{
    subMenus?: IMenu[];
};


export const Menu = z.object({
    name: z.string().min(1, "Name is required."),
    description: z.string(),
    icon: z.string(),
    route: z.string().min(1, "Route is required."),
    parent: z.string(),
    active: z.coerce.boolean(),
});




