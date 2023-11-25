'use server';
import { Filter, FindOptions, ObjectId } from "mongodb";
import { DB_NAME } from "../consts/db";
import clientPromise from "../mongodb";

export async function getOne(collection: string, filter: Filter<any>)
{
    const client = await clientPromise;
    const col = client.db(DB_NAME).collection(collection);
    return await col.findOne(filter);
}
export async function getMany(collection: string, filter: Filter<any>, options?: FindOptions<any> | undefined)
{
    const client = await clientPromise;
    const col = client.db(DB_NAME).collection(collection);
    return await col.find(filter, options).toArray();
}

export async function getCount(collection: string, filter: Filter<any>)
{
    const client = await clientPromise;
    const col = client.db(DB_NAME).collection(collection);
    return await col.countDocuments(filter);
}

export async function create(collection: string, data: any)
{
    const client = await clientPromise;
    const col = client.db(DB_NAME).collection(collection);
    return await col.insertOne(data);
}

export async function update(collection: string, id: string, data: any)
{
    const client = await clientPromise;
    const col = client.db(DB_NAME).collection(collection);
    return await col.findOneAndUpdate({ _id: new ObjectId(id) }, {
        $set: data
    });
}

export async function deleteMany(collection: string, ids: string[])
{
    const client = await clientPromise;
    const col = client.db(DB_NAME).collection(collection);
    return await col.deleteMany({ _id: { $in: ids.map(id => new ObjectId(id)) } });
}

