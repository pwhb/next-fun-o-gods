import Collections, { DB_NAME } from "@/lib/consts/db";
import { Key, KeyType, getFilter, getSort } from "@/lib/helpers/query";
import { AuthenticatedRequest, authenticate } from "@/lib/middleware/auth";
import clientPromise from "@/lib/mongodb";
import { NextRequest } from "next/server";
import url from "url";

const COLLECTION = Collections.Genres;

export async function GET(request: NextRequest)
{

    try
    {
        const query = url.parse(request.url, true).query;
        const client = await clientPromise;
        const col = client.db(DB_NAME).collection(COLLECTION);
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
        return Response.json({ success: true, page, limit, count: count, data: docs }, { status: 200 });
    } catch (err)
    {
        console.error(err);
        return Response.json({ success: false, error: err }, { status: 400 });
    }
}


export async function POST(request: AuthenticatedRequest)
{
    try
    {
        console.log("before auth");

        authenticate(request);

        console.log("after auth");

        const body = await request.json();
        const client = await clientPromise;
        const col = client.db(DB_NAME).collection(COLLECTION);

        const dbRes = await col.insertOne({
            label: body.label,
            value: body.value,
            description: body.description,
            active: !!body.active ? body.active : false,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        return Response.json({ success: true, data: dbRes }, { status: 201 });
    } catch (err)
    {
        console.error(err);
        return Response.json({ success: false, error: err }, { status: 400 });
    }
};