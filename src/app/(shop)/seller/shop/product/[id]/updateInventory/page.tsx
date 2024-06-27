import { Suspense } from "react";
import { getProductById } from "@/api-services/market-service";
import ProductInventoryUpdate from "@/components/product-operation/ProductInventoryUpdate";

export default async function SellerShopProductUpdateInventory({
    params,
    searchParams,
}: {
    params: { id: string },
    searchParams: {
        [key: string]: string | string[] | undefined
    },
}) {

    const productInfoRes = await getProductById(params.id);

    return (
        <>
            <Suspense >
                <ProductInventoryUpdate redirectPath={searchParams['redirectPath'] as string} productInfo={productInfoRes.data} />
            </Suspense>

        </>
    )
}