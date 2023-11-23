import { z } from 'zod';

export const Permission = z.object({
    name: z.string().min(1, "Name is required."),
    description: z.string().optional(),
    menu: z.string().optional(),
    active: z.boolean()
});

