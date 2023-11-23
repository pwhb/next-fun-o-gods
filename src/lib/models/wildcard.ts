import { z } from 'zod';

export interface IWildCard extends z.infer<typeof WildCard>
{

};


export const WildCard = z.object({
    name: z.string().min(1, "Name is required."),
    active: z.coerce.boolean(),
});




