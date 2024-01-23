'use server'

import { LOGIN_REDIRECT_URL_COOKIE, LOGIN_REDIRECT_URL_FIELD_NAME } from "@/constants/common-contants";
import { Role, SessionData, UserProfile, defaultSession, sessionOptions } from "@/libs/session-options";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function facebookLogin(formData: FormData) {
    const redirectUri = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/facebook/login?redirect_uri=${process.env.NEXT_PUBLIC_DOMAIN}/login/callback/facebook`;
    cookies().set(LOGIN_REDIRECT_URL_COOKIE, formData.get(LOGIN_REDIRECT_URL_FIELD_NAME)?.toString() ?? '/');
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

export async function loginSession(userProfile: UserProfile) {
    const session = await getIronSessionData();
    session.isLoggedIn = true;
    session.userProfile = userProfile;

    // TODO get user role from the API
    session.userProfile.role = Role.Seller;

    await session.save();
    return session;
}

export async function logoutSession() {
    const session = await getIronSessionData();
    session.destroy();
    return defaultSession;
}