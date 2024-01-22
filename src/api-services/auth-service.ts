import 'server-only'

import { UserProfile } from '@/libs/session-options';
import { ServerError } from '@/utils/data-fetching-utils';
import { post } from '@/utils/server-side-fetching';
import { log } from 'console';

const BASE_URL = '/auth';

export async function getJwtTokenFromFacebookCode(code: string, redirect_uri: string): Promise<UserProfile> {
    let response;
    try {
        response = await post<UserProfile>(`${BASE_URL}/facebook/token`, { redirect_uri: redirect_uri, code: code });
        if (response.error) {
            log('Error from getJwtTokenFromFacebookCode:', response.error.id, response.error.code);
            throw new ServerError(response.error.id, response.error.code);
        }
        return response.data;
    } catch (error) {
        log('Error from getJwtTokenFromFacebookCode', error);
        throw error;
    }
}