import { NavBar } from "@/components/common/antd_mobile_client_wrapper";
import { BackButton } from "@/components/button/BackButton";
import ProductOperation from "@/components/product-operation/ProductOperation";
import { Suspense } from "react";
import { getCategories, getProductById } from "@/api-services/market-service";
import { OperationMode } from "@/constants/common-contants";

export default async function SellerShopProductUpdate(
    {
        params
    }:
        {
            params: { id: string }
        }
) {

    const productInfoRes = await getProductById(params.id, { populate: 'images' });
    const categoriesRes = await getCategories({ skip: 0, limit: 0 });

    return (
        <>
            <Suspense >
                <ProductOperation categories={categoriesRes.data} productInfo={productInfoRes.data} mode={OperationMode.Edit} />
            </Suspense>

        </>
    )
}