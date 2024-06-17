import 'server-only'
import { InternalServerError, ResponseData } from './data-fetching-utils';
import { log } from 'console';

async function fetchApi(path: string, options?: any, apiEndpoint: string = process.env.API_ENDPOINT ?? ''): Promise<any> {
    let res;
    try {
        res = await fetch(`${apiEndpoint}${path}`, options);
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
    path: string, cacheDuration: number = 0, jwt: string = '', cacheTags: [] = [], apiEndpoint?: string
): Promise<ResponseData<T>> {
    return fetchApi(path, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`
        },
        next: { revalidate: cacheDuration, tags: cacheTags }
    }, apiEndpoint);
}

export async function getNoCache<T>(path: string, apiEndpoint?: string): Promise<ResponseData<T>> {
    return fetchApi(path, { next: { revalidate: 0 } }, apiEndpoint);
}

export async function post<T>(path: string, requestBody: any = {}, jwt: string = '', apiEndpoint?: string): Promise<ResponseData<T>> {
    return fetchApi(path, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`
        },
        body: JSON.stringify(requestBody)
    }, apiEndpoint);
}

export async function put<T>(path: string, requestBody: any = {}, jwt: string = '', apiEndpoint?: string): Promise<ResponseData<T>> {
    return fetchApi(path, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`
        },
        body: JSON.stringify(requestBody)
    }, apiEndpoint);
}

export async function patch<T>(path: string, requestBody: any = {}, jwt: string = '', apiEndpoint?: string): Promise<ResponseData<T>> {
    return fetchApi(path, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`
        },
        body: JSON.stringify(requestBody)
    }, apiEndpoint);
}

export async function deleteApi<T>(path: string, requestBody: any = {}, jwt: string = '', apiEndpoint?: string): Promise<ResponseData<T>> {
    return fetchApi(path, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`
        },
        body: JSON.stringify(requestBody)
    }, apiEndpoint);
}
