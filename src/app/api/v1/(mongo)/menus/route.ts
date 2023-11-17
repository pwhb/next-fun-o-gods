import { DB_NAME } from "@/lib/consts/db";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { notFound } from "next/navigation";

export async function GET(request: Request, { params }: { params: { slug: string; id: string; }; })
{
    try
    {
        const client = await clientPromise;
        const col = client.db(DB_NAME).collection(params.slug);

        const dbRes = await col.findOne({ _id: new ObjectId(params.id) });

        if (!dbRes)
        {
            return notFound;
        }

        return Response.json({  data: dbRes }, { status: 200 });
    } catch (e: any)
    {
        console.error(e);
        return Response.json({  error: e, message: e.message }, { status: 400 });
    }
};

export async function PATCH(request: Request, { params }: { params: { slug: string; id: string; }; })
{
    try
    {
        const body = await request.json();
        const client = await clientPromise;
        const col = client.db(DB_NAME).collection(params.slug);

        const dbRes = await col.findOneAndUpdate({ _id: new ObjectId(params.id) }, {
            $set: {
                label: body.label,
                value: body.value,
                description: body.description,
                active: !!body.active ? body.active : false,
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        }, {
            returnDocument: "after"
        });

        return Response.json({  data: dbRes }, { status: 201 });
    } catch (e: any)
    {
        console.error(e);
        return Response.json({  error: e, message: e.message }, { status: 400 });
    }
};

export async function DELETE(request: Request, { params }: { params: { slug: string; id: string; }; })
{
    try
    {
        const client = await clientPromise;
        const col = client.db(DB_NAME).collection(params.slug);

        const dbRes = await col.deleteOne({
            _id: new ObjectId(params.id)
        });

        return Response.json({  data: dbRes }, { status: 200 });
    } catch (e: any)
    {
        console.error(e);
        return Response.json({  error: e, message: e.message }, { status: 400 });
    }
};