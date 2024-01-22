import 'server-only'

import { ServerError } from '@/utils/data-fetching-utils';
import { log } from 'console';
import { getNoCache } from '@/utils/server-side-fetching';

const BASE_URL = '/market';

export class Category {
    id: number;
    name: string;
    imageUrl: string;

    constructor(
        id: number,
        name: string,
        imageUrl: string,
    ) {
        this.id = id
        this.name = name
        this.imageUrl = imageUrl
    }
}

export async function getCategories(skip: number = 0, limit: number = 20): Promise<Category[]> {
    let response;
    try {
        response = await getNoCache<Category[]>(`${BASE_URL}/v1/categories`);
        if (response.error) {
            log('Error from getCategories:', response.error.id, response.error.code);
            throw new ServerError(response.error.id, response.error.code);
        }
        return response.data;
    } catch (error) {
        log('Error from getCategories', error);
        throw error;
    }
}