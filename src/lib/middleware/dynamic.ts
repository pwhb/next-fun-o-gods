import { NextResponse } from "next/server";

const collections = ["menus", "permissions", "roles"];

export function validateRoute(slug: string)
{

    console.log("slug", slug);

    if (collections.includes(slug))
    {
        console.log("here");

        return NextResponse.next();
    };
    
    console.log("hello");

    return NextResponse.json({ message: "Route doesn't exist." }, { status: 404 });
}
