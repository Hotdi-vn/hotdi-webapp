import 'server-only'
import { ResponseData } from './data-fetching-utils';

async function fetchApi<T>(path: string, options?: any): Promise<ResponseData<T>> {
    const res = await fetch(`${process.env.API_ENDPOINT}${path}`, options);
    return res.json();
}

export async function get<T>(path: string, cacheDuration: number = 10, cacheTags: [] = []): Promise<ResponseData<T>> {
    return fetchApi(path, { next: { revalidate: cacheDuration, tags: cacheTags } });
}

export async function getNoCache<T>(path: string): Promise<ResponseData<T>> {
    return fetchApi(path, { next: { revalidate: 0 } });
}

export async function post<T>(path: string, requestBody: any = {}): Promise<ResponseData<T>> {
    return fetchApi(path, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
    });
}