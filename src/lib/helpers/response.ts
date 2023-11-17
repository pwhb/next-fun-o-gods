import { NextResponse } from "next/server";

export const unauthenticated = NextResponse.json({

    message: "Unauthenticated"
}, { status: 401 });

export const notFound = NextResponse.json({

    message: "Not found"
}, { status: 404 });
