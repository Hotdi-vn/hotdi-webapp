'use server'

import { createMyAddress, updateMyAddress } from "@/api-services/address-service";
import { Address } from "@/model/market-data-model";

export async function createAddress(address: Address) {
    return createMyAddress(address);
}

export async function updateAddress(address: Address) {
    return updateMyAddress(address);
}