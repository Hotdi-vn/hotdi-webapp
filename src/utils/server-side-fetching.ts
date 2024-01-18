import 'server-only'
import { ResponseData } from './data-fetching-utils';

export async function get<T>(path: string, options?: any): Promise<ResponseData<T>> {
    const res = await fetch(`${process.env.API_ENDPOINT}${path}`, options);
    return res.json();
};