'use server'

import * as marketService from "@/api-services/market-service";

export async function getLocationByParentCode(parentCode: string) {
    return marketService.getLocationByParentCode(parentCode);
}