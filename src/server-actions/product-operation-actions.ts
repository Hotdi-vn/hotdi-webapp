'use server'

import { InventoryStatus, InventoryTabName, ProductInfo, PublishStatus } from "@/model/market-data-model";
import * as marketService from "@/api-services/market-service";
import { uploadFile } from "@/api-services/file-service";
import { redirect } from "next/navigation";

export async function sellerCreateProduct(productInfo: ProductInfo) {
    const newProduct = await marketService.createProduct(productInfo);
    redirect(`/seller/shop/product?defaultTab=${calculateInventoryDefaultTab(newProduct)}`);
}

function calculateInventoryDefaultTab(productInfo: ProductInfo) {
    let result;
    switch (productInfo.publishStatus) {
        case PublishStatus.Draft:
        case PublishStatus.Hidden:
            result = InventoryTabName.Hidden;
            break;
        case PublishStatus.Published:
            result = productInfo.inventoryStatus === InventoryStatus.InStock ? InventoryTabName.InStock : InventoryTabName.OutOfStock;
            break;
        default:
            result = InventoryTabName.InStock;
            break;
    }

    return encodeURIComponent(result);
}

export async function sellerUpdateProduct(productInfo: ProductInfo) {
    const updatedProduct = await marketService.updateProduct(productInfo);
    redirect(`/seller/shop/product?defaultTab=${calculateInventoryDefaultTab(updatedProduct)}`);
}

export async function sellerUpdateProductInventory(
    productInventory:
        { _id: string, inventoryManagementOption: boolean, inventoryStatus: InventoryStatus, stockQuantity: number }) {
    const updatedProduct = await marketService.updateProduct(productInventory);
    redirect(`/seller/shop/product?defaultTab=${calculateInventoryDefaultTab(updatedProduct)}`);
}

export async function uploadProductImage(formData: FormData) {
    const result = await uploadFile(formData);
    if (result.error) {
        console.log(result.error);
        return null;
    }
    return result.data;
}

export async function getMyProducts(query: marketService.ProductQuery) {
    return marketService.getMyProducts(query);
}