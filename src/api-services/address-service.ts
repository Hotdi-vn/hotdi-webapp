import { Address } from '@/model/market-data-model';
import { getSession } from '@/server-actions/authentication-actions';
import { ResponseData, ServerError } from '@/utils/data-fetching-utils';
import { post, put } from '@/utils/server-side-fetching';
import { log } from 'console';
import 'server-only'
import { validateResponse } from './common-utils';

const BASE_URL = '/market';

export async function createMyAddress(address: Address): Promise<ResponseData<Address>> {
    let response;
    const session = await getSession();

    try {
        response = await post<Address>(`${BASE_URL}/v1/addresses`, address, session.userProfile?.token);
        validateResponse(response);
        return response;
    } catch (error) {
        log('Error from createMyAddress', error);
        throw error;
    }
}

export async function updateMyAddress(address: Address): Promise<ResponseData<Address>> {
    let response;
    const session = await getSession();

    try {
        response = await put<Address>(`${BASE_URL}/v1/addresses/${address._id}`, address, session.userProfile?.token);
        validateResponse(response);
        return response;
    } catch (error) {
        log('Error from updateMyAddress', error);
        throw error;
    }
}