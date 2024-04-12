import 'server-only'

import { ResponseData, ServerError } from '@/utils/data-fetching-utils';
import { log } from 'console';
import { get, getNoCache, post } from '@/utils/server-side-fetching';
import { InventoryStatus, ProductInfo, PublishStatus, Role } from '@/model/market-data-model';
import { getSession } from '@/server-actions/authentication-actions';
import { ERROR_CODE_ITEM_NOT_FOUND } from '@/constants/common-contants';

const BASE_URL = '/market';

export class Category {
    _id: string;
    name: string;
    imageUrl: string;
    parent: string = '';
    ancestors: string[] = [];
    isLeaf: boolean = false;

    constructor(
        id: string,
        name: string,
        imageUrl: string,
    ) {
        this._id = id
        this.name = name
        this.imageUrl = imageUrl
    }
}

export type CategoryQuery = {
    parent?: string;
    skip?: number;
    limit?: number;
}

function buildCategoryQueryString(query: CategoryQuery) {
    let queryList = [];
    if (query.parent) {
        queryList.push(`parent=${query.parent}`);
    }
    if (query.skip) {
        queryList.push(`skip=${query.skip}`);
    }
    if (query.limit) {
        queryList.push(`limit=${query.limit}`);
    }

    return queryList.length > 0 ? `?${queryList.join('&')}` : '';
}

export async function getCategories(query: CategoryQuery = { skip: 0, limit: 20 }): Promise<ResponseData<Category[]>> {
    let response;
    try {
        response = await getNoCache<Category[]>(`${BASE_URL}/v1/categories${buildCategoryQueryString(query)}`);
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