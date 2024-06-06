import 'server-only'

import { UserProfile } from '@/libs/session-options';
import { ServerError } from '@/utils/data-fetching-utils';
import { post, get, getNoCache } from '@/utils/server-side-fetching';
import { log } from 'console';

const BASE_URL = '';
const API_ENDPOINT = process.env.NEXT_PUBLIC_AUTH_ENDPOINT;

export async function getJwtTokenFromFacebookCode(code: string, redirect_uri: string): Promise<UserProfile> {
    let response;
    try {
        response = await post<UserProfile>(`${BASE_URL}/facebook/token`, { redirect_uri: redirect_uri, code: code }, '', API_ENDPOINT);
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

export async function getJwtTokenFromZaloCode(code: string, redirect_uri: string): Promise<UserProfile> {
    let response;
    try {
        response = await post<UserProfile>(`${BASE_URL}/zalo/token`, { redirect_uri: redirect_uri, code: code }, '', API_ENDPOINT);
        if (response.error) {
            log('Error from getJwtTokenFromZaloCode:', response.error.id, response.error.code);
            throw new ServerError(response.error.id, response.error.code);
        }
        return response.data;
    } catch (error) {
        log('Error from getJwtTokenFromZaloCode', error);
        throw error;
    }
}

export async function getUserInfoById(id: string): Promise<UserProfile> {
    let response;
    try {
        response = await getNoCache<UserProfile>(`${BASE_URL}/v1/users/${id}`, API_ENDPOINT);
        if (response.error) {
            log('Error from getUserInfoById:', response.error.id, response.error.code);
            throw new ServerError(response.error.id, response.error.code);
        }
        return response.data;
    } catch (error) {
        log('Error from getUserInfoById', error);
        throw error;
    }
}