import { update } from "@/lib/api/menus";
import Collections, { DB_NAME } from "@/lib/consts/db";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { notFound } from "next/navigation";

const COL_NAME = Collections.Menu;
export async function GET(request: Request, { params }: { params: { id: string; }; })
{
    try
    {
        const client = await clientPromise;
        const col = client.db(DB_NAME).collection(COL_NAME);

        const dbRes = await col.findOne({ _id: new ObjectId(params.id) });

        if (!dbRes)
        {
            return notFound;
        }

        return Response.json({ data: dbRes }, { status: 200 });
    } catch (e: any)
    {
        console.error(e);
        return Response.json({ error: e, message: e.message }, { status: 400 });
    }
};

export async function PATCH(request: Request, { params }: { params: { id: string; }; })
{
    try
    {
        const body = await request.json();
        const { success, data } = await update(params.id, body);
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

export async function DELETE(request: Request, { params }: { params: { id: string; }; })
{
    try
    {
        const client = await clientPromise;
        const col = client.db(DB_NAME).collection(COL_NAME);

        const dbRes = await col.deleteOne({
            _id: new ObjectId(params.id)
        });

        return Response.json({ data: dbRes }, { status: 200 });
    } catch (e: any)
    {
        console.error(e);
        return Response.json({ error: e, message: e.message }, { status: 400 });
    }
};