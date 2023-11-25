import Collections, { DB_NAME } from "@/lib/consts/db";
import { Key, KeyType, getFilter, getSort } from "@/lib/helpers/query";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextRequest } from "next/server";
import url from "url";
import { User } from "@/lib/models/users";
import { getCount, getMany } from "@/lib/api/db";
import { DEFAULT_LIMIT } from "@/lib/consts/consts";

const COL_NAME = Collections.User;


export async function GET(request: NextRequest)
{

    try
    {
        const query = url.parse(request.url, true).query;

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
        const validated = User.safeParse(body);
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
            role: validated.data.role ? new ObjectId(validated.data.role) : null,
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
        const client = await clientPromise;
        const col = client.db(DB_NAME).collection(COL_NAME);
        const dbRes = await col.deleteMany({ _id: { $in: ids } });
        return Response.json({ data: dbRes }, { status: 201 });
    } catch (e: any)
    {
        console.error(e);
        return Response.json({ error: e, message: e.message }, { status: 400 });
    }
};