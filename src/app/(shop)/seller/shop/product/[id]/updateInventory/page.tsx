import { Suspense } from "react";
import { getProductById } from "@/api-services/market-service";
import ProductInventoryUpdate from "@/components/product-operation/ProductInventoryUpdate";

export default async function SellerShopProductUpdateInventory(
    {
        params
    }:
        {
            params: { id: string }
        }
) {

    const productInfoRes = await getProductById(params.id);

    return (
        <>
            <Suspense >
                <ProductInventoryUpdate productInfo={productInfoRes.data} />
            </Suspense>

        </>
    )
}