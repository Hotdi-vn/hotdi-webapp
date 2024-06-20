import 'server-only'

import { ResponseData, ServerError } from '@/utils/data-fetching-utils';
import { log } from 'console';
import { deleteApi, get, getNoCache, post, put } from '@/utils/server-side-fetching';
import { CartItem, InventoryStatus, ProductInfo, PublishStatus, Role } from '@/model/market-data-model';
import { getSession } from '@/server-actions/authentication-actions';
import { ERROR_CODE_ITEM_NOT_FOUND } from '@/constants/common-contants';
import { Category } from '@/model/market-data-model';

const BASE_URL = '/market';

export type CategoryQuery = {
    parent?: string;
    skip?: number;
    limit?: number;
}

export async function getCategories(query: CategoryQuery = { skip: 0, limit: 20 }): Promise<ResponseData<Category[]>> {
    let response;
    try {
        response = await getNoCache<Category[]>(`${BASE_URL}/v1/categories${buildQueryString(query)}`);
        if (response.error) {
            log('Error from getCategories:', response.error.id, response.error.code);
            throw new ServerError(response.error.id, response.error.code);
        }
        return response;
    } catch (error) {
        log('Error from getCategories', error);
        throw error;
    }
}

export type ProductPopulateQuery = {
    populate?: string;
}

export async function createProduct(productInfo: ProductInfo, populateQuery: ProductPopulateQuery = {}): Promise<ProductInfo> {
    let response;
    const session = await getSession();
    try {
        response = await post<ProductInfo>(`${BASE_URL}/v1/products${buildQueryString(populateQuery)}`, productInfo, session.userProfile?.token);
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

export async function updateProduct(productInfo: ProductInfo | Partial<ProductInfo>, populateQuery: ProductPopulateQuery = {}): Promise<ProductInfo> {
    let response;
    const session = await getSession();
    try {
        response = await put<ProductInfo>(`${BASE_URL}/v1/products/${productInfo._id}${buildQueryString(populateQuery)}`, productInfo, session.userProfile?.token);
        if (response.error) {
            log('Error from updateProduct:', response.error.id, response.error.code);
            throw new ServerError(response.error.id, response.error.code);
        }
        return response.data;
    } catch (error) {
        log('Error from updateProduct', error);
        throw error;
    }
}

export async function deleteProduct(id: string): Promise<ProductInfo> {
    let response;
    const session = await getSession();
    try {
        response = await deleteApi<ProductInfo>(`${BASE_URL}/v1/products/${id}`, {}, session.userProfile?.token);
        if (response.error) {
            log('Error from deleteProduct:', response.error.id, response.error.code);
            throw new ServerError(response.error.id, response.error.code);
        }
        return response.data;
    } catch (error) {
        log('Error from deleteProduct', error);
        throw error;
    }
}

export type ProductQuery = {
    inventoryStatus?: InventoryStatus;
    publishStatus?: PublishStatus;
    skip?: number;
    limit?: number;
    populate?: string;
}

export async function getMyProducts(query: ProductQuery = { skip: 0, limit: 20 }): Promise<ResponseData<ProductInfo[]>> {
    let response;
    const session = await getSession();

    try {
        response = await get<ProductInfo[]>(`${BASE_URL}/v1/products/me${buildQueryString(query)}`, 0, session.userProfile?.token);
        if (response.error) {
            log('Error from getMyProducts:', response.error.id, response.error.code);
            throw new ServerError(response.error.id, response.error.code);
        }
        return response;
    } catch (error) {
        log('Error from getMyProducts', error);
        throw error;
    }
}

export async function getMyCartItems(query: CartItemQuery = { skip: 0, limit: 20 }): Promise<ResponseData<CartItem[]>> {
    let response;
    const session = await getSession();

    try {
        response = await get<CartItem[]>(`${BASE_URL}/v1/cart-items/me${buildQueryString(query)}`, 0, session.userProfile?.token);
        if (response.error) {
            log('Error from getMyCartItems:', response.error.id, response.error.code);
            throw new ServerError(response.error.id, response.error.code);
        }
        return response;
    } catch (error) {
        log('Error from getMyCartItems', error);
        throw error;
    }
}

export async function addCartItem(productId: string): Promise<ResponseData<CartItem>> {
    let response;
    const session = await getSession();

    try {
        response = await post<CartItem>(`${BASE_URL}/v1/cart-items`, { productId: productId }, session.userProfile?.token);
        if (response.error) {
            log('Error from addCartItems:', response.error.id, response.error.code);
            throw new ServerError(response.error.id, response.error.code);
        }
        return response;
    } catch (error) {
        log('Error from addCartItems', error);
        throw error;
    }
}

type PagingQuery = {
    skip?: number;
    limit?: number;
}

export type CartItemQuery = PagingQuery & {
    populate?: 'productId';
}

function buildQueryString(query: Object) {
    let queryList = Object.entries(query)
        .filter(([key, value]) => value)
        .map(([key, value]) => `${key}=${value}`);

    return queryList.length > 0 ? `?${queryList.join('&')}` : '';
}

type Permission = {
    _id: string,
    roles: Role[],
}

export async function addMyRole(role: Role, jwt?: string): Promise<ResponseData<Permission>> {
    let response;
    let token;

    if (jwt) {
        token = jwt
    } else {
        const session = await getSession();
        token = session.userProfile?.token;
    }

    try {
        response = await post<Permission>(`${BASE_URL}/v1/permissions/me/${role}`, {}, token);
        if (response.error) {
            log('Error from addMyRole:', response.error.id, response.error.code);
            throw new ServerError(response.error.id, response.error.code);
        }
        return response;
    } catch (error) {
        log('Error from addMyRole', error);
        throw error;
    }
}

export async function getUserRoles(userId: string): Promise<ResponseData<Permission>> {
    let response;

    try {
        response = await get<Permission>(`${BASE_URL}/v1/permissions/${userId}`);
        if (response.error && response.error.code !== ERROR_CODE_ITEM_NOT_FOUND) {
            log('Error from getUserRoles:', response.error.id, response.error.code);
            throw new ServerError(response.error.id, response.error.code);
        }
        return response;
    } catch (error) {
        log('Error from getUserRoles', error);
        throw error;
    }
}

export async function getMyRoles(): Promise<ResponseData<Permission>> {
    const session = await getSession();
    if (session.userProfile?.id === undefined) {
        throw new ServerError('Error in getMyRoles', 'User not found');
    }
    return getUserRoles(session.userProfile.id)
}

export async function getProductById(id: string, query: ProductQuery = {}): Promise<ResponseData<ProductInfo>> {
    let response;
    try {
        response = await get<ProductInfo>(`${BASE_URL}/v1/products/${id}${buildQueryString(query)}`);
        if (response.error) {
            log('Error from getProductById:', response.error.id, response.error.code);
            throw new ServerError(response.error.id, response.error.code);
        }
        return response;
    } catch (error) {
        log('Error from getProductById', error);
        throw error;
    }
}