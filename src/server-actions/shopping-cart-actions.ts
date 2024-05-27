'use server'

import { CartItem } from "@/model/market-data-model";
import * as marketService from "@/api-services/market-service";
import { ResponseData } from "@/utils/data-fetching-utils";

export async function getMyCart(query: marketService.CartItemQuery): Promise<ResponseData<CartItem[]>> {
    const res = await marketService.getMyCartItems(query);
    if (res.error) {
        console.log(res.error);
        return Promise.reject(res.error);
    }
    return Promise.resolve(res);
}