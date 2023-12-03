import { ObjectId } from "mongodb";
import Collections, { DB_NAME } from "../consts/db";

import clientPromise from "../mongodb";
import { getCount, getMany } from "./db";
import { DEFAULT_LIMIT } from "../consts/consts";
import { Key, KeyType, getFilter, getSort } from "../helpers/query";
import { CreatePermission, Permission } from "../models/permissions";

const COL_NAME = Collections.Permission;
export async function create(data: any, authenticatedUser?: any)
{
    const validated = CreatePermission.safeParse(data);
    if (!validated.success)
    {
        return { success: false, data: validated.error.flatten().fieldErrors };
    }
    const client = await clientPromise;
    const db = client.db(DB_NAME);

    const { name } = await db.collection(Collections.Menu).findOne({ _id: new ObjectId(validated.data.menu) }) as any;
    const dbRes = await db.collection(COL_NAME).insertOne({
        ...validated.data,
        name: validated.data.action + "-" + name,
        menu: validated.data.menu ? new ObjectId(validated.data.menu) : null,
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
    const validated = CreatePermission.safeParse(data);
    if (!validated.success)
    {
        return { success: false, data: validated.error.flatten().fieldErrors };
    }
    const client = await clientPromise;
    const db = client.db(DB_NAME);

    const { name } = await db.collection(Collections.Menu).findOne({ _id: new ObjectId(validated.data.menu) }) as any;

    const dbRes = await db.collection(COL_NAME).findOneAndUpdate({ _id: new ObjectId(id) }, {
        $set: {
            ...validated.data,
            name: validated.data.action + "-" + name,
            menu: validated.data.menu ? new ObjectId(validated.data.menu) : null,
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