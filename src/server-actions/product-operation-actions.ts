'use server'

import { ProductInfo } from "@/model/market-data-model";
import * as marketService from "@/api-services/market-service";
import { uploadFile } from "@/api-services/file-service";
import { redirect } from "next/navigation";

export async function sellerCreateProduct(productInfo: ProductInfo) {
    console.log('Enter publishProduct action');
    console.log(productInfo);
    const publishedProduct = await marketService.createProduct(productInfo);
    console.log(publishedProduct);
    redirect('/seller/shop/product');
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