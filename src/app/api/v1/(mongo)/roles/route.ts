import Collections, { DB_NAME } from "@/lib/consts/db";

import { Key, KeyType, getFilter, getSort } from "@/lib/helpers/query";
import { Role } from "@/lib/models/roles";

import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextRequest } from "next/server";
import url from "url";

const COL_NAME = Collections.Role;

export async function GET(request: NextRequest)
{

    try
    {
        const query = url.parse(request.url, true).query;
        const client = await clientPromise;
        const col = client.db(DB_NAME).collection(COL_NAME);
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
        const limit = query.limit ? parseInt(query.limit as string) : 20;
        const skip = page * limit;

        const filter = getFilter(keys, query);
        const sort = getSort(query.sort_by as string);

        const docs = await col.find(filter, {
            sort,
            skip,
            limit
        }).toArray();
        const count = await col.countDocuments(filter);
        return Response.json({ page, limit, count: count, data: docs }, { status: 200 });
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
        const validated = Role.safeParse(body);
        if (!validated.success)
        {
            return Response.json({
                error: validated.error.flatten().fieldErrors,
                message: 'Missing Fields.',
            }, { status: 400 });
        }
        const client = await clientPromise;
        const col = client.db(DB_NAME).collection(COL_NAME);
        // console.log("authenticatedUser", authenticatedUser._id);

        const dbRes = await col.insertOne({
            ...validated.data,
            menus: validated.data.menus ? validated.data.menus.map(v => new ObjectId(v)) : [],
            permissions: validated.data.permissions ? validated.data.permissions.map(v => new ObjectId(v)) : [],
            history: {
                created: {
                    // by: authenticatedUser._id,
                    at: new Date()
                },
            }
        });

        return Response.json({ data: dbRes }, { status: 201 });
    } catch (e: any)
    {
        console.error(e);
        return Response.json({ error: e, message: e.message }, { status: 400 });
    }
};