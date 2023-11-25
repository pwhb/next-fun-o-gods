import Collections, { DB_NAME } from "@/lib/consts/db";
import { Permission } from "@/lib/models/permissions";

import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { notFound } from "next/navigation";

const COL_NAME = Collections.Permission;
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

        const dbRes = await col.findOneAndUpdate({ _id: new ObjectId(params.id) }, {
            $set: {
                ...validated.data,
                menu: validated.data.menu ? validated.data.menu : null,
                "history.updated": {
                    // by: authenticatedUser._id,
                    at: new Date()
                },

            }
        }, {
            returnDocument: "after"
        });

        return Response.json({ data: dbRes }, { status: 201 });
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