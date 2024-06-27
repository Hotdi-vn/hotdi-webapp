'use server'

import { InventoryStatus, ProductInfo, PublishStatus } from "@/model/market-data-model";
import * as marketService from "@/api-services/market-service";
import { uploadFile } from "@/api-services/file-service";

export async function sellerCreateProduct(productInfo: ProductInfo) {
    const newProduct = await marketService.createProduct(productInfo);
    return newProduct;
}

export async function sellerUpdateProduct(productInfo: ProductInfo) {
    const updatedProduct = await marketService.updateProduct(productInfo);
    return updatedProduct;
}

export async function sellerUpdateProductInventory(
    productInventory:
        { _id: string, inventoryManagementOption: boolean, inventoryStatus: InventoryStatus, stockQuantity: number }) {
    const updatedProduct = await marketService.updateProduct(productInventory);
    return updatedProduct;
}

export async function sellerHideProduct(id: string) {
    const updatedProduct = await marketService.updateProduct({ _id: id, publishStatus: PublishStatus.Draft }, { populate: 'images' });
    return updatedProduct;
}

export async function sellerPublishProduct(id: string) {
    const updatedProduct = await marketService.updateProduct({ _id: id, publishStatus: PublishStatus.Published }, { populate: 'images' });
    return updatedProduct;
}

export async function sellerMarkOutOfStockProduct(id: string) {
    const updatedProduct = await marketService.updateProduct({ _id: id, inventoryStatus: InventoryStatus.OutOfStock, stockQuantity: 0 }, { populate: 'images' });
    return updatedProduct;
}

export async function sellerCopyProduct(product: ProductInfo) {
    const createdProduct = await marketService.createProduct(product, { populate: 'images' });
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