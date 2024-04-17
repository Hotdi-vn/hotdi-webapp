import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./server-actions/authentication-actions";
import { Role } from "./model/market-data-model";
import { LOGIN_REDIRECT_URL_FIELD_NAME } from "./constants/common-contants";

export async function middleware(request: NextRequest) {
    const requestPath = request.nextUrl.pathname;
    if (requestPath.startsWith('/seller/shop')) {
        // handle seller path without seller login page
        const session = await getSession();
        if (!session.userProfile || session.userProfile.roles.every(role => role !== Role.Seller)) {
            return NextResponse.redirect(new URL(`/seller/login?${LOGIN_REDIRECT_URL_FIELD_NAME}=${requestPath}`, request.url));
        }
    }
    return NextResponse.next();
}

export const config = {
    matcher: ['/seller/shop/:path*'],
}