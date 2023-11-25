import { DEFAULT_LIMIT } from "@/lib/consts/consts";
import Collections, { DB_NAME } from "@/lib/consts/db";
import { Key, KeyType, getFilter, getSort } from "@/lib/helpers/query";
import { Permission } from "@/lib/models/permissions";
import clientPromise from "@/lib/mongodb";
import { NextRequest } from "next/server";
import url from "url";

const COL_NAME = Collections.Permission;

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
        const limit = query.limit ? parseInt(query.limit as string) : DEFAULT_LIMIT;
        const skip = page * limit;

        const filter = getFilter(keys, query);
        const sort = getSort(query.sort_by as string);

        const docs = await col.aggregate([
            {
                $match: filter
            },
            {
                $lookup: {
                    from: "menus",
                    localField: "menu",
                    foreignField: "_id",
                    as: "menu"
                }
            },
            // {
            //     $addFields: {
            //         menu: { $arrayElemAt: ['$menu.name', 0] }
            //     }
            // },
            {
                $sort: sort
            },
            {
                $skip: skip
            },
            {
                $limit: limit
            }
        ]).toArray();
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
        const validated = Permission.safeParse(body);
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
            menu: validated.data.menu ? validated.data.menu : null,
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