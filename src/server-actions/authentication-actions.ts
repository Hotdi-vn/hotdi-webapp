'use server'

import { addMyRole, getUserRoles } from "@/api-services/market-service";
import { LOGIN_REDIRECT_URL_COOKIE, LOGIN_REDIRECT_URL_FIELD_NAME, SELLER_LOGIN_COOKIE, SELLER_LOGIN_FIELD_NAME } from "@/constants/common-contants";
import { SessionData, UserProfile, defaultSession, sessionOptions } from "@/libs/session-options";
import { Role } from "@/model/market-data-model";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function facebookLogin(formData: FormData) {
    const redirectUri = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/facebook/login?redirect_uri=${process.env.NEXT_PUBLIC_DOMAIN}/login/callback/facebook`;
    cookies().set(LOGIN_REDIRECT_URL_COOKIE, formData.get(LOGIN_REDIRECT_URL_FIELD_NAME)?.toString() ?? '/');
    cookies().set(SELLER_LOGIN_COOKIE, formData.get(SELLER_LOGIN_FIELD_NAME)?.toString() ?? 'false');
    redirect(redirectUri);
}

async function getIronSessionData() {
    return getIronSession<SessionData>(cookies(), sessionOptions);
}

export async function getSession() {
    const session = await getIronSessionData();

    if (!session.isLoggedIn) {
        return defaultSession;
    }

    return session;
}

export async function loginSession(userProfile: UserProfile, isSellerLogin: boolean = false) {
    const session = await getIronSessionData();
    session.isLoggedIn = true;

    let userRoleResponse = await getUserRoles(userProfile.id);
    if (isSellerLogin) {
        // Seller login
        if (!userRoleResponse.data.roles.some(role => role === Role.Seller)) {
            userRoleResponse = await addMyRole(Role.Seller, userProfile.token);
        }
    } else {
        // Buyer login
        if (!userRoleResponse.data.roles.some(role => role === Role.Buyer)) {
            userRoleResponse = await addMyRole(Role.Buyer, userProfile.token);
        }
    }
    userProfile.roles = userRoleResponse.data.roles;
    session.userProfile = userProfile;
    await session.save();
    return session;
}

export async function logoutSession() {
    const session = await getIronSessionData();
    session.destroy();
    return defaultSession;
}