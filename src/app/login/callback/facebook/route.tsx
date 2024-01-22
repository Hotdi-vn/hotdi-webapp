import { getJwtTokenFromFacebookCode } from '@/api-services/auth-service';
import { LOGIN_REDIRECT_URL_COOKIE } from '@/constants/common-contants';
import { loginSession } from '@/server-actions/authentication-actions';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest, context: { params: any }) {
  const fbToken = request.nextUrl.searchParams.get('code') ?? '';
  const redirectUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/login/callback/facebook`;
  const userProfile = await getJwtTokenFromFacebookCode(fbToken, redirectUrl);
  await loginSession(userProfile);
  const loginRedirectUrl = cookies().get(LOGIN_REDIRECT_URL_COOKIE)?.value ?? '/'
  redirect(loginRedirectUrl);
}
