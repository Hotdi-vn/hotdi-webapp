import 'server-only'

import { ServerError } from '@/utils/data-fetching-utils';
import { log } from 'console';
import { getNoCache, post } from '@/utils/server-side-fetching';
import { ProductInfo } from '@/model/market-data-model';
import { getSession } from '@/server-actions/authentication-actions';

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

export async function createProduct(productInfo: ProductInfo): Promise<ProductInfo> {
    let response;
    const session = await getSession();
    try {
        response = await post<ProductInfo>(`${BASE_URL}/v1/products`, productInfo, session.userProfile?.token);
        if (response.error) {
            log('Error from createProduct:', response.error.id, response.error.code);
            throw new ServerError(response.error.id, response.error.code);
        }
        return response.data;
    } catch (error) {
        log('Error from createProduct', error);
        throw error;
    }
}