import 'server-only'
import { ResponseData } from './data-fetching-utils';

export async function get<T>(url: string): Promise<ResponseData<T>> {
    const res = await fetch(`${process.env.API_ENDPOINT}${url}`);
    return res.json();
};