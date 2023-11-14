import { NextRequest, NextResponse } from "next/server";
import { verifyJwt } from "../helpers/auth";
import Collections, { DB_NAME } from "../consts/db";
import clientPromise from "../mongodb";
import { ObjectId } from "mongodb";


export interface AuthenticatedRequest extends NextRequest
{
    user: any;
}


export async function authenticate(request: AuthenticatedRequest)
{

    const unauthenticatedRes = NextResponse.json({
        success: false,
        error: "Unauthenticated"
    }, { status: 401 });


    const cookieToken = request.cookies.get("token");
    const authHeader = request.headers.get("Authorization");

    if (!authHeader)
    {
        return unauthenticatedRes;
    }

    const [bearer, bearerToken] = authHeader.split(" ");

    if (bearer !== "Bearer")
    {
        return unauthenticatedRes;
    }

    const token = cookieToken || bearerToken;
    if (!token)
    {
        return unauthenticatedRes;
    }

    const jwtRes: any = verifyJwt(token as string);
    if (!jwtRes._id)
    {
        return unauthenticatedRes;
    }

    const client = await clientPromise;
    const col = client.db(DB_NAME).collection(Collections.User);

    const existingUser = await col.findOne({
        _id: new ObjectId(jwtRes._id)
    }) as any;

    if (!existingUser)
    {
        return unauthenticatedRes;
    }
    console.log("existingUser", existingUser);
    
    request.user = existingUser;
    return NextResponse.next();
}