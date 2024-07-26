'use server'

import * as marketService from "@/api-services/market-service";
import { ShopProfileQuery } from "@/api-services/market-service";
import { ShopProfile } from "@/model/market-data-model";

export async function getLocationByParentCode(parentCode: string) {
    return marketService.getLocationByParentCode(parentCode);
}

export async function getMyShopProfile(query: ShopProfileQuery = {}) {
    return marketService.getMyShopProfile(query);
}

export async function createMyShopProfile(profile: ShopProfile, query: ShopProfileQuery = {}) {
    return marketService.createMyShopProfile(profile, query);
}

export async function updateMyShopProfile(profile: Partial<ShopProfile>, query: ShopProfileQuery = {}) {
    return marketService.updateMyShopProfile(profile, query);
}

export async function submitMyShopProfile(profile: ShopProfile, query: ShopProfileQuery = {}) {
    return marketService.submitMyShopProfile(profile, query);
}