import { z } from 'zod';

export const AuthInput = z.object({
    username: z.string().min(1, "Username is required."),
    password: z.string().min(1, "Password is required."),
});

export interface IUser extends z.infer<typeof User>
{
    subMenus?: IUser[];
};


export const User = z.object({
    name: z.string(),
    username: z.string().min(1, "Username is required."),
    role: z.string().min(1, "Role is required."),
    active: z.coerce.boolean(),
});