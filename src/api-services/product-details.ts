import 'server-only'

import { ResponseData, ServerError } from '@/utils/data-fetching-utils';
import { log } from 'console';
import { get } from '@/utils/server-side-fetching';
import { ProductInfo } from '@/model/market-data-model';

const BASE_URL = '/market';

export async function getProductById(id: string): Promise<ResponseData<ProductInfo>> {
    let response;
    try {
        response = await get<ProductInfo>(`${BASE_URL}/v1/products/${id}`);
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