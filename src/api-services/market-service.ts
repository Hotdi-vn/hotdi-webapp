import 'server-only'

import { ResponseData, ServerError } from '@/utils/data-fetching-utils';
import { log } from 'console';
import { get, getNoCache, post } from '@/utils/server-side-fetching';
import { InventoryStatus, ProductInfo, PublishStatus } from '@/model/market-data-model';
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

export type ProductQuery = {
    inventoryStatus?: InventoryStatus;
    publishStatus?: PublishStatus;
    skip?: number;
    limit?: number;
}

function buildProductQueryString(query: ProductQuery) {
    let queryList = [];
    if (query.inventoryStatus) {
        queryList.push(`inventoryStatus=${query.inventoryStatus}`);
    }
    if (query.publishStatus) {
        queryList.push(`publishStatus=${query.publishStatus}`);
    }
    if (query.skip) {
        queryList.push(`skip=${query.skip}`);
    }
    if (query.limit) {
        queryList.push(`limit=${query.limit}`);
    }

    return queryList.length > 0 ? `?${queryList.join('&')}` : '';
}

export async function getMyProducts(query: ProductQuery = { skip: 0, limit: 20 }): Promise<ResponseData<ProductInfo[]>> {
    let response;
    const session = await getSession();

    try {
        response = await get<ProductInfo[]>(`${BASE_URL}/v1/products/me${buildProductQueryString(query)}`, 0, session.userProfile?.token);
        if (response.error) {
            log('Error from createProduct:', response.error.id, response.error.code);
            throw new ServerError(response.error.id, response.error.code);
        }
        return response;
    } catch (error) {
        log('Error from createProduct', error);
        throw error;
    }
}