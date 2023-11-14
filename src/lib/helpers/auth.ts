import { getUser } from "@/app/api/v1/users/route";
import { verify } from "argon2";
import jwt from 'jsonwebtoken';

// const ONE_HOUR = Math.floor(Date.now() / 1000) + (60 * 60)
const AUTH_SECRET_KEY = process.env.AUTH_SECRET_KEY as string;
export function signJwt(payload: string | object) 
{
    const token = jwt.sign(
        payload,
        AUTH_SECRET_KEY,
        {
            expiresIn: "1d"
        }
    );
    return token;
};

export function verifyJwt(token: string) 
{
    const decoded = jwt.verify(token, AUTH_SECRET_KEY);
    return decoded;
};

interface LoginInput
{
    username: string;
    password: string;
}



export async function login({ username, password }: LoginInput)
{
    const res = {
        status: 400,
        body: {
            success: false,
            username: {
                value: username,
                error: ""
            },
            password: {
                value: password,
                error: ""
            }
        }
    };

    if (!username.trim())
    {
        res.body.username.error = "Username cannot be empty.";
        return res;
    }
    if (!password.trim())
    {
        res.body.password.error = "Password cannot be empty.";
        return res;
    }


    const existingUser = await getUser(username);

    if (!existingUser)
    {
        res.body.username.error = "User not found.";
        return res;
    }

    const isMatch = await verify(existingUser.password, password);

    delete existingUser.password;

    if (!isMatch)
    {
        res.body.password.error = "Incorrect password.";
        return res;
    }

    const token = signJwt({ _id: existingUser._id });
    return {
        status: 200,
        body: {
            success: true,
            data: existingUser,
            token: token
        },
    };


}