import { NextResponse } from "next/server";

export const unauthenticated = NextResponse.json({
    success: false,
    message: "Unauthenticated"
}, { status: 401 });

export const notFound = NextResponse.json({
    success: false,
    message: "Not found"
}, { status: 404 });