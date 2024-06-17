'use server'

import { InventoryStatus, InventoryTabName, ProductInfo, PublishStatus } from "@/model/market-data-model";
import * as marketService from "@/api-services/market-service";
import { uploadFile } from "@/api-services/file-service";
import { redirect } from "next/navigation";

export async function sellerCreateProduct(productInfo: ProductInfo) {
    const newProduct = await marketService.createProduct(productInfo);
    redirectToProductManagementPage(newProduct);
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

function redirectToProductManagementPage(productInfo: ProductInfo) {
    redirect(`/seller/shop/product?defaultTab=${calculateInventoryDefaultTab(productInfo)}`);
}

export async function sellerUpdateProduct(productInfo: ProductInfo) {
    const updatedProduct = await marketService.updateProduct(productInfo);
    redirectToProductManagementPage(updatedProduct);
}

export async function sellerUpdateProductInventory(
    productInventory:
        { _id: string, inventoryManagementOption: boolean, inventoryStatus: InventoryStatus, stockQuantity: number }) {
    const updatedProduct = await marketService.updateProduct(productInventory);
    redirectToProductManagementPage(updatedProduct);
}

export async function sellerHideProduct(id: string) {
    const updatedProduct = await marketService.updateProduct({ _id: id, publishStatus: PublishStatus.Draft });
    return updatedProduct;
}

export async function sellerPublishProduct(id: string) {
    const updatedProduct = await marketService.updateProduct({ _id: id, publishStatus: PublishStatus.Published });
    return updatedProduct;
}

export async function sellerMarkOutOfStockProduct(id: string) {
    const updatedProduct = await marketService.updateProduct({ _id: id, inventoryStatus: InventoryStatus.OutOfStock, stockQuantity: 0 });
    return updatedProduct;
}

export async function sellerCopyProduct(product: ProductInfo) {
    const createdProduct = await marketService.createProduct(product);
    return createdProduct;
}

export async function sellerDeleteProduct(id: string) {
    const updatedProduct = await marketService.deleteProduct(id);
    return updatedProduct;
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