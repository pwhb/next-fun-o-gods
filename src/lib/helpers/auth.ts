import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Filter } from 'mongodb';

import clientPromise from '../mongodb';
import Collections, { DB_NAME } from '../consts/db';

const AUTH_SECRET = process.env.AUTH_SECRET as string;
function sign(payload: string | object) 
{
    const token = jwt.sign(
        payload,
        AUTH_SECRET,
        {
            expiresIn: "1d"
        }
    );
    return token;
};

function verify(token: string) 
{
    const decoded = jwt.verify(token, AUTH_SECRET);
    return decoded;
};
async function getUser(filter: Filter<any>)
{
    try
    {

        const client = await clientPromise;
        const col = client.db(DB_NAME).collection(Collections.User);
        const docs = await col.aggregate([
            {
                $match: filter
            },
            {
                $lookup: {
                    from: "roles",
                    localField: "role",
                    foreignField: "_id",
                    as: "role"
                }
            },
            {
                $addFields: {
                    role: { $arrayElemAt: ['$role.name', 0] }
                }
            },
            {
                $limit: 1
            }
        ]).toArray();
        return docs[0];
    } catch (e)
    {
        console.error(e);
        return null;
    }
}

export async function signIn({ username, password }: { username: string, password: string; })
{
    const user = await getUser({ username: username });
    if (!user)
    {
        return {
            error: {
                username: ["User not found."],
                password: [""]
            }
        };
    }
    const passwordsMatch = await bcrypt.compare(password, user.password);
    if (!passwordsMatch)
    {
        return {
            error: {
                username: [""],
                password: ["Incorrect password."]
            }
        };
    }

    delete user.password;

    return {
        data: {
            user,
            token: sign({ username: user.username })
        }
    };
}