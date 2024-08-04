import { ERROR_CODE_ITEM_NOT_FOUND } from "@/constants/common-contants";
import { ResponseData, ServerError } from "@/utils/data-fetching-utils";

export function buildQueryString(query: Object) {
    let queryList = Object.entries(query)
        .filter(([key, value]) => value)
        .map(([key, value]) => `${key}=${value}`);

    return queryList.length > 0 ? `?${queryList.join('&')}` : '';
}

export function validateResponse(response: ResponseData<any>) {
    if (response.error) {
        throw new ServerError(response.error.id, response.error.code);
    }
}

export function isNotFoundError(error: any) {
    if (error instanceof ServerError && error.code === ERROR_CODE_ITEM_NOT_FOUND) {
        return true;
    }
    return false;
}