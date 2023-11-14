import Collections, { DB_NAME } from "@/lib/consts/db";
import { Key, KeyType, getFilter, getSort } from "@/lib/helpers/query";
import clientPromise from "@/lib/mongodb";
import url from "url";

const COLLECTION = Collections.User;

export async function getUser(username: string)
{
    const client = await clientPromise;
    const col = client.db(DB_NAME).collection(Collections.User);

    const existingUser = await col.findOne({
        username: username
    }) as any;

    return existingUser;
}

export async function GET(request: Request)
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
                searchedFields: ["username"]
            }
        ];

        const page = query.page ? parseInt(query.page as string) : 0;
        const limit = query.limit ? parseInt(query.limit as string) : 20;
        const skip = page * limit;

        const filter = getFilter(keys, query);
        const sort = getSort(query.sort_by as string);

        const docs = await col.find(filter, {
            sort,
            projection: {
                password: 0,
                email: 0
            },
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


