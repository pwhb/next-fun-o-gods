import z from "zod";

export const Role = z.object({
    name: z.string(),
    description: z.string().optional(),
    menus: z.array(z.string()).optional(),
    permissions: z.array(z.string()).optional(),
    active: z.boolean()
});