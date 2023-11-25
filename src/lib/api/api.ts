import { Filter, FindOptions, ObjectId } from "mongodb";
import { DB_NAME } from "../consts/db";
import clientPromise from "../mongodb";

export async function getOneViaAPI(collection: string, id: string)
{
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/${collection}/${id}`);
    const data = await res.json();
    return data;
}
export async function getManyViaAPI(collection: string, query?: string)
{
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/${collection}?${query}`);
    const data = await res.json();

    console.log("data", data);

    return data;
}

export async function getCount(collection: string, filter: Filter<any>)
{
    const client = await clientPromise;
    const col = client.db(DB_NAME).collection(collection);
    return await col.countDocuments(filter);
}

export async function createViaAPI(collection: string, data: any)
{
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/${collection}`, {
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
        method: "POST",
    });
    return await res.json();
}

export async function updateViaAPI(collection: string, id: string, data: any)
{
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/${collection}/${id}`, {
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
        method: "PATCH",
    });

    return await res.json();
}

export async function deleteMany(collection: string, ids: string[])
{
    const client = await clientPromise;
    const col = client.db(DB_NAME).collection(collection);
    return await col.deleteMany({ _id: { $in: ids.map(id => new ObjectId(id)) } });
}

