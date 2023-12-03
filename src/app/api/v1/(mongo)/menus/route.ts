import Collections, { DB_NAME } from "@/lib/consts/db";
import clientPromise from "@/lib/mongodb";
import { Filter, ObjectId } from "mongodb";
import { NextRequest } from "next/server";
import url from "url";
import { create, deleteMany, readMany } from "@/lib/api/menus";

const COL_NAME = Collections.Menu;

export async function getOne(filter: Filter<any>)
{
    const client = await clientPromise;
    const col = client.db(DB_NAME).collection(COL_NAME);
    return await col.findOne(filter);
}





export async function GET(request: NextRequest)
{

    try
    {
        const query = url.parse(request.url, true).query;
        const { page, limit, count, data } = await readMany(query);
        return Response.json({ page, limit, count, data }, { status: 200 });
    } catch (e: any)
    {
        console.error(e);
        return Response.json({ error: e, message: e.message }, { status: 400 });
    }
}


export async function POST(request: NextRequest)
{
    try
    {
        const body = await request.json();
        const { success, data } = await create(body);
        if (!success)
        {
            return Response.json({
                error: data,
                message: 'Missing Fields.',
            }, { status: 400 });
        }
        return Response.json({ data: data }, { status: 201 });
    } catch (e: any)
    {
        console.error(e);
        return Response.json({ error: e, message: e.message }, { status: 400 });
    }
};

export async function DELETE(request: NextRequest)
{
    try
    {
        const query = url.parse(request.url, true).query;
        if (!query.ids || typeof query.ids !== "string")
        {
            return Response.json({ message: "Ids are required" }, { status: 400 });
        }
        const ids = query.ids.split(",").map(v => new ObjectId(v.trim()));
        const dbRes = await deleteMany(ids);
        return Response.json({ data: dbRes }, { status: 201 });
    } catch (e: any)
    {
        console.error(e);
        return Response.json({ error: e, message: e.message }, { status: 400 });
    }
};