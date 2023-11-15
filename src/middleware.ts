import { NextResponse } from 'next/server';
import { AuthenticatedRequest, authenticate } from './lib/middleware/auth';

// This function can be marked `async` if using `await` inside
export async function middleware(request: AuthenticatedRequest)
{
    const userJSONString = request.cookies.get("user");
    const tokenString = request.cookies.get("token");

    console.log("middleware", tokenString, request.nextUrl.pathname);



    switch (request.nextUrl.pathname)
    {
        case "/test/client": {
            break;
        }
        case "/test/server": {
            break;
        }
        case "/login": {
            if (userJSONString && tokenString && userJSONString.value && tokenString.value)
            {
                return NextResponse.redirect(new URL('/', request.url));
            }
            break;
        }
        default: {
            if (!userJSONString || !tokenString)
            {

                return NextResponse.redirect(new URL('/login', request.url));
            }
        }
    }

    return NextResponse.next();
}

// // See "Matching Paths" below to learn more
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico|logo.svg).*)',
    ],
};