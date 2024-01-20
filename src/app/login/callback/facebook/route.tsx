import { LOGIN_REDIRECT_URL_COOKIE } from '@/constants/common-contants';
import { UserProfile } from '@/libs/session-options';
import { loginSession } from '@/server-actions/authentication-actions';
import { get, post } from '@/utils/server-side-fetching';
import { log } from 'console';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest, context: { params: any }) {
  const fbToken = request.nextUrl.searchParams.get('code');
  const redirectUrl = encodeURI(`${request.nextUrl.protocol}//${request.nextUrl.host}${request.nextUrl.pathname}`);
  const response = await post<UserProfile>(`/auth/facebook/token`, { redirect_uri: redirectUrl, code: fbToken });
  if (response.error) {
    log('Get JWT from FB token error', response.error);
    redirect('/500');
  }

  const session = await loginSession(response.data);
  const loginRedirectUrl = cookies().get(LOGIN_REDIRECT_URL_COOKIE)?.value ?? '/'
  redirect(loginRedirectUrl);
}
