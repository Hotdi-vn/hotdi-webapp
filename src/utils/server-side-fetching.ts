import 'server-only'
import { InternalServerError, ResponseData } from './data-fetching-utils';
import { log } from 'console';

async function fetchApi<T>(path: string, options?: any): Promise<ResponseData<T>> {
    let res;
    try {
        res = await fetch(`${process.env.API_ENDPOINT}${path}`, options);
        return res.json();
    } catch (error) {
        log('Error when fetching api', error);
        if (error instanceof Error) {
            throw new InternalServerError(res?.status ?? 0, error.name, error.message);
        }
        throw error;
    }
}

export async function get<T>(
    path: string, cacheDuration: number = 0, cacheTags: [] = [], jwt: string = ''
): Promise<ResponseData<T>> {
    return fetchApi(path, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`
        },
        next: { revalidate: cacheDuration, tags: cacheTags }
    });
}

export async function getNoCache<T>(path: string): Promise<ResponseData<T>> {
    return fetchApi(path, { next: { revalidate: 0 } });
}

export async function post<T>(path: string, requestBody: any = {}, jwt: string = ''): Promise<ResponseData<T>> {
    return fetchApi(path, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`
        },
        body: JSON.stringify(requestBody)
    });
}