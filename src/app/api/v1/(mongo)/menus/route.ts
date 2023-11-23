import Collections, { DB_NAME } from "@/lib/consts/db";
import { Key, KeyType, getFilter, getSort } from "@/lib/helpers/query";
import clientPromise from "@/lib/mongodb";
import { Filter, FindOptions, ObjectId } from "mongodb";
import { NextRequest } from "next/server";
import url from "url";
import { Menu } from "@/lib/models/menus";
import { makeTree, serialize } from "@/lib/helpers/structures";
import { time } from "@/lib/helpers/time";

const COL_NAME = Collections.Menu;

export async function getOne(filter: Filter<any>)
{
    const client = await clientPromise;
    const col = client.db(DB_NAME).collection(COL_NAME);
    return await col.findOne(filter);
}
export async function getMenuTree()
{


    const all = await time(async () => await getMany({ active: true }), "Fetching all menus");

    const serialized = await time(async () => serialize(all), "Serializing");

    const tree = await time(async () => makeTree(serialized, "subMenus"), "Making tree");
    return tree;
}

export async function getMany(filter: Filter<any>, options?: FindOptions<any> | undefined)
{
    const client = await clientPromise;
    const col = client.db(DB_NAME).collection(COL_NAME);
    return await col.find(filter, options).toArray();
}

async function getCount(filter: Filter<any>)
{
    const client = await clientPromise;
    const col = client.db(DB_NAME).collection(COL_NAME);
    return await col.countDocuments(filter);
}
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
        const limit = query.limit ? parseInt(query.limit as string) : 20;
        const skip = page * limit;

        const filter = getFilter(keys, query);
        const sort = getSort(query.sort_by as string);

        const docs = await getMany(filter, {
            sort,
            skip,
            limit
        });

        const count = await getCount(filter);

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
        const validated = Menu.safeParse(body);
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
            parent: validated.data.parent ? new ObjectId(validated.data.parent) : null,
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