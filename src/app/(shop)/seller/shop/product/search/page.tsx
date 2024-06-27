import ProductSearch from "@/components/product-operation/ProductSearch";
import { InventoryTabName } from "@/model/market-data-model";

export default async function SellerShopProductSearch({
    searchParams,
}: {
    searchParams: {
        [key: string]: string | string[] | undefined
    },
}) {
    return (
        <>
            <ProductSearch defaultSearchValue={searchParams['defaultSearchValue'] as string} defaultTab={searchParams['defaultTab'] as InventoryTabName} />
        </>
    )
}