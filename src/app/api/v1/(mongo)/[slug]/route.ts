import Collections, { DB_NAME } from "@/lib/consts/db";

import { Key, KeyType, getFilter, getSort } from "@/lib/helpers/query";
import { unauthenticated } from "@/lib/helpers/response";

import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextRequest } from "next/server";
import url from "url";



export async function GET(request: NextRequest, { params }: { params: { slug: string; }; })
{

    try
    {
        const query = url.parse(request.url, true).query;
        const client = await clientPromise;
        const col = client.db(DB_NAME).collection(params.slug);
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


export async function POST(request: NextRequest, { params }: { params: { slug: string; }; })
{
    try
    {
        // const authenticatedUser = await getAuth(request);
        // if (!authenticatedUser)
        // {
        //     return unauthenticated;
        // }

        const body = await request.json();
        const client = await clientPromise;
        const col = client.db(DB_NAME).collection(params.slug);
        // console.log("authenticatedUser", authenticatedUser._id);

        const dbRes = await col.insertOne({
            ...body,
            active: !!body.active ? body.active : false,
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