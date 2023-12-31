import { ObjectId } from "mongodb";
import Collections, { DB_NAME } from "../consts/db";

import clientPromise from "../mongodb";
import { getCount, getMany } from "./db";
import { DEFAULT_LIMIT } from "../consts/consts";
import { Key, KeyType, getFilter, getSort } from "../helpers/query";
import { Role } from "../models/roles";


const COL_NAME = Collections.Role;
export async function create(data: any, authenticatedUser?: any)
{
    const validated = Role.safeParse(data);
    if (!validated.success)
    {
        console.log(validated.error.flatten().fieldErrors);

        return { success: false, data: validated.error.flatten().fieldErrors };
    }
    const client = await clientPromise;
    const col = client.db(DB_NAME).collection(COL_NAME);

    const dbRes = await col.insertOne({
        ...validated.data,
        menus: validated.data.menus ? validated.data.menus.map(v => new ObjectId(v)) : [],
        permissions: validated.data.permissions ? validated.data.permissions.map(v => new ObjectId(v)) : [],
        history: {
            created: {
                by: authenticatedUser?._id,
                at: new Date()
            },
        }
    });
    return { success: true, data: dbRes };
}

export async function readMany(query: any)
{
    const keys: Key[] = [
        {
            key: "q",
            type: KeyType.Regex,
            searchedFields: ["label"]
        },
        {
            key: "active",
            type: KeyType.Boolean
        }
    ];

    const page = query.page ? parseInt(query.page as string) : 0;
    const limit = query.limit ? parseInt(query.limit as string) : DEFAULT_LIMIT;
    const skip = page * limit;

    const filter = getFilter(keys, query);
    const sort = getSort(query.sort_by as string);

    const docs = await getMany(COL_NAME, filter, {
        sort,
        skip,
        limit
    });

    const count = await getCount(COL_NAME, filter);

    return { page, limit, count: count, data: docs };
}

export async function update(id: string, data: any, authenticatedUser?: any)
{
    const validated = Role.safeParse(data);
    if (!validated.success)
    {
        return { success: false, data: validated.error.flatten().fieldErrors };
    }
    const client = await clientPromise;
    const col = client.db(DB_NAME).collection(COL_NAME);

    const dbRes = await col.findOneAndUpdate({ _id: new ObjectId(id) }, {
        $set: {
            ...validated.data,
            menus: validated.data.menus ? validated.data.menus.map(v => new ObjectId(v)) : null,
            permissions: validated.data.permissions ? validated.data.permissions.map(v => new ObjectId(v)) : null,
            "history.updated": {
                by: authenticatedUser?._id,
                at: new Date()
            },

        }
    }, {
        returnDocument: "after"
    });
    return { success: true, data: dbRes };
}

export async function deleteMany(ids: ObjectId[])
{
    const client = await clientPromise;
    const col = client.db(DB_NAME).collection(COL_NAME);
    return await col.deleteMany({ _id: { $in: ids } });
}